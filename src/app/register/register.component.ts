import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message:string
  constructor(public service:DataService, public router: Router) { }

  ngOnInit() {
  }

  register(DataFromUI:any)
  {
    let formData =DataFromUI.form.value;
    console.log(formData);
    if(formData.Password == formData.CnfPassword)
    {
      if (sessionStorage.getItem("RoleId") == "1")
      {
        formData.RoleId = 1;
      }
      else
      {
        formData.RoleId = 2;
      }
      let result = this.service.RegisterData(formData);

      result.subscribe((data:any)=>{
      if(data.error == null)
        {
          this.message = data.Status;
          console.log(data.Data.UserId);
          if (formData.RoleId == 1) 
          {
            this.router.navigate(['home']);
            alert("Admin registered Successfully!!")
          }
          else 
          {
            alert(" Registered Successfully!!")
            this.router.navigate(['login']);  
          }
          
        }
        else
        {
          console.log(data);
          this.message = data.Status;
          console.log(data.Data.Err);
        }
      })
    }
    else
    {
      this.message = "Password should match!"
    }
    
  }

}
