import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { ItensEmprestimoService } from '../itens-emprestimo.service';
import { EmprestimoService } from '../../emprestimo/emprestimo.service';
import { AtivoService } from '../../ativo/ativo.service';

@Component({
  selector: 'app-itens-emprestimo-form',
  templateUrl: './itens-emprestimo-form.component.html',
  styleUrls: ['./itens-emprestimo-form.component.scss']
})
export class ItensEmprestimoFormComponent implements OnInit {

  constructor(
    private itensEmpSrv: ItensEmprestimoService,
    private emprestimoSrv: EmprestimoService,
    private ativoService: AtivoService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novo Item';
  itensEmprestimo: any = {};
  emprestimos: any = [];
  ativos: any = [];
  empsConcatenados: any = [];
  ativosConcatenados: any = [];

  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do professor e preenche a variável ligada ao form
        this.itensEmprestimo = await this.itensEmpSrv.obterUm(params['id']);
        this.title = 'Editando emprestimo';
      }
      catch (error) {
        console.log(error);
      }
    }

    try {
      this.emprestimos = await this.emprestimoSrv.listar();
      this.ativos = await this.ativoService.listar();

      for (let emp of this.emprestimos) {
        let id = emp['_id'];
        const dataIniCorreta = emp.dtEmpre.toString().split('T');
        const dataDevCorreta = emp.dataDev.toString().split('T');
        this.empsConcatenados.push({ id , concatenado: `Aluno: ${emp.aluno.nome}, Dt. Início: ${dataIniCorreta[0]}, Dt. Devolução: ${dataDevCorreta[0]}` });
      }

      for (let atv of this.ativos) {
        let id = atv['_id'];
        this.ativosConcatenados.push({ id , concatenado: `Título: ${atv.nome}, Código TOMBO: ${atv.tombo}` });
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
      try {
        let msg = 'Emprestimo criado com sucesso.';

        if (this.itensEmprestimo._id) { // Se tem _id, está editando
          msg = 'Emprestimo atualizado com sucesso';
          await this.itensEmpSrv.atualizar(this.itensEmprestimo);
        }
        else { // Criação de um novo itensEmprestimo
          await this.itensEmpSrv.novo(this.itensEmprestimo);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/itensEmprestimo']); // Volta à listagem
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
      this.router.navigate(['/itensEmprestimo']); // Retorna à listagem
    }
  }
}