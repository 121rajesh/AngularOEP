import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {
  userProfileData:any
  constructor(private dataService:DataService) { }

  ngOnInit() {
    let user = this.dataService.UserData(sessionStorage.UserId);   
    user.subscribe((result:any)=>{
      debugger
      console.log(result);
      
      this.userProfileData = result.Data;
    })
  }

}
