import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-u-exam',
  templateUrl: './u-exam.component.html',
  styleUrls: ['./u-exam.component.css']
})
export class UExamComponent implements OnInit {

  subject:any
  subId:any  
  message:string
  quesAdded:any
  questions: any;
  editQues:boolean
  specificQues: any;

  constructor(public service:DataService, public route:ActivatedRoute,public router:Router) { }
  
  ngOnInit() {
    this.route.params.subscribe(params=>{
       this.subId= params['SubId']});
    debugger
    this.service.GetSubject(this.subId).subscribe((subjectData:any)=>{
      if(subjectData.Data !=null || subjectData.Data!=undefined)
      
      this.subject = subjectData.Data;
      console.log(this.subject.SubName);
      console.log(this.subject.SubName);
      
    })
  }
  startExam() 
  {
       this.router.navigate(['/user/uexam/paper/'+this.subId]);
  }
}
