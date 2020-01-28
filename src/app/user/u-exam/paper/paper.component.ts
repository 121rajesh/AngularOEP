import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { $ } from 'protractor';
import { DataService } from '../../../data.service';


@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})

export class PaperComponent implements OnInit {
  subId:any
  SubPaper:any
  scorearray: { "UserId": string; "SubId": any; "CntCorrectAns": any; };
  constructor(public service:DataService,public route:ActivatedRoute,public router:Router) {
    
   }

  ngOnInit() 
  {
    debugger
    this.route.params.subscribe(params=>
      {
        debugger
      this.subId= params.SubId;
    
      console.log(this.subId);
    
      });
    this.service.GetQuestionBySubId(this.subId)
    .subscribe((questionpaper:any)=>
    {
      debugger
     console.log(questionpaper);
     
      this.SubPaper = questionpaper.Data
      console.log("==========================");
      console.log(this.SubPaper);
      
      
      console.log(this.SubPaper.Question)   
    });
  }  

  answers(datafromUI:any)
  {
    debugger
      console.log(datafromUI.value);

      let formData = datafromUI.value;

      let uid = parseInt(sessionStorage.getItem("UserId"));

      var subjectId = parseInt(this.subId)
      const array = Object.keys(formData).map( qid=>({QueId:qid, value:formData[qid]}));
      console.log(array);
      //let UID = {userId:uid,subId:this.subId}
      this.service.SubmitAns(array)
      .subscribe((reply:any)=>{
        debugger
        if(reply.Status == "success")
        {
          alert("Your Score is "+reply.Data+".\nYou can go through our Sample paper Series.\nclick Ok")
          this.scorearray = 
            {"UserId":uid.toString(),"SubId":subjectId.toString(),"CntCorrectAns":(reply.Data).toString()}
            
            this.service.SendScore(this.scorearray)
            .subscribe((replyfromserver:any)=>{
              console.log(replyfromserver.Status);
            })
            
            this.router.navigate(["user/samplepapers"])
        }
        console.log(reply.Status)
      })
  }


  }
