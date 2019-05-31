import React, { Component } from 'react';
import api from "./../../api";
import { Container, Row, Col} from 'reactstrap';
import {withRouter} from 'react-router-dom';
// import EditEventDetail from "./EditEventDetail";


class PersonalEventProcess extends Component {
  constructor(props){
    super(props)
    this.state = {
      isShow:true,
      event:this.props.event,
      attendants:"",
      isEdit:false,
      isOrg:false,
      isCancel:false,
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
    let curUser = api.getLocalStorageUser();
    let curUserId = curUser._id;
    api.getAttendence(eventId)
        .then(attendants => {
          // let dateUpdate = this.state.event.isChecked
          // let attendants = res;
          let isOrg = false;
          let isCancel = false;
          let startedShow = this.convertUTCDateToLocalDate(this.state.event._event.started)
          let endedShow = this.convertUTCDateToLocalDate(this.state.event._event.ended)


          let attendantsShow = [];
          // let expectDate = this.convertUTCDateToLocalDate(this.state.event.started)
          attendants.map((cur) => {
            // console.log(cur)         
              let childname = ""
              if(cur._user !== undefined && cur._user._child !== undefined && cur._user._child.length > 0){
                cur._user._child.map(curChild => {
                  childname += curChild.firstname
                  childname += ","
                })
              }
              if(cur._user._id === curUserId && (cur.tag === "organize" || cur.tag === "asigned ")) {
                isOrg = true
              }

              if(cur._user._id === curUserId && cur.isCancel !== undefined) {
                isCancel = cur.isCancel
              }

              if(childname.length > 0){
                childname = childname.substring(0, childname.length-1)
              }
              let expectDate ="";
              if(cur.expectDate !== undefined){
                expectDate = this.convertUTCDateToLocalDate(cur.expectDate);
              }
              let curAttendants = {
                              firstname: cur._user.firstname,
                              childname: childname,
                              expectDate: expectDate,
                              tag:cur.tag
                          }
              attendantsShow.push(curAttendants)
              })
              
              this.setState({
                attendants:attendantsShow,
                startedShow:startedShow,
                endedShow:endedShow,
                isOrg:isOrg,
                isCancel:isCancel,
              })
        })

  }

  
  handleChange(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.history.push("/person/editProEvent/" + this.state.event._event._id)
  }  

  handleCancel(e){
    e.preventDefault();
    e.stopPropagation();
    let eventId = this.state.event._event._id;
    api.postCancelEvent(eventId)
       .then(res => {
         this.setState({
           isCancel:true,
         })
       })

  }

  componentDidMount(){
    this.loadAttendants()
    // console.log(this.props.event)
   

  }
  render() {
    return (
      <div className="event-process">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
            
          <div className="event-detail-title">{this.state.event._event.title}</div>
          <div className="event-detail-exec-period">
              <i className="far fa-calendar-alt"></i>&nbsp;<span>{this.state.startedShow} - {this.state.endedShow}</span>
          </div>
          <div className="event-detail-state">status: {this.state.event._event.eventState}</div>
          <div className="event-detail-state">role: {this.state.event.tag}</div>
          <div className="event-detail-description">description: <div>{this.state.event._event.description}</div></div>
          <div style={{ marginLeft:"5px",textAlign:"left", fontSize:"0.8rem"}}>Attendants:</div>
          <Container style={{fontSize:"0.6rem"}}>
            <Row>
              <Col xs="1" style={{padding:"0",margin:"0"}}>#</Col>
              <Col xs="7" style={{padding:"0",margin:"0"}}>Name</Col>
              <Col xs="4" style={{padding:"0",margin:"0"}} >Role</Col>
            </Row>
         
            {this.state.attendants && (
              this.state.attendants.map((cur,i) => (
                <Row key={i}>
                  <Col  xs="1" style={{padding:"0",margin:"0"}}>{i + 1}</Col>
                  <Col  xs="7" style={{padding:"0",margin:"0"}}>{cur.firstname + `(`+ cur.childname + `)`}</Col>
                  <Col  xs="4" style={{padding:"0",margin:"0"}}>{cur.tag}</Col>              
                </Row>
              ))
            )}
          </Container>
          {this.state.isOrg && ( <div className="btn-click" onClick={(e)=>this.handleChange(e)}>Change</div>)}
          {!this.state.isOrg && !this.state.isCancel && (<div className="btn-click" onClick={(e) => this.handleCancel(e)}>Cancel</div>)}
          {!this.state.isOrg && this.state.isCancel && (<div style={{textAlign:"left", fontSize:"0.8rem"}}>Please wait orgainzer to deal with it.</div>)}
         
      </div>)}

    </div>
    )
  }
}

export default withRouter(PersonalEventProcess);