import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { EmprestimoService } from '../emprestimo.service';

@Component({
  selector: 'app-emprestimo-form',
  templateUrl: './emprestimo-form.component.html',
  styleUrls: ['./emprestimo-form.component.scss']
})

export class EmprestimoFormComponent implements OnInit {

  constructor(
    private emprestimoSrv: EmprestimoService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novo Emprestimo';
  emprestimo: any = {};

  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do professor e preenche a variável ligada ao form
        this.emprestimo = await this.emprestimoSrv.obterUm(params['id']);
        this.title = 'Editando emprestimo';
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
      try {
        let msg = 'Emprestimo criado com sucesso.';

        if (this.emprestimo._id) { // Se tem _id, está editando
          msg = 'Emprestimo atualizado com sucesso';
          await this.emprestimoSrv.atualizar(this.emprestimo);
        }
        else { // Criação de um novo emprestimo
          await this.emprestimoSrv.novo(this.emprestimo);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/emprestimo']); // Volta à listagem
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
      this.router.navigate(['/emprestimo']); // Retorna à listagem
    }
  }
}