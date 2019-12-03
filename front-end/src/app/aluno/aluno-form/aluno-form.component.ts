import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { AlunoService } from '../aluno.service';
import { EnderecoService } from '../../endereco/endereco.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit {

  constructor(
    private alunoSrv: AlunoService,
    private enderecoSrv: EnderecoService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novo Aluno';
  aluno: any = {};
  endereco: any = {};
  base : any = {};
  endPronto: any = [];

  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do professor e preenche a variável ligada ao form
        this.base = await this.alunoSrv.obterUm(params['id']);
        this.endereco = this.base.endereco;
        this.aluno = this.base.aluno;
        this.title = 'Editando aluno';
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
      try {
        let msg = 'Aluno criado com sucesso.';

        if (this.aluno._id) { // Se tem _id, está editando
          msg = 'Aluno atualizado com sucesso';
          await this.enderecoSrv.atualizar(this.endereco);
          await this.alunoSrv.atualizar(this.aluno);
        }
        else { // Criação de um novo aluno
          await this.enderecoSrv.novo(this.endereco);
          this.endPronto = await this.enderecoSrv.listar();
          this.aluno.endereco = this.endPronto[this.endPronto.length - 1]['_id'];
          await this.alunoSrv.novo(this.aluno);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/aluno']); // Volta à listagem
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
      this.router.navigate(['/aluno']); // Retorna à listagem
    }

  }
  
}
