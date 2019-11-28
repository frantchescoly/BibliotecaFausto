import { Component, OnInit } from '@angular/core';
import { BibliotecariaService } from '../bibliotecaria.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-bibliotecaria-list',
  templateUrl: './bibliotecaria-list.component.html',
  styleUrls: ['./bibliotecaria-list.component.scss']
})
export class BibliotecariaListComponent implements OnInit {

  constructor(
    private bibliotecariaSrv: BibliotecariaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  bibliotecarias: any = []; // Vetor vazio
  displayedColumns: string[] = ['nome', 'endereco', 'telefone', 'celular', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.bibliotecarias = await this.bibliotecariaSrv.listar();
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
        data: { question: 'Deseja realmente excluir este funcionário?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await this.bibliotecariaSrv.excluir(id);
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
