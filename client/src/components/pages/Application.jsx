import React, { Component } from 'react';
import { 
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Table,
} 
from 'reactstrap';
import api from "./../../api";

export default class Application extends Component {
  constructor(props){
    super(props)
    this.state={
      event:this.props.event,
      expectDate:"",
      applicants:"",
      isApply:null,
      errorHint:"",
      isCouldApply:new Date(this.props.event.applybefore) > new Date(),
    }
  }


  convertUTCDateToLocalDate(date) {
    // let date1 = new Date(date)
    let newDate = new Date(date)

    let year = newDate.getFullYear()
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    let seconds = newDate.getSeconds();
    let minutes = newDate.getMinutes();
    let hour = newDate.getHours();

    if(month < 10){month ="0"+month}
    if(day < 10){day ="0"+day}  
    if(hour < 10){hour ="0"+hour}  
    if(minutes < 10){minutes ="0"+minutes}    
    if(seconds < 10){seconds ="0"+seconds}    
    let dateFormat = month+"/"+day+"/"+year+ " " +hour+":"+minutes
    return dateFormat;   
}

  convertDateFormat(date) {
    // let date1 = new Date(date)
    let newDate = new Date(date)

    let year = newDate.getFullYear()
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    let seconds = newDate.getSeconds();
    let minutes = newDate.getMinutes();
    let hour = newDate.getHours();

    if(month < 10){month ="0"+month}
    if(day < 10){day ="0"+day}  
    if(hour < 10){hour ="0"+hour}  
    if(minutes < 10){minutes ="0"+minutes}    
    if(seconds < 10){seconds ="0"+seconds}    
    let dateFormat = year+"-"+month+"-"+day+ "T" +hour+":"+minutes
    return dateFormat;   
  }

  dateSet(started, dateDiff, types){
    // dateDiff: days differ from current
    // types "plus" or "minus"
    let innerStarted = started;
    if(started === ""){
      innerStarted = new Date()
    }
    let date
    if(types === "plus"){
      date = new Date(innerStarted).setDate(new Date(innerStarted).getDate() + dateDiff)
    } 

    if(types === "minus"){
      date = new Date(innerStarted).setDate(new Date(innerStarted).getDate() - dateDiff)
    }

    return date
    // started = new Date(eve._event.ended).setDate(new Date(eve._event.ended).getDate() + 1)
  }

  handleInputChange(e){
    this.setState({
      [e.target.name] : e.target.value,
      errorHint:""
    })
  }

  loadApplicants(id){
    
       api.getApplication(id)
       .then(applicants => {
         console.log("------load Discussions ------")
         console.log(applicants)
         let applicantsShow = [];
         applicants.map((cur) => {
           console.log(cur)         
             let childname = ""
             if(cur._user !== undefined && cur._user._child !== undefined && cur._user._child.length > 0){
               cur._user._child.map(curChild => {
                 childname += curChild.firstname
                 childname += ","
               })
             }

             if(childname.length > 0){
               childname = childname.substring(0, childname.length-1)
             }
             let expectDate = this.convertUTCDateToLocalDate(cur.expectDate)
             let curApplicants = {
                             firstname: cur._user.firstname,
                             childname: childname,
                             expectDate: expectDate,
                         }
             applicantsShow.push(curApplicants)
             })
             this.setState({
               applicants: applicantsShow,
         })
       })
  }

  loadUserApplyInfo(id){
    api.getPersonApplication(id)
        .then(res => {
          if(res.length > 0){
            this.setState({
              isApply:true
            })
          } else {
            this.setState({
              isApply:false
            })
          }
        })
  }

  handleServiceApply(e){
    e.preventDefault();
    e.stopPropagation();
    let applyInfor = {
      expectDate:this.state.expectDate,
      serviceHours:this.state.event.reqhours
    }
     
    if(!this.state.expectDate) {
        this.setState({
          errorHint:"please input date and time together"
        })
    } else {
      this.setState({
        isApply:true
      })
      api.postPersonApplication(this.state.event._id, applyInfor)
         .then(res => {
           this.loadApplicants(this.state.event._id)

         })
    }
  }

  handleCancelApply(e){
    e.preventDefault();
    e.stopPropagation();
    let eventId = this.state.event._id
    api.removPersonalApplication(eventId)
       .then(res => {
         this.setState({
           isApply:false,
         })
         this.loadApplicants(eventId)
       })
  }
  

  componentDidMount(){
    let eventId = this.state.event._id;
    this.loadApplicants(eventId)
    this.loadUserApplyInfo(eventId)
    console.log("------vote----component-------")
    console.log(this.state.isCouldApply)
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.event !== prevProps.event) {
      this.loadVote(this.props.event._id)
      this.loadUserApplyInfo(this.props.event._id)
    }
    console.log("-----vote ----- match------")
    console.log(this.props.event._id)
  }

  render() {
    return (
      <div className="application">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
          <div>
            <div className="application-detail-title">Applicants List</div>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Applicants</th>
                  <th>ExpectDate</th>
                </tr>
              </thead>
              <tbody>
                {this.state.applicants.length > 0 && (
                  this.state.applicants.map((curApl, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{curApl.firstname + `(`+ curApl.childname + `)`}</td>
                      <td>{curApl.expectDate}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>


          {this.props.tag === 3 && !this.state.isApply && this.state.isCouldApply && (
            <Form>
            <FormGroup style={{textAlign:"left"}}>
              <Label for="expectDate">Apply here, please input your expect date for task:</Label>
              <div className="hint">{this.state.errorHint}</div>
              <Input 
                type="datetime-local" 
                name="expectDate" 
                min={this.convertDateFormat(this.dateSet(this.state.event.started, 0, "plus"))}
                max={this.convertDateFormat(this.dateSet(this.state.event.ended, 0, "plus"))}

                value={this.state.expectDate} 
                onChange={(e)=>this.handleInputChange(e)}/>
            </FormGroup>
              <Button onClick={(e)=>this.handleServiceApply(e)}>Apply</Button>
          </Form> 
          )}

          {this.props.tag === 3 && this.state.isApply && this.state.isCouldApply && (<div className= "btn-click" onClick = {(e) => this.handleCancelApply(e)}>
            Cancel Application
          </div>)}

        </div>)}
      </div>
    )
  }
}
