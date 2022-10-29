import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizresult',
  templateUrl: './quizresult.component.html',
  styleUrls: ['./quizresult.component.css']
})
export class QuizresultComponent implements OnInit {

  scoreper;
  score;
  constructor(private router:Router) { 
    console.log( 'Loggedd..',sessionStorage.getItem('loggedIn'))
    if(   sessionStorage.getItem('loggedIn')=='0')
    {
      this.router.navigate(['login']);
    }
    this.score=sessionStorage.getItem('correctAns')
    this.scoreper=this.roundTo((parseInt(this.score)/10)*100,2)
  }

  ngOnInit() {
  }
   roundTo = function(num: number, places: number) {
    const factor = 10 ** places;
    return Math. round(num * factor) / factor;
    };

    public onback(){
      this.router.navigate(['quiz']);
    }
}
