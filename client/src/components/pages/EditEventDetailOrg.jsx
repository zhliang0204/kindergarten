import React, { Component } from 'react'
import api from "./../../api";
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';

export default class EditEventDetailOrg extends Component {
  constructor(props){
    super(props)
    this.state = {
      event:"",
      attendants:[],
      possibleAttants:[],
      possibleUser:"",
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
    let dateFormat = year+"-"+month+"-"+day+ "T" +hour+":"+minutes+":"+seconds
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

  handleInputChange(e){
    e.preventDefault();
    e.stopPropagation();
    let updateField = e.target.name.split("-")
    let curEvent = this.state.event
    curEvent[updateField[1]] = e.target.value;
    this.setState({
      event:curEvent,
    })
  }

  loadEventAndAttendants(eventId){
    api.getEditEvent(eventId)
       .then(attAndEve => {
         let atts = []
         console.log(attAndEve[0]._event.started)
         let event = {
           title:attAndEve[0]._event.title,
           description:attAndEve[0]._event.description,
           started:this.convertUTCDateToLocalDate(attAndEve[0]._event.started),
           ended:this.convertUTCDateToLocalDate(attAndEve[0]._event.ended),
           reqhours:attAndEve[0]._event.reqhours,
           reqpersons:attAndEve[0]._event.reqpersons
         }
         console.log(new Date(event.started).toDateString())
         attAndEve.map(att => {
          let childname = ""
          if(att._user !== undefined && att._user._child !== undefined && att._user._child.length > 0){
            att._user._child.map(curChild => {
              childname += curChild.firstname
              childname += ","
            })
          }

          if(childname.length > 0){
            childname = childname.substring(0, childname.length-1)
          }
          let curAtt = {
            _id:att._id,
            _user:att._user._id,
            _event:att._event._id,
            firstname:att._user.firstname,
            childname:childname,
            isCancel: att.isCancel === undefined? false:att.isCancel
            // set it to false as default
          }

          atts.push(curAtt)
         })
         this.setState({
           event:event,
           attendants:atts
         })
       })
  }

  loadPossibleUser(eventId){
    api.getPossibleUser(eventId)
       .then(possibleUsers => {
         let possibleAttants = []
         possibleUsers.map((cur,i) => {
          let childname = ""
          if(cur !== undefined && cur._child !== undefined && cur._child.length > 0){
            cur._child.map(curChild => {
              childname += curChild.firstname
              childname += ","
            })
          }

          if(childname.length > 0){
            childname = childname.substring(0, childname.length-1)
          }

          let curPossibleUser = {
            _user: cur._id,
            _event:eventId,
            firstname:cur.firstname,
            childname:childname,           
          }
          possibleAttants.push(curPossibleUser)
         })
         this.setState({
           possibleAttants:possibleAttants
         })
        // console.log(this.state.possibleAttants)
       })
  }

  handleUpdateEvent(e){
    e.preventDefault();
    e.stopPropagation();
    let updateInfo = this.state.event;
    if(updateInfo.reqpersons > 1){
      updateInfo.reqOrghours = parseFloat(updateInfo.reqhours) + 3
    } else {
      updateInfo.reqOrghours = parseFloat(updateInfo.reqhours)
    }
   
    let update = {
      updateInfo:updateInfo
    }
    // console.log(update)
    let eventId = this.props.info.match.params.id
    api.updateProEvent(eventId, update)
       .then(res => {
         console.log(res)
         this.props.info.history.push("/person/eventDetail/" + eventId)
       })
  }

  handlePossibleUser(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      possibleUser:e.target.value
    })

  }

  handleUpdateAttendants(e){
    e.preventDefault();
    e.stopPropagation();

    // {_user, _event, serviceHours} = req.body

    let userInfo = this.state.possibleUser.split("-");
    let savedUser = this.state.possibleAttants[userInfo[0]]
    let apiAddUser = {
      _user:savedUser._user,
      _event:savedUser._event,
      serviceHours:this.state.event.serviceHours
    }
    api.addAtt(apiAddUser)
       .then(newAtt => {
         console.log(newAtt)
         let newUser = {
          _id:newAtt._id,
          _user:savedUser._user,
          _event:savedUser._event,
          firstname:savedUser.firstname,
          childname:savedUser.childname,
         }
         let newAtts = this.state.attendants.slice()
         newAtts.push(newUser)
         this.setState({
           attendants:newAtts,
         })
       })
    console.log(this.state.attendants)
    console.log("take place")
  }

  handleRemoveAttendants(e){
    e.preventDefault();
    e.stopPropagation();
    let attInfo = e.target.id.split("-")

    api.removeAtt(attInfo[1])
       .then(res => {
         console.log(res)
         let newAtt = this.state.attendants.slice();
         newAtt.splice(attInfo[0],1)
         this.setState({
           attendants:newAtt,
         })
       })
  }

  componentDidMount(){
    let eventId = this.props.info.match.params.id;
    console.log(eventId)
    this.loadEventAndAttendants(eventId)
    this.loadPossibleUser(eventId)
  }

  goToPrevPage(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.info.history.push("/person/events")
  }

