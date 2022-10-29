import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  public quizForm:FormGroup;

  public subm:boolean=false;
   quizes;
   sno ;

 
  constructor(private dta:QuizService,private formB:FormBuilder,private router:Router) { 

    console.log( 'Loggedd..',sessionStorage.getItem('loggedIn'))
    if(   sessionStorage.getItem('loggedIn')=='0')
    {
      this.router.navigate(['login']);
    }
    this.quizForm = new FormGroup({
      
      Q01: new FormControl(),
      Q02: new FormControl(),
      Q03: new FormControl(),
      Q04: new FormControl(),
      Q05: new FormControl(),
      Q06: new FormControl(),
      Q07: new FormControl(),
      Q08: new FormControl(),
      Q09: new FormControl(),
      Q10: new FormControl(),
      Q11: new FormControl(),
      Q12: new FormControl()
   });
  }

  ngOnInit() {
    this.dta.getquests().subscribe(
      (res)=>{
 
       console.log('....>>>>>>>>>>>>>>>>>>>>>...',res);
       this.quizes=res;//questions;
       this.quizes=this.quizes.questions;
       this.sno=0;
      },
      (error)=>{
 
       console.log(error);
      }
    );
  }

  public onsubm(quizF:any){

    console.log("quizF.valid...",quizF.valid);

    if(quizF.valid){
      this.subm = true;
      console.log("this.quizForm.value",JSON.stringify(this.quizForm.value));
      sessionStorage.setItem('submitquiz',JSON.stringify(this.quizForm.value))
      sessionStorage.setItem('submiz','1;')

      this.router.navigate(['quizreview']);
    }else{

      console.log("Invalid Form!");
      // this.validateF(regF);
    }
  }

  get f(){
    return this.quizForm.controls;
  }
}
