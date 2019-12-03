import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunoListComponent } from './aluno/aluno-list/aluno-list.component';
import { AlunoFormComponent } from './aluno/aluno-form/aluno-form.component';
import { BibliotecariaListComponent } from './bibliotecaria/bibliotecaria-list/bibliotecaria-list.component';
import { BibliotecariaFormComponent } from './bibliotecaria/bibliotecaria-form/bibliotecaria-form.component';
import { EmprestimoListComponent } from './emprestimo/emprestimo-list/emprestimo-list.component';
import { EmprestimoFormComponent } from './emprestimo/emprestimo-form/emprestimo-form.component';
import { EnderecoFormComponent } from './endereco/endereco-form/endereco-form.component';
import { EditoraListComponent } from './editora/editora-list/editora-list.component';
import { EditoraFormComponent } from './editora/editora-form/editora-form.component';
import { LocalFormComponent } from './local/local-form/local-form.component';
import { LocalListComponent } from './local/local-list/local-list.component';
import { AtivoFormComponent } from './ativo/ativo-form/ativo-form.component';
import { AtivoListComponent } from './ativo/ativo-list/ativo-list.component';
import { ItensEmprestimoFormComponent } from './sacola/itens-emprestimo-form/itens-emprestimo-form.component';
import { ItensEmprestimoListComponent } from './sacola/itens-emprestimo-list/itens-emprestimo-list.component';

const routes: Routes = [
  { path: 'aluno', component: AlunoListComponent },
  { path: 'aluno/novo', component: AlunoFormComponent },
  { path: 'aluno/:id', component: AlunoFormComponent },

  { path: 'bibliotecaria', component: BibliotecariaListComponent },
  { path: 'bibliotecaria/novo', component: BibliotecariaFormComponent },
  { path: 'bibliotecaria/:id', component: BibliotecariaFormComponent },

  { path: 'emprestimo', component: EmprestimoListComponent },
  { path: 'emprestimo/novo', component: EmprestimoFormComponent },
  { path: 'emprestimo/:id', component: EmprestimoFormComponent },

  { path: 'endereco', component: EnderecoFormComponent },

  { path: 'editora', component: EditoraListComponent },
  { path: 'editora/novo', component: EditoraFormComponent },
  { path: 'editora/:id', component: EditoraFormComponent },

  { path: 'local', component: LocalListComponent },
  { path: 'local/novo', component: LocalFormComponent },
  { path: 'local/:id', component: LocalFormComponent },

  { path: 'ativo', component: AtivoListComponent },
  { path: 'ativo/novo', component: AtivoFormComponent },
  { path: 'ativo/:id', component: AtivoFormComponent },

  { path: 'itensEmprestimo', component: ItensEmprestimoListComponent },
  { path: 'itensEmprestimo/novo', component: ItensEmprestimoFormComponent },
  { path: 'itensEmprestimo/:id', component: ItensEmprestimoFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
