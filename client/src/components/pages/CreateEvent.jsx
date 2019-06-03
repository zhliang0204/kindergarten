import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from '../../api';
import {Datetime} from 'react-datetime';

export default class CreateEvent extends Component {
  constructor(props){
    super(props)
    this.state = {
      title:"",
      description:"",
      reqpersons: 1,
      reqhours: 1,
      started:'',
      ended:'',
      applybefore: "",
      resource:"",
      errors:{},
      errPos:0,
      errorList:[],

    }
  }

  handleInputChange(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  checkValue(){
    let errorList = [];
    if(this.state.title === ""){
      errorList.push(1)
    }
    if(this.state.description === ""){
      errorList.push(2)
    }
    if(this.state.resource === ""){
      errorList.push(3)
    }
    if(this.state.reqpersons <= 0){
      errorList.push(4)
    }
    if(!this.state.reqpersons){
      errorList.push(5)
    }
    if(this.state.reqhours <= 0){
      errorList.push(6)
    }
    if(!this.state.reqhours){
      errorList.push(7)
    }
    if(this.state.started === ""){
      errorList.push(8)
    }
    if(this.state.ended === ""){
      errorList.push(9)
    }
    if(this.state.applybefore === ""){
      errorList.push(10)
    }
    if(this.state.started >= this.state.ended){
      errorList.push(11)
    }
    if(this.state.applybefore >= this.state.started){
      errorList.push(12)
    }

    return errorList
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

  handleCreate(e){
    e.preventDefault();
    e.stopPropagation();
    let errorList = this.checkValue()
    if(errorList.length === 0){
      let event = {
        title: this.state.title,
        description: this.state.description,
        reqpersons:this.state.reqpersons,
        reqhours:this.state.reqhours,
        started: this.state.started,
        ended:this.state.ended,
        applybefore: this.state.applybefore,
        resource:this.state.resource,
      }
   
      // console.log('---------event to create---------')
      // console.log(event)
      api.createEvent(event)
          .then(res => {
            let cur = {
              role: api.getLocalStorageUser().role,
              title: res.title,
              id: res._id,
              eventState:res.eventState
            }

            let emailinfo = {
              newevent:cur
            };
  
            api.createEventMail(emailinfo)
            // console.log(res)
            this.setState({
              title: '',
              description: '',
              reqpersons:0,
              reqhours:0,
              started: '',
              ended:'',
              resource:"",
              applybefore:""
            })
            this.props.info.history.push("/events")
          })
    } else {
      this.setState({
        errorList:errorList
      })
    }
  
}

  render() {
    return (
      <div className="Add-mission outer-div">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}

        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}

        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}
        {this.props.langTab ==="lang4" && (<div className="english">
          <Form>
            <FormGroup className="inputtitle-type">
              <Label for="eventName">Task:</Label>
              {this.state.errorList.indexOf(1) !== -1 && (<div className="hint">Please input task title.</div>)}
              <Input
                type="text"
                name="title"
                id="eventName"
                value={this.state.title}
                onChange={(e) => this.handleInputChange(e)}
              />
            </FormGroup>
            <FormGroup  className="inputtitle-type">
              <Label for="description">Description:</Label>
              {this.state.errorList.indexOf(2) !== -1 && (<div className="hint">Please input description of the task.</div>)}
             
              <Input
                type="textarea"
                name="description"
                id="description"
                value={this.state.description}
                onChange={(e) => this.handleInputChange(e)}
              />
            </FormGroup>    

            <FormGroup className="inputtitle-type">
              <Label for="resource">Resource:</Label>
              {this.state.errorList.indexOf(3) !== -1 && (<div className="hint">Please input resource of the task</div>)}

              <Input
                type="textarea"
                name="resource"
                id="resource"
                value={this.state.resource}
                onChange={(e) => this.handleInputChange(e)}
              />  
            </FormGroup>     

            <FormGroup  className="inputtitle-type">
              <Label for="reqpersons">Number of Persons:</Label>
              {this.state.errorList.indexOf(4) !== -1 && (<div className="hint">Please input a positive number of person for this task</div>)}
              {/* {this.state.errorList.indexOf(5) !== -1 && (<div className="hint">Please input a positive number of person for this task</div>)} */}
              <Input
                type="number"
                name="reqpersons"
                id="reqpersons"
                value={this.state.reqpersons}
                onChange={(e) => this.handleInputChange(e)}
              />
            </FormGroup>
            <FormGroup  className="inputtitle-type">
              <Label for="reqhours">Number of Hours:</Label>
              {this.state.errorList.indexOf(6) !== -1 && (<div className="hint">Please input a positive number of hours for this task</div>)}
              {/* {this.state.errorList.indexOf(7) !== -1 && (<div className="hint">Please input a positive number of hours for this task</div>)} */}

              <Input
                type="number"
                name="reqhours"
                id="reqhours"
                value={this.state.reqhours}
                onChange={(e) => this.handleInputChange(e)}
              />
            </FormGroup>
  

            <FormGroup  className="inputtitle-type">
              <Label for="startDate">Start Date:</Label>
              {/* {(this.state.errors.started) && (<div className="hint">please input start date and time</div>)} */}
              {this.state.errorList.indexOf(8) !== -1 && (<div className="hint">Please input date and time together</div>)}

              <Input
                type="datetime-local"
                name="started"
                id="startDate"
                min={this.convertDateFormat(this.dateSet(new Date(), 30, "plus"))}
                value={this.state.started}
                onChange={(e) => this.handleInputChange(e)}
              />
            </FormGroup>

          
            <FormGroup  className="inputtitle-type">
              <Label for="endedDate">End Date:</Label>
              {this.state.errorList.indexOf(9) !== -1 && (<div className="hint">Please input date and time together</div>)}
              {this.state.errorList.indexOf(11) !== -1 && (<div className="hint">Please make sure ended time is later than started time</div>)}
              
              <Input
                type="datetime-local"
                name="ended"
                id="endedDate"
                value={this.state.ended}
                min={this.convertDateFormat(this.dateSet(this.state.started, 0, "plus"))}
                onChange={(e) => this.handleInputChange(e)}
              />
            </FormGroup>

            <FormGroup  className="inputtitle-type">
              <Label for="applybefore">Apply Before:</Label>
              {this.state.errorList.indexOf(10) !== -1 && (<div className="hint">Please input date and time together</div>)}
              {this.state.errorList.indexOf(12) !== -1 && (<div className="hint">Please make sure apply time is later than started time</div>)}
              <Input
                type="datetime-local"
                name="applybefore"
                id="applybefore"
                value={this.state.applybefore}
                min={this.convertDateFormat(this.dateSet(new Date(), 7, "plus"))}
                max={this.convertDateFormat(this.dateSet(this.state.started, 10, "minus"))}

                onChange={(e) => this.handleInputChange(e)}
              />
            </FormGroup>

            <div className="btn-click" onClick={(e) => this.handleCreate(e)}>Create</div>
          </Form>
        </div>)}
        </div>
      
    )
  }
}
