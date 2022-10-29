import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/components/login/login.component';
import { QuizComponent } from 'src/app/components/quiz/quiz.component';
import { QuizresultComponent } from 'src/app/components/quizresult/quizresult.component';
import { QuizreviewComponent } from 'src/app/components/quizreview/quizreview.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';

import { RouterModule,Routes } from '@angular/router';

const appRoutes:Routes=[
  {path:"",redirectTo:'/login',pathMatch:'full'},
{path:"login",component:LoginComponent,data:{navbar:false}},
  {path:"quiz",component:QuizComponent,data:{navbar:true}},
  {path:"quizreview",component:QuizreviewComponent,data:{navbar:true}} ,
  {path:"quizresult",component:QuizresultComponent,data:{navbar:true}},
  {path:'**',component:NotFoundComponent,data:{navbar:true}}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
