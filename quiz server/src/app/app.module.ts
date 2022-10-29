import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizreviewComponent } from './components/quizreview/quizreview.component';
import { QuizresultComponent } from './components/quizresult/quizresult.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

// const appRoutes: Routes = [
//   { path: 'crisis-center', component: CrisisListComponent },
//   { path: 'hero/:id',      component: HeroDetailComponent }]

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizreviewComponent,
    QuizresultComponent,
    NavbarComponent,
    HeaderComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule, FormsModule,RouterModule,
    ReactiveFormsModule,HttpClientModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
