import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {HttpClientModule} from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
message:string
loginUserData ={}
  msg: string;
  constructor(public service:DataService, public auth_service:AuthService, public router:Router) { }

  ngOnInit() {
  }
  
  Validation(credentials:any)
  {
    // debugger
    // this.service.LoginUserData(this.loginUserData)
    // .subscribe((data:any)=>{
    //   debugger
    //   if (data.Error !=null) 
    //   {
    //     console.log(data);
          
    //   }
    //   else
    //   {
    //     console.log(data.error);
        
    //   }
    // })
    if( credentials.EmailId ==null || credentials.Password ==null )
      {
          this.msg = "Username/Password is required!!";
      }
      else
      {
        this.Login(credentials);
      }

  }
  Login(credentials: {EmailId:any; Password:any;})
  {
     // throw new Error("Method not implemented.");
    let isLoggedIn:any;
    let result=this.service.LoginUserData(credentials)
    result.subscribe((result1:any)=>{
      //debugger
      console.log(result1);
      if(credentials.EmailId == result1.Data.EmailId && credentials.Password == result1.Data.Password)
      {
        isLoggedIn = true;
      }
      else 
      {
        this.msg =" Username / Password is invalid";  
      }

      if (isLoggedIn)
     {
      //  debugger
        this.auth_service.Login(result1);
        this.msg ="";
        debugger
        if(result1.Data.RoleId == 2)
        {
        this.router.navigate(['/user/dashboard'])
        }
        else
        {
          this.router.navigate(['/admin/dashboard']);
        }
      } 
      else 
      {
        this.msg =" Username / Password is invalid";  
      }
    },(error)=>{
        this.msg = "Username / Password is wrong!!";   
});
  }

}
