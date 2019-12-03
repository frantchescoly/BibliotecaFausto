import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { BibliotecariaService } from '../bibliotecaria.service';
import { EnderecoService } from '../../endereco/endereco.service';



// export interface DialogData {
//   animal: 'panda' | 'unicorn' | 'lion';
//   }

  
// @Component({
//   selector: 'dialog-data-example',
//   templateUrl: '../../endereco/endereco-form/endereco-form.component.html',
//   styleUrls: ['../../endereco/endereco-form/endereco-form.component.scss'],
// })
// export class DialogDataExample {
//   constructor(public dialog: MatDialog) {}

//   openDialog() {
//     this.dialog.open(DialogDataExampleDialog, {
//       data: {
//         animal: 'panda'
//       }
//     });
//   }
// }

// @Component({
//   selector: 'dialog-data-example-dialog',
//   templateUrl: '../../endereco/endereco-form/endereco-form.component.html',
// })
// export class DialogDataExampleDialog {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
// }

@Component({
  selector: 'app-bibliotecaria-form',
  templateUrl: './bibliotecaria-form.component.html',
  styleUrls: ['./bibliotecaria-form.component.scss']
})
export class BibliotecariaFormComponent implements OnInit {

  constructor(
    private bibliotecariaSrv: BibliotecariaService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private enderecoSrv: EnderecoService
  ) { }

  title: string = 'Nova Bibliotecaria';
  bibliotecaria: any = {};
  base : any = {};
  endereco: any = {};
  endPronto: any = [];
  // funcPronto: any = [];
 
 
  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do professor e preenche a variável ligada ao form
        this.base = await this.bibliotecariaSrv.obterUm(params['id']);
        this.endereco = this.base.endereco;
        this.bibliotecaria = this.base.funcionario;
        this.title = 'Editando bibliotecaria';
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
      try {
        let msg = 'Bibliotecaria criado com sucesso.';

        if (this.bibliotecaria._id) { // Se tem _id, está editando
          msg = 'Bibliotecaria atualizado com sucesso';
          await this.enderecoSrv.atualizar(this.endereco);
          await this.bibliotecariaSrv.atualizar(this.bibliotecaria);
        }
        else { // Criação de um novo bibliotecaria
          await this.enderecoSrv.novo(this.endereco);
          this.endPronto = await this.enderecoSrv.listar();
          this.bibliotecaria.endereco = this.endPronto[this.endPronto.length - 1]['_id'];
          await this.bibliotecariaSrv.novo(this.bibliotecaria);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/bibliotecaria']); // Volta à listagem
      }
      catch (error) {
        console.log(error);
        this.snackBar.open('ERRO: não foi possível salvar os dados.', 'Entendi',
          { duration: 3000 });
      }
    }
  }

  async voltar(form: NgForm) {

    let result = true;
    console.log(form);
    // form.dirty = formulário "sujo", não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)
    if (form.dirty && form.touched) {
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
      });

      result = await dialogRef.afterClosed().toPromise();

    }

    if (result) {
      this.router.navigate(['/bibliotecaria']); // Retorna à listagem
    }
  }
}
