import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { EditoraService } from '../editora.service';

@Component({
  selector: 'app-editora-form',
  templateUrl: './editora-form.component.html',
  styleUrls: ['./editora-form.component.scss']
})
export class EditoraFormComponent implements OnInit {

  constructor(
    private editoraSrv: EditoraService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Nova Editora';
  editora: any = {};

  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do professor e preenche a variável ligada ao form
        this.editora = await this.editoraSrv.obterUm(params['id']);
        this.title = 'Editando editora';
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
      try {
        let msg = 'Editora criado com sucesso.';

        if (this.editora._id) { // Se tem _id, está editando
          msg = 'Editora atualizado com sucesso';
          await this.editoraSrv.atualizar(this.editora);
        }
        else { // Criação de um novo editora
          await this.editoraSrv.novo(this.editora);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/editora']); // Volta à listagem
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
      this.router.navigate(['/editora']); // Retorna à listagem
    }
  }
}