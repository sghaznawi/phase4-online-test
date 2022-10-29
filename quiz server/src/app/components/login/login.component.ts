import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { RouterModule } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public registForm: FormGroup;
  //public router:Router;//will give error ERROR TypeError: this.router is undefined, nee to inject in constructor
  public subm: boolean = false;
  users;
  ;

  constructor(private dta: UserService, private formB: FormBuilder, private router: Router) {
    sessionStorage.setItem('loggedIn', '0');
    //ERROR Error: Uncaught (in promise): TypeError: outlet is null
    this.registForm = this.formB.group({
      Email1: ['', [Validators.required, Validators.email]],
      Password1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]

    })

  }

  ngOnInit() {
    this.dta.getprod().subscribe(
      (res) => {

        console.log('....>>>>>>>>>>>>>>>>>>>>>...', res);
        this.users = res;
      },
      (error) => {

        console.log(error);
      }
    );
  }


  public onsubm(regF: any) {

    console.log('...param1..', regF.value.Email1);
    console.log('...param2..', regF.get('Password1'));
    console.log(regF.valid, '..regF.valid...this.checkUser(regF.value.Email1,regF.value.Password1)..', this.checkUser(regF.value.Email1, regF.value.Password1));
    if (regF.valid && this.checkUser(regF.value.Email1, regF.value.Password1)) {

      this.subm = true;
      console.log('...kkitt...', this.registForm.value);

      sessionStorage.setItem('loggedIn', '1');
      this.router.navigate(['quiz']);

    } else {

      console.log("Invalid Form!");
      this.validateF(regF);
    }
  }


  // submit() {
  //   this.participantService.add(this.participant).subscribe(participant => {
  //       this.alertifyService.success('participant successfully added');
  //       this.router.navigate(['participants/participants-details', this.participant.id]);
  //   }, 
  //   error => {
  //     this.alertifyService.error('Problem occured!\n' + error);
  //    });
  // }

  public validateF(fm) {
    Object.keys(fm.controls).forEach(fd => {

      const conTRL = fm.controls[fd];


      // conTRL.markAsTouched({onlySelf:true});

      if (conTRL instanceof FormControl) {
        conTRL.markAsTouched({ onlySelf: true });
      } else {
        this.validateF(conTRL)
      }
    })
  }

  hasError(fd1: any) {

    // console.log('In has error.1.',fd1)
    // console.log('In has error.2.',this.registForm.get(fd1))
    // console.log('In has error..3..',this.registForm.get(fd1).touched)
    // console.log('In has error..4..',this.registForm.get(fd1).invalid)
    //console.log('In has error..5..',this.registForm.get(fd1).errors.required)
    //console.log(fd1.invalid && fd1.touched && fd1.errors);
    return (this.registForm.get(fd1).invalid && this.registForm.get(fd1).touched && this.registForm.get(fd1).errors);
    //return(fd1.invalid && fd1.touched && fd1.errors);
  }

  get f() {
    return this.registForm.controls;
  }
  public checkUser(userEmail, userPass) {
    //  for(let u in this.users){

    // if(u.emailid==userEmail&&u.password==userPass){
    //   console.log("CORRECCT")
    //   return true;
    // }else return false;
    //  }
    console.log(userPass, '...userPass????userEmail...', userEmail);
    console.log('xxxxx is array xxxx...', Array.isArray(this.users.user));
    var Emailexists = 0;
    this.users.user.forEach(obj => {
      // Object.entries(obj).forEach(([key, value]) => {
      //    console.log(`${key} ${value}..`,userEmail);
      //    if(`${value}`==userEmail){
      //     console.log(`${value}`,"...CORRECCT...",userEmail)
      //     return true;
      //   }else{ 
      //     console.log('INCORR..')
      //     return false};

      // });

      // obj.get('emailid')
      console.log('-------------------', obj.emailid);//.get('emailid'));
      if (obj.emailid == userEmail) {

        // break; cannot use in forEach
        Emailexists = 1;
        sessionStorage.setItem('usrjson', JSON.stringify(obj));
      }
    });

    if (Emailexists)
      return true;
    else return false;
  }
}
