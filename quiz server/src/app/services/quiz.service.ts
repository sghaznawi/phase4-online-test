import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
public url1:string = 'http://localhost:3000/quizRoute';
  constructor(private httpcl:HttpClient) { }

  public getquests(){
    return this.httpcl.get(this.url1);
  }
}
