import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
 
import { catchError } from 'rxjs/operators';

import { Observable, throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url1:string='http://localhost:3000/userRoute';
  constructor(private httpcl:HttpClient,private http: HttpClient) { }
  public getprod(){
    console.log('check service..',this.httpcl.get(this.url1))
    return this.httpcl.get(this.url1);
  }


  public getsingleprod(id){
    return this.httpcl.get(`${this.url1}/${id}`);
  }


  public update1(id,jsonparam){
    this.httpcl.put(`${this.url1}/${id}`,`${jsonparam}`);


//     axios.put('http://localhost:3000/users/6/', {
//     first_name: 'Fred',
//     last_name: 'Blair',
//     email: 'freddyb34@yahoo.com'
// }).then(resp => {

//     console.log(resp.data);
// }).catch(error => {

//     console.log(error);
// });
  }



  //=================================================
  apiUrl: string = 'http://localhost:4000/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  // Create
  create(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Read
  list() {
    return this.http.get(`${this.apiUrl}`);
  }

  // Update
  update(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  // Delete
  delete(id: any): Observable<any> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.handleError)
    )
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
