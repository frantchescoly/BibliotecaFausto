import { Component, OnInit } from '@angular/core';
import { EmprestimoService } from '../emprestimo.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-emprestimo-list',
  templateUrl: './emprestimo-list.component.html',
  styleUrls: ['./emprestimo-list.component.scss']
})

export class EmprestimoListComponent implements OnInit {

  constructor(
    private emprestimoSrv: EmprestimoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  emprestimos: any = []; // Vetor vazio
  displayedColumns: string[] = ['dtEmpre', 'aluno', 'funcionario', 'dataDev', 'ativo', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.emprestimos = await this.emprestimoSrv.listar();
    }
    catch (error) {
      console.error(error);
    }
  }

  async excluir(id: string) {
    try {

      // Exibição da caixa de diálogo de confirmação
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Deseja realmente excluir este emprestimo?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await this.emprestimoSrv.excluir(id);
        this.snackBar.open('Exclusão efetuada com sucesso', 'Entendi',
          { duration: 3000 });
        this.ngOnInit(); // Atualizar os dados
      }

    }

    catch (erro) {
      console.log(erro);
      this.snackBar.open('ERRO: não foi possível excluir. Contate o suporte técnico',
        'Entendi', { duration: 3000 });
    }
  }
}
