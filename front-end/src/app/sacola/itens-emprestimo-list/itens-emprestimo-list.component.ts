import { Component, OnInit } from '@angular/core';
import { ItensEmprestimoService } from '../itens-emprestimo.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-itens-emprestimo-list',
  templateUrl: './itens-emprestimo-list.component.html',
  styleUrls: ['./itens-emprestimo-list.component.scss']
})
export class ItensEmprestimoListComponent implements OnInit {

  constructor(
    private itensEmpSrv: ItensEmprestimoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  itensEmprestimos: any = []; // Vetor vazio
  displayedColumns: string[] = ['emprestimo', 'tombo', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.itensEmprestimos = await this.itensEmpSrv.listar();
      console.log(this.itensEmprestimos);
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
        data: { question: 'Deseja realmente excluir este item?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await this.itensEmpSrv.excluir(id);
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