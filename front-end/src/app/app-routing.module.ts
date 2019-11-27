import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfessorListComponent } from './professor/professor-list/professor-list.component';
import { AlunoFormComponent } from './aluno/aluno-form/aluno-form.component';
import { TurmaListComponent } from './turma/turma-list/turma-list.component';
import { TurmaFormComponent } from './turma/turma-form/turma-form.component';

const routes: Routes = [
  { path: 'aluno', component: ProfessorListComponent },
  { path: 'aluno/novo', component: AlunoFormComponent },
  { path: 'aluno/:id', component: AlunoFormComponent },

  { path: 'turma', component: TurmaListComponent },
  { path: 'turma/novo', component: TurmaFormComponent },
  { path: 'turma/:id', component: TurmaFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
