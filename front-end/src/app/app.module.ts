import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Habilitar formatação de moeda e data em português
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

/**** Datas em português no MatDatepicker  ****/

// É preciso instalar os seguintes pacotes:
// yarn add @angular/material-moment-adapter moment

import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

/**********************************************/

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './ui/header/header.component';
import { MainMenuComponent } from './ui/main-menu/main-menu.component';
import { FooterComponent } from './ui/footer/footer.component';
import { ProfessorListComponent } from './professor/professor-list/professor-list.component';
import { ConfirmDlgComponent } from './ui/confirm-dlg/confirm-dlg.component';
import { MatDialogModule, MatTableModule } from '@angular/material';
import { ProfessorFormComponent } from './professor/professor-form/professor-form.component'
import { NgxMaskModule } from 'ngx-mask';
import { TurmaListComponent } from './turma/turma-list/turma-list.component';
import { TurmaFormComponent } from './turma/turma-form/turma-form.component';
import { AlunoFormComponent } from './aluno/aluno-form/aluno-form.component';
import { AlunoListComponent } from './aluno/aluno-list/aluno-list.component';
import { BibliotecariaFormComponent } from './bibliotecaria/bibliotecaria-form/bibliotecaria-form.component';
import { BibliotecariaListComponent } from './bibliotecaria/bibliotecaria-list/bibliotecaria-list.component';
import { EmprestimoFormComponent } from './emprestimo/emprestimo-form/emprestimo-form.component';
import { EmprestimoListComponent } from './emprestimo/emprestimo-list/emprestimo-list.component';
import { EnderecoFormComponent } from './endereco/endereco-form/endereco-form.component';
import { EditoraFormComponent } from './editora/editora-form/editora-form.component';
import { EditoraListComponent } from './editora/editora-list/editora-list.component';
import { LocalFormComponent } from './local/local-form/local-form.component';
import { LocalListComponent } from './local/local-list/local-list.component';
import { AtivoFormComponent } from './ativo/ativo-form/ativo-form.component';
import { AtivoListComponent } from './ativo/ativo-list/ativo-list.component';
import { ItensEmprestimoFormComponent } from './sacola/itens-emprestimo-form/itens-emprestimo-form.component';
import { ItensEmprestimoListComponent } from './sacola/itens-emprestimo-list/itens-emprestimo-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainMenuComponent,
    FooterComponent,
    ProfessorListComponent,
    ConfirmDlgComponent,
    ProfessorFormComponent,
    TurmaListComponent,
    TurmaFormComponent,
    AlunoFormComponent,
    AlunoListComponent,
    BibliotecariaFormComponent,
    BibliotecariaListComponent,
    EmprestimoFormComponent,
    EmprestimoListComponent,
    EnderecoFormComponent,
    EditoraFormComponent,
    EditoraListComponent,
    LocalFormComponent,
    LocalListComponent,
    AtivoFormComponent,
    AtivoListComponent,
    ItensEmprestimoFormComponent,
    ItensEmprestimoListComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    MatTableModule,
    NgxMaskModule.forRoot(),
    /**** Datas em português no MatDatepicker  ****/
    MatMomentDateModule
    /**********************************************/    
  ],
  entryComponents: [
    ConfirmDlgComponent
  ],
  providers: [
    /**** Datas em português no MatDatepicker  ****/
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
    /**********************************************/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
