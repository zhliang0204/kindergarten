import React, { Component } from 'react';
import api from "./../../api";
import { Button, Table, Input, Container, Row, Col} from 'reactstrap';

export default class PersonalEventProcess extends Component {
  constructor(props){
    super(props)
    this.state = {
      isShow:true,
      event:this.props.event,
      attendants:""
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

  // loadAttendants(){
  //   let eventId = this.state.event._event._id;
    
  //   api.getAttendence(eventId)
  //       .then(res => {
  //         this.setState({
  //           attendants:res
  //         })
  //       })
  // }


  loadAttendants(){
    let eventId = this.state.event._event._id;
    api.getAttendence(eventId)
        .then(attendants => {
          // let dateUpdate = this.state.event.isChecked
          // let attendants = res;
          let startedShow = this.convertUTCDateToLocalDate(this.state.event._event.started)
          let endedShow = this.convertUTCDateToLocalDate(this.state.event._event.ended)


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
                endedShow:endedShow
              })
          
          // if(dateUpdate){
          //   api.getPossibleDateForParticipant(eventId)
          //      .then(res => {
          //        console.log(res)
          //        this.setState({
          //         started1:this.convertUTCDateToLocalDate(res[0].expectedDates[0].started),
          //         ended1:this.convertUTCDateToLocalDate(res[0].expectedDates[0].ended),

          //         started2:this.convertUTCDateToLocalDate(res[0].expectedDates[1].started),
          //         ended2:this.convertUTCDateToLocalDate(res[0].expectedDates[1].ended),

          //         started3:this.convertUTCDateToLocalDate(res[0].expectedDates[2].started),
          //         ended3:this.convertUTCDateToLocalDate(res[0].expectedDates[2].ended),

          //         attendants:attendantsShow,
          //         dateUpdate:dateUpdate,
          //         startedShow:startedShow,
          //         endedShow:endedShow,
          //        })
                
          //      })
          // } else {
          //   this.setState({
          //     attendants:attendantsShow,
          //     dateUpdate:dateUpdate,
          //     startedShow:startedShow,
          //     endedShow:endedShow,
          //   })
          // }
        })

  }


  componentDidMount(){
    this.loadAttendants()
    console.log(this.props.event)
   

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
      </div>)}
    </div>
    )
  }
}
