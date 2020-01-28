import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {
  UserId:any
  userObj:any
  message:any
  constructor(private service:DataService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    // this.activatedRoute.params
    // .subscribe((params:any)=>{
      this.UserId = sessionStorage.getItem("UserId");
      console.log(this.UserId);
    //   console.log(params);
      
      
      this.service.UserData(this.UserId)
      .subscribe((result:any)=>{
        this.userObj = result.Data;
        console.log(this.userObj);
        
      })
    // })

  }

  update(UIData:any)
  {
    debugger
    if(UIData.Password == this.userObj.Password)
    {
      console.log("UIData.Password = "+UIData.Password+" userObj.Password = "+this.userObj.Password);
      
      if (UIData.NewPassword == UIData.CnfPassword) 
      {
        console.log("UIData.Password = "+UIData.NewPassword+" userObj.Password = "+UIData.CnfPassword);
        this.service.UpdateUser(this.UserId,this.userObj)
    .subscribe((result:any)=>{
      if(result.Status == "Success")
      {
        alert("Profile updated successfully!!")
        this.router.navigate(['home']);
      }
      })
      }
      else
      {
        this.message="Password mis-match!!";
      }
    }
    else
    {
      this.message = "Incorrect password!!!";
    }
  }
}

