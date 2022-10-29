import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonPipe, KeyValuePipe } from '@angular/common/src/pipes';
import { KeyValue } from '@angular/common';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-quizreview',
  templateUrl: './quizreview.component.html',
  styleUrls: ['./quizreview.component.css']
})
export class QuizreviewComponent implements OnInit {
  // public quizRev:FormGroup;
  quizes;
  quizArray;
  sno;
  qrev;
  scoreper = 0;
  constructor(private dta: QuizService, private usrdata: UserService,
    private formB: FormBuilder, private router: Router) {
    console.log('Loggedd..', sessionStorage.getItem('loggedIn'))
    if (sessionStorage.getItem('loggedIn') == '0') {
      this.router.navigate(['login']);
    }
    this.qrev = JSON.parse(sessionStorage.getItem('submitquiz'));

    console.log(sessionStorage.getItem('submiz'), '....hhhhhh>>>>>>>>>>>>>>>...', sessionStorage.getItem('submitquiz'));
  }


  ngOnInit() {
    this.dta.getquests().subscribe(
      (res) => {

        this.quizArray = Array.of(res);
        console.log('....>>>>>>>>>>>>>>>this.quizArray>>>>>>...', this.quizArray);
        this.quizes = res;//questions;
        this.quizes = this.quizes.questions;

        console.log('....>>>>>>>>>>this.quizes.questions>>>>>>>>>>>...', this.quizes[4].question);
        this.sno = 0;
      },
      (error) => {

        console.log(error);
      }
    );
  }




  public onsubm(quizF: any) {

    // console.log("quizF.valid...",quizF.valid);

    //   console.log("this.quizForm.value",JSON.stringify(this.quizForm.value));
    //   sessionStorage.setItem('submitquiz',JSON.stringify(this.quizForm.value))
    //   sessionStorage.setItem('submiz','1;')


    //calculate the result, from quizes object and quizrev json

    let i = 0;
    let correct = 0;
    // let quizrevAr =map( this.qrev);
    // let kv = this.qrev.pipe();
    // console.log('....quizrevAr..',quizrevAr);
    //convet into key val pair

    var jsonToBeUsed = [];
    for (var b in this.qrev) {



      console.log(this.qrev[b], '====b...', b)
      let item = { key: b, value: this.qrev[b] };

      jsonToBeUsed.push(item);

    }
    for (let m of this.quizes) {

      let correctAnswer = m.answers[m.correctIndex];
      // for(let k of m.answers){

      console.log(m.question + '...correctAnswer...', correctAnswer, '...jsonToBeUsed[i].value..', jsonToBeUsed[i].value)//,'.......this.quizrevAr[i]..........',quizrevAr[i]);
      console.log('..jsonToBeUsed[i]..', jsonToBeUsed[i])
      if (correctAnswer == jsonToBeUsed[i].value && m.Sno == jsonToBeUsed[i].key)
        correct++;
      // }
      i++;
    }
    console.log('correct.toString()..', correct.toString());



    //save the result in session storage to ddisplay in next page
    sessionStorage.setItem('correctAns', correct.toString());

    this.scoreper = this.roundTo((correct / 12.0) * 100, 2);
    //update the result in usermaster service
    this.editUsr();
    this.router.navigate(['quizresult']);



  }

  public onback() {
    this.router.navigate(['quiz']);
  }


  roundTo = function (num: number, places: number) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  };

  //=============================================
 

  editUsr() {
    let strobj = sessionStorage.getItem('usrjson');
    let JSONusrobj = JSON.parse(strobj);
    let data = {
      id: new Date().getTime(),
      emailid: JSONusrobj.emailid,
      usename: JSONusrobj.usename,
      password: JSONusrobj.password,
      percntmarks: this.scoreper,
      date: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()
    }
    console.log('id..', JSONusrobj.id);
    this.usrdata.update(JSONusrobj.id, data).subscribe((response) => {
      //this.listUsr();
    }, (error => {

    }));
  }



}
