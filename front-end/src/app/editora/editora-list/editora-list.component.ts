import { Component, OnInit } from '@angular/core';
import { EditoraService } from '../editora.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-editora-list',
  templateUrl: './editora-list.component.html',
  styleUrls: ['./editora-list.component.scss']
})
export class EditoraListComponent implements OnInit {

  constructor(
    private editoraSrv: EditoraService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  editoras: any = []; // Vetor vazio
  displayedColumns: string[] = ['nome', 'telefone', 'pais', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.editoras = await this.editoraSrv.listar();
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
        data: { question: 'Deseja realmente excluir esta editora?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if (result) {
        await this.editoraSrv.excluir(id);
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