import React, { Component } from 'react';
import api from "./../../api";
import { Button, Table, Input, Container, Row, Col} from 'reactstrap';



export default class PersonalEventFinish extends Component {
  constructor(props){
    super(props)
    this.state = {
      isShow:true,
      event:this.props.event,
      attendants:"",
      isOrg:"",
      update:[],
      isUpdate:false,
      startedShow:"",
      endedeShow:""
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
    let dateFormat = month+"/"+day+"/"+year+ " " +hour+":"+minutes+":"+seconds
    return dateFormat;   
}

  loadAttendants(){
    let eventId = this.state.event._event._id;
    let role = this.state.event.tag;
    let startedShow = this.convertUTCDateToLocalDate(this.state.event._event.started)
    let endedShow = this.convertUTCDateToLocalDate(this.state.event._event.ended)
    let isOrg;
    if (role === "organize" || role === "assigned Org"){
      isOrg = true

      api.getFinalAttendants(eventId)
        .then( attendants => {
          // console.log(res)
          let attendantsShow = [];
          // let expectDate = this.convertUTCDateToLocalDate(this.state.event.started)
          attendants.map((cur) => {
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
              // let expectDate ="";
              // if(cur.expectDate !== undefined){
              //   expectDate = this.convertUTCDateToLocalDate(cur.expectDate);
              // }
              let curAttendants = {
                              userId: cur._user._id,
                              firstname: cur._user.firstname,
                              childname: childname,
                              serviceHours: cur.serviceHours,
                              tag:cur.tag
                          }
              attendantsShow.push(curAttendants)
              })

          return attendantsShow
        })
        .then(res => {
          this.setState({
            isOrg:isOrg,
            attendants:res,
            startedShow:startedShow,
            endedShow:endedShow
          })
        })
    } else {
      isOrg = false
      this.setState({
        isOrg:isOrg,
        startedShow:startedShow,
        endedShow:endedShow
      })
    }
  }

  

  handleInputChange(event) {
    let index = parseInt(event.target.id);
    let curAttendants = this.state.attendants.slice();
    curAttendants[index].serviceHours = event.target.value
    console.log(curAttendants)
    
    this.setState({
      attendants: curAttendants
    })
  }


  handleSubmit(){
    let attendants = this.state.attendants;
    let eventId = this.state.event._event._id;
    let updateInfo = []
    attendants.map(cur => {
      let curAtt = {
        _user:cur.userId,
        serviceHours:cur.serviceHours
      }
      updateInfo.push(curAtt)
    })

    let updateDate = {
      updateInfo:updateInfo,
    }

    api.postFinalsWorkHours(eventId, updateDate)
        .then(res => {
          console.log("-------update work hours----")
          console.log(res)
          api.updateTotalCurServiceHours(eventId)
          .then(res => {
            console.log("-------update personal work-------")
            api.updatePersonCurServiceHours(eventId)
               .then(res => {
                 console.log("--------update email infor------")
                api.createEventFinshInfoMail(eventId)
                .then(res => {
                  console.log("----send email to participant-----")
                })
               })
          })
        })

    this.setState({
      isUpdate:true
    })
  }

  componentDidMount(){
    this.loadAttendants()
    console.log(this.props.event)
   

  }

  render() {
    return (
      // <div>
      <div className="event-org-finish">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
        <div className="event-detail-title">{this.state.event._event.title + ` - check final work hours`}</div>
          <div className="event-detail-exec-period">
              <i className="far fa-calendar-alt"></i>&nbsp;<span>{this.state.startedShow} - {this.state.endedShow}</span>
          </div>
          <div className="event-detail-state">status: {this.state.event._event.eventState}</div>
          <div className="event-detail-state">role: {this.state.event.tag}</div>
          <div className="event-detail-description">Hint:<div>There are 2 days for organizer to check final work hours</div></div>
          <div className="event-detail-description">description: <div>{this.state.event._event.description}</div></div>
          {this.state.isOrg && (
            <div className="attendants">
              <div style={{textAlign:"left", fontSize:"0.8rem", fontWeight:"700"}}>Attendants:</div>
              <Container style={{fontSize:"0.6rem"}}>
                <Row>
                  <Col xs="1" style={{padding:"0",margin:"0"}} >#</Col>
                  <Col xs="7" style={{padding:"0",margin:"0"}} >Name</Col>
                  <Col xs="4" style={{padding:"0",margin:"0"}} >Hours</Col>
                </Row>

                {this.state.attendants && (this.state.attendants.map((cur,i)=> (
                  <Row key={i}>
                    <Col xs="1" style={{padding:"0",margin:"0"}} >{i+1}</Col>
                    <Col xs="7" style={{padding:"0",margin:"0"}} >{cur.firstname + `(`+ cur.childname + `)`}</Col>
                    {this.state.isUpdate && (
                      <Col xs="4" style={{padding:"0",margin:"0"}} >{cur.serviceHours}</Col>
                    )}

                    {!this.state.isUpdate && (
                      <Col xs="4" style={{padding:"0",margin:"0"}} >
                        <input
                          className="check-hours-finish-input"
                          type="text"
                          id={i}
                          name={cur.userId}
                          value = {cur.serviceHours}
                          onChange={(e) => this.handleInputChange(e)}
                        />
                      </Col>
                    )}
                  </Row>
                )))}
              </Container>
             
              {!this.state.isUpdate && (<Button onClick={()=>this.handleSubmit()}>Submit</Button>)}
              {this.state.isUpdate && (<div>The task is finished</div>)}
            </div>
          )}

          {!this.state.isOrg && (
            <div>
              Please wait for organizer to update workhours
            </div>
          )}
        </div>)}
       </div>
    )
  }
}
