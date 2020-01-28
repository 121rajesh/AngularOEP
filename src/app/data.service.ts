import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private getUsersURL =    "http://localhost:53940/api/Users";
  private loginURl =       "http://localhost:53940/api/Login"
  private userProfileURL = "http://localhost:53940/api/Users/"
  private registerURl =    "http://localhost:53940/api/Login/Register"
  private forgotPwdURL =   "http://localhost:53940/api/User/IsExist";
  private generateOTPURL=  "http://localhost:53940/api/User/OTP";
  private changePwdURL=    "http://localhost:53940/api/User/UpdatePassword";
  private subjectURL =     "http://localhost:53940/api/Subject";
  private addQuesURL =     "http://localhost:53940/api/Question";
  private getFdkbckURL =   "http://localhost:53940/api/AFeedback";
  private getResultsURL =  "http://localhost:53940/api/Results";
  private submitAnsURL =   "http://localhost:53940/api/Question/score";
  private postfeedbkURL = "http://localhost:53940/api/AFeedback";
  
  constructor(public http:HttpClient) { }

  LoginUserData(userObj)
  {
    return this.http.post(this.loginURl,userObj);
  }

  RegisterData(userObj)
  {
    return this.http.post(this.registerURl,userObj);
  }

  //----------------- GETDATA ---------------------------------------------
  UserData(userId)
  {
    return this.http.get(this.userProfileURL + userId)
  }

  GetUsers()
  {
    return this.http.get(this.getUsersURL);
  }

  GetSubjects()
  {
    return this.http.get(this.subjectURL);
  }
  GetSubject(subId)
  {
    return this.http.get("http://localhost:53940/api/Subject/"+subId);
  }

  GetResults()
  {
    return this.http.get(this.getResultsURL);
  }
  GetResult(resId)
  {
    return this.http.get("http://localhost:53940/api/Results/"+resId);
  }

  GetFeedback()
  {
    return this.http.get(this.getFdkbckURL);
  }

  GetQuestionBySubId(subId)
  {
    return this.http.get("http://localhost:53940/api/Questions/"+subId);
  }
  GetQuestionByQId(qId)
  {
    return this.http.get("http://localhost:53940/api/Questions/"+qId);
  }

  GetPDF()
  {
    return this.http.get("http://localhost:54881/api/Subject/pdf");
  }

  //----------------- ADD MODIFY DATA ---------------------------------------------
  AddSubject(subObj)
  {
    return this.http.post(this.subjectURL,subObj);
  }

  AddQuestions(quesObj)
  {
    debugger
    return this.http.post(this.addQuesURL,quesObj);
  }

  EditQuestions(queId,quesObj)
  {
    debugger
    return this.http.put(this.addQuesURL+"/"+queId,quesObj);
  }
  UpdatePwd(userObj)
  {
    return this.http.put(this.forgotPwdURL,userObj);
  }
  ModifySubject(subId, subObj)
  {
    return this.http.put("http://localhost:53940/api/Subject/"+subId,subObj);
  }

  UpdateUser(userId,userObj)
  {
    console.log(userObj);
    
    return this.http.put("http://localhost:53940/api/Users/"+userId,userObj);
  }

  SubmitAns(obj:any)
  {
    return this.http.post(this.submitAnsURL,obj);
  }

  insertFeedback(obj)
  {
    return this.http.post(this.postfeedbkURL,obj);
  }

  SendScore(obj:any)
  {
    return this.http.post(this.getResultsURL,obj);
  }

  //----------------------REMOVE REQUESTS--------------------------------------------
  DeleteUser(userId)
  {
    return this.http.delete(this.userProfileURL+userId);
  }

  DeleteSubject(subId)
  {
    return this.http.delete("http://localhost:53940/api/Subject/"+subId);
  }
//---------------------------------------------------------------------------------
  OTPGenerate(email)
  {
    alert("inside OTPGenerate ");
    var RUser={
      "EmailId":email,
      
     };

    return this.http.post(this.forgotPwdURL, RUser);
  }
  OTPValidate(otp,email)
  {
    
    alert("inside validateOTP");
    var RUser={
      "EmailId":email,
      "OTP":otp
     };

   
     console.log(RUser);
    
    return this.http.post(this.generateOTPURL, RUser,);
  }

  Passwordreset(password,email)
  {

    alert("inside validateOTP");
    var RUser={
      "EmailId":email,
      "Password":password,
      
     };

      console.log(RUser);
     
    return this.http.put(this.changePwdURL, RUser);
  }
}