  render() {
    return (
      <div className="outer-div">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
        <div className="go-back" style={{textAlign:"right", fontSize:"0.9rem", color:"#cccccc", marginRight:"10px"}}><i onClick={(e)=>this.goToPrevPage(e)} className="fas fa-times"></i></div>
          <Form>
            <FormGroup className="inputtitle-type">
              <Label for="event-title">Task:</Label>
              {/* {(this.state.errors.title) && (<div className="hint">please input title</div>)} */}
              <Input
                type="text"
                name="event-title"
                id="event-title"
                value={this.state.event.title}
                onChange={(e) => this.handleInputChange(e)}
              />
            </FormGroup>
            <FormGroup  className="inputtitle-type">
              <Label for="event-description">Description:</Label>
              {/* {(this.state.errors.description) && (<div className="hint">please input description</div>)} */}

              <Input
                type="textarea"
                name="event-description"
                id="event-description"
                value={this.state.event.description}
                onChange={(e) => this.handleInputChange(e)}
              />
            </FormGroup>    

            {/* <FormGroup>
              <Label for="resource">Resource:</Label>
              <Input
                type="textarea"
                name="event-resource"
                id="event-resource"
                value={this.state.event.resource}
                onChange={(e) => this.handleInputChange(e)}
              />  
            </FormGroup>      */}

            <FormGroup  className="inputtitle-type">
              <Label for="event-reqpersons">Number of Persons:</Label>
              <Input
                type="number"
                name="event-reqpersons"
                id="event-reqpersons"
                value={this.state.event.reqpersons}
                onChange={(e) => this.handleInputChange(e)}
              />
            </FormGroup>
            <FormGroup  className="inputtitle-type">
              <Label for="event-reqhours">Number of Hours:</Label>
              <Input
                type="number"
                name="event-reqhours"
                id="event-reqhours"
                value={this.state.event.reqhours}
                onChange={(e) => this.handleInputChange(e)}
              />
            </FormGroup>
  

            <FormGroup  className="inputtitle-type">
              <Label for="started">Start Date:</Label>
              {/* {(this.state.errors.started) && (<div className="hint">please input start date and time</div>)} */}

              <Input
                type="datetime-local"
                name="event-started"
                id="event-started"
                // value= {this.state.event.started}
                value ={this.state.event.started}
                onChange={(e) => this.handleInputChange(e)}
              />
            </FormGroup>

          
            <FormGroup  className="inputtitle-type">
              <Label for="ended">End Date:</Label>
              {/* {(this.state.errors.ended) && (<div className="hint">please input end date and time</div>)} */}
              {/* {(this.state.errorPos === 1 || this.state.errorPos === 5) && (<div className="hint">please make sure ended date later than started date</div>)} */}
              <Input
                type="datetime-local"
                name="event-ended"
                id="event-ended"
                value={this.state.event.ended}
                min = {() => this.convertDateFormat(this.state.event.started) }
                onChange={(e) => this.handleInputChange(e)}
              />
            </FormGroup>
          </Form>

          <Table>
            <thead>
              <tr style={{margin:"0", padding:"3px 0"}}>
                <th style={{margin:"0", padding:"3px 0"}}>#</th>
                <th style={{margin:"0", padding:"3px 0"}}>Attendants</th>
                <th style={{margin:"0", padding:"3px 0"}}>isJoin</th>
                <th style={{margin:"0", padding:"3px 0"}}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.attendants.length > 0 && (
                this.state.attendants.map((curApl, i) => (
                  <tr key={curApl._id} style={{margin:"0", padding:"3px 0"}}>
                    <th scope="row" style={{margin:"0", padding:"3px 0"}}>{i + 1}</th>
                    <td style={{margin:"0", padding:"3px 0"}}>{curApl.firstname + `(`+ curApl.childname + `)`}</td>
                    {/* change on isCancel */}
                    {/* X cancel */}
                    {curApl.isCancel && (<td style={{margin:"0", padding:"3px 0"}}><i style={{color: "#ff0000"}} className="fas fa-times"></i></td>)}
                    {!curApl.isCancel && (<td style={{margin:"0", padding:"3px 0"}}><i style={{color: "#00ff00"}} className="fas fa-check"></i></td>)}

                    {/* <td style={{margin:"0", padding:"3px 0"}}><i style={{color: "#ff0000"}} className="fas fa-check"></i><i style={{color: "#00ff00"}} className="fas fa-times"></i></td> */}
                    <td style={{margin:"0", padding:"3px 0"}}><i  id={i+ "-" + curApl._id} onClick = {(e) =>this.handleRemoveAttendants(e) } className="fas fa-user-minus"></i></td>
                  </tr>
                ))
              )}
              <tr style={{margin:"0", padding:"3px 0"}}>
                <th style={{margin:"0", padding:"3px 0"}}>+</th>
                <td colSpan="2" style={{margin:"0", padding:"3px 0"}}>
                  <Form>
                    <FormGroup>
                      <Input type="select" name="newAtt" id="newAtt" bsSize="sm" onChange = {(e) =>this.handlePossibleUser(e) }>
                        {this.state.possibleAttants && this.state.possibleAttants.map((cur,i) => (
  
                          <option 
                            value={i + "-" + cur._user}
                            key ={cur._user}
                          >
                            {cur.firstname + `(` + cur.childname + `)`}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Form>
                </td>
                <td style={{margin:"0", padding:"3px 0"}}><i className="fas fa-user-plus" onClick={(e)=>this.handleUpdateAttendants(e)}></i></td>
              </tr>
            </tbody>
          </Table>
        <div className="btn-click" onClick={(e) => this.handleUpdateEvent(e)}>submit</div>
        </div>)}
      </div>
    )
  }
}
