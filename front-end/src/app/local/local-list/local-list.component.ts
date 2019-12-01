import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.component.html',
  styleUrls: ['./local-list.component.scss']
})
export class LocalListComponent implements OnInit {

  constructor(
    private localSrv: LocalService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  locais: any = []; // Vetor vazio
  displayedColumns: string[] = ['corredor', 'estante', 'prateleira', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.locais = await this.localSrv.listar();
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
        data: { question: 'Deseja realmente excluir este local?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await this.localSrv.excluir(id);
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