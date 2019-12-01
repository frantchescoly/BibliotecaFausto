import { Component, OnInit } from '@angular/core';
import { AtivoService } from '../ativo.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-ativo-list',
  templateUrl: './ativo-list.component.html',
  styleUrls: ['./ativo-list.component.scss']
})
export class AtivoListComponent implements OnInit {

  constructor(
    private ativoSrv: AtivoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ativos: any = []; // Vetor vazio
  displayedColumns: string[] = ['tipo', 'nome', 'autor', 'ano', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.ativos = await this.ativoSrv.listar();
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
        data: { question: 'Deseja realmente excluir este ativo?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await this.ativoSrv.excluir(id);
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