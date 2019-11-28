import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { BibliotecariaService } from '../bibliotecaria.service';

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
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Nova Bibliotecaria';
  bibliotecaria: any = {};

  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do professor e preenche a variável ligada ao form
        this.bibliotecaria = await this.bibliotecariaSrv.obterUm(params['id']);
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
          await this.bibliotecariaSrv.atualizar(this.bibliotecaria);
        }
        else { // Criação de um novo bibliotecaria
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
