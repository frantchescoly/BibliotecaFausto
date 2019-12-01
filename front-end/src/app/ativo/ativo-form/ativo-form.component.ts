import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { AtivoService } from '../ativo.service';
import { EditoraService } from '../../editora/editora.service';
import { LocalService } from '../../Local/Local.service';

@Component({
  selector: 'app-ativo-form',
  templateUrl: './ativo-form.component.html',
  styleUrls: ['./ativo-form.component.scss']
})
export class AtivoFormComponent implements OnInit {

  constructor(
    private ativoSrv: AtivoService,
    private editoraSrv: EditoraService,
    private localSrv: LocalService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novo Ativo';
  ativo: any = {};
  editoras: any = [];
  locais: any = [];
  locaisConcatenados: any = [];
  anos: any = [];


  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if (params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do professor e preenche a variável ligada ao form
        this.ativo = await this.ativoSrv.obterUm(params['id']);
        this.title = 'Editando ativo';
      }
      catch (error) {
        console.log(error);
      }
    }

    // Entidades relacionadas
    try {
      this.editoras = await this.editoraSrv.listar();
      this.locais = await this.localSrv.listar();

      for (let local = 0; local < this.locais.length; local++) {
        this.locaisConcatenados.push({ local, concatenado: `Corredor:${this.locais[local].corredor}, estante:${this.locais[local].estante}, prateleira:${this.locais[local].prateleira}` });
      }

      for (let year = 1970; year <= 2019; year++) {
        this.anos.push({ year });
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  async salvar(form: NgForm) {
    if (form.valid) {
      try {
        let msg = 'Ativo criado com sucesso.';

        if (this.ativo._id) { // Se tem _id, está editando
          msg = 'Ativo atualizado com sucesso';
          await this.ativoSrv.atualizar(this.ativo);
        }
        else { // Criação de um novo ativo
          await this.ativoSrv.novo(this.ativo);
        }

        this.snackBar.open(msg, 'Entendi', { duration: 3000 });
        this.router.navigate(['/ativo']); // Volta à listagem
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
      this.router.navigate(['/ativo']); // Retorna à listagem
    }
  }
}