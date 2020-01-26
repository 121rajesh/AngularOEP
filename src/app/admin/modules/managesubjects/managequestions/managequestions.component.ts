import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-managequestions',
  templateUrl: './managequestions.component.html',
  styleUrls: ['./managequestions.component.css']
})
export class ManagequestionsComponent implements OnInit {
  subject:any
  id:any  
  message:string
  quesAdded:any
  // Question:any
  // Opt1:any
  // Opt2:any
  // Opt3:any
  // Opt4:any
  // CorrectAns:any
  // // cnt:number
  constructor(public service:DataService, public route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
       this.id= params['SubId']});
    
    this.service.GetSubject(this.id).subscribe((subjectData:any)=>{
      if(subjectData.Data !=null || subjectData.Data!=undefined)
      this.subject = subjectData.Data;
      //console.log(this.subject);
      
    })
  }
  addQues(quesObj)
  {
    console.log(quesObj);
  //  this.Question=quesObj.Question
  //  this.Opt1=quesObj.Opt1
  //  this.Opt2=quesObj.Opt2
  //  this.Opt3=quesObj.Opt3
  //   debugger
  //   //this.cnt = 0;
    quesObj.value.SubId = this.id;
    this.service.AddQuestions(quesObj.value)
    .subscribe((result:any)=>{
      // console.log(result.Status);
      if (result.Status == "success") {
        this.message = "Question added"
        alert(this.message)

        //++this.cnt
        //this.quesAdded = ("Question "+this.cnt);
        quesObj.resetForm()

      }
      else
      {
        this.message = "Failed"
        
      }
    })
  }
  

}
