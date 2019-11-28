import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunoListComponent } from './aluno/aluno-list/aluno-list.component';
import { AlunoFormComponent } from './aluno/aluno-form/aluno-form.component';
import { BibliotecariaListComponent } from './bibliotecaria/bibliotecaria-list/bibliotecaria-list.component';
import { BibliotecariaFormComponent } from './bibliotecaria/bibliotecaria-form/bibliotecaria-form.component';
import { EmprestimoListComponent } from './emprestimo/emprestimo-list/emprestimo-list.component';
import { EmprestimoFormComponent } from './emprestimo/emprestimo-form/emprestimo-form.component';

const routes: Routes = [
  { path: 'aluno', component: AlunoListComponent },
  { path: 'aluno/novo', component: AlunoFormComponent },
  { path: 'aluno/:id', component: AlunoFormComponent },

  { path: 'bibliotecaria', component: BibliotecariaListComponent },
  { path: 'bibliotecaria/novo', component: BibliotecariaFormComponent },
  { path: 'bibliotecaria/:id', component: BibliotecariaFormComponent },

  { path: 'emprestimo', component: EmprestimoListComponent },
  { path: 'emprestimo/novo', component: EmprestimoFormComponent },
  { path: 'emprestimo/:id', component: EmprestimoFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
