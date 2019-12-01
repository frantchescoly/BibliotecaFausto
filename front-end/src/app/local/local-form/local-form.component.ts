import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-local-form',
  templateUrl: './local-form.component.html',
  styleUrls: ['./local-form.component.scss']
})
export class LocalFormComponent implements OnInit {

  constructor(
    private localSrv: LocalService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novo Local';
  local: any = {};

  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do professor e preenche a variável ligada ao form
        this.local = await this.localSrv.obterUm(params['id']);
        this.title = 'Editando local';
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
      try {
        let msg = 'Local criado com sucesso.';

        if (this.local._id) { // Se tem _id, está editando
          msg = 'Local atualizado com sucesso';
          await this.localSrv.atualizar(this.local);
        }
        else { // Criação de um novo local
          await this.localSrv.novo(this.local);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/local']); // Volta à listagem
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
      this.router.navigate(['/local']); // Retorna à listagem
    }
  }

}