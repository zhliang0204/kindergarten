import React, { Component } from 'react';
import api from "./../../api";
import { Button, Table, Input, Container, Row, Col} from 'reactstrap';

export default class PersonalEventDetailOrg extends Component {
  constructor(props){
    super(props)
    this.state = {
      isShow:true,
      event:this.props.event,
      attendants:"",
      started1:"",
      started2:"",
      started3:"",
      ended1:"",
      ended2:"",
      ended3:"",
      dateUpdate:false,
      startedShow:"",
      endedShow:"",
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
    api.getAttendence(eventId)
        .then(attendants => {
          let dateUpdate = this.state.event.isChecked
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
              
          
          if(dateUpdate){
            api.getPossibleDateForParticipant(eventId)
               .then(res => {
                 console.log(res)
                 this.setState({
                  started1:this.convertUTCDateToLocalDate(res[0].expectedDates[0].started),
                  ended1:this.convertUTCDateToLocalDate(res[0].expectedDates[0].ended),

                  started2:this.convertUTCDateToLocalDate(res[0].expectedDates[1].started),
                  ended2:this.convertUTCDateToLocalDate(res[0].expectedDates[1].ended),

                  started3:this.convertUTCDateToLocalDate(res[0].expectedDates[2].started),
                  ended3:this.convertUTCDateToLocalDate(res[0].expectedDates[2].ended),

                  attendants:attendantsShow,
                  dateUpdate:dateUpdate,
                  startedShow:startedShow,
                  endedShow:endedShow,
                 })
                
               })
          } else {
            this.setState({
              attendants:attendantsShow,
              dateUpdate:dateUpdate,
              startedShow:startedShow,
              endedShow:endedShow,
            })
          }
        })

  }

  

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  orgDatePick(){
    let eventId = this.state.event._event._id;;
    let dates = {
      datesInfo:[
                  {started:this.state.started1, ended:this.state.ended1, picker:0},
                  {started:this.state.started2, ended:this.state.ended2, picker:0},
                  {started:this.state.started3, ended:this.state.ended3, picker:0},

                ]
    }
    api.orgPostDateSlots(eventId, dates)
        .then(res => {
          this.setState({
            dateUpdate: true
          })
        })
    api.changeStateofPraticipant(eventId)
    api.participantsChooseTimeMail(eventId)
  }


  componentDidMount(){
    this.loadAttendants()
    console.log(this.props.event)
   

  }

  render() {
    return (
      <div className="personal-event-detail-org">
        <div className="event-org-preprocess">
          <div className="event-detail-title">{this.state.event._event.title +` - choose date for task`} </div>
          <div className="event-detail-exec-period">
              <i className="far fa-calendar-alt"></i>&nbsp;<span>{this.state.startedShow} - {this.state.endedShow}</span>
          </div>
          <div className="event-detail-state">status: {this.state.event._event.eventState}</div>
          <div className="event-detail-state">role: {this.state.event.tag}</div>
          <div className="event-detail-description">description: <div>{this.state.event._event.description}</div></div>

          <div className="attendants-detail-title">Attendants List</div>
          <div style={{overflow:"scroll"}}>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Attendants</th>
                <th>Role</th>
                <th>ExpectDate</th>
              </tr>
            </thead>
            <tbody>
              {this.state.attendants.length > 0 && (
                this.state.attendants.map((curApl, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{curApl.firstname + `(`+ curApl.childname + `)`}</td>
                    <td>{curApl.tag}</td>
                    <td>{curApl.expectDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        <div className="org-date-picker">
        <h5 style={{textAlign:"left", fontSize:"0.8rem", fontWeight:"700"}}>Selected 3 possible time slot to do task</h5>
          <Container>
            <Row>
              <Col xs="1" style={{padding:"0",margin:"0"}}>#</Col>
              <Col xs="5">Started</Col>
              <Col xs="1" style={{padding:"0",margin:"0"}} >To</Col>
              <Col xs="5" >Ended</Col>
            </Row>

            <Row>
              <Col xs="1" style={{padding:"0",margin:"0"}}>1</Col>
              <Col xs="5">
                {!this.state.dateUpdate && (<Input
                            type="datetime-local"
                            name="started1"
                            value={this.state.started1}
                            onChange={(e) => this.handleInputChange(e)}
                          />)
                        }
                {this.state.dateUpdate && (this.state.started1)}
              </Col>
              <Col xs="1" style={{padding:"0",margin:"0"}}>-</Col>
              <Col xs="5">
                {!this.state.dateUpdate && (<Input
                          type="datetime-local"
                          name="ended1"
                          value={this.state.ended1}
                          onChange={(e) => this.handleInputChange(e)}
                        />)}
                {this.state.dateUpdate && (this.state.ended1)}
              </Col>
            </Row>

            <Row>
              <Col xs="1" style={{padding:"0",margin:"0"}}>2</Col>
              <Col xs="5">
                {!this.state.dateUpdate && (<Input
                          type="datetime-local"
                          name="started2"
                          value={this.state.started2}
                          onChange={(e) => this.handleInputChange(e)}
                        />)}

                  {this.state.dateUpdate && (this.state.started2)}

              </Col>
              <Col xs="1" style={{padding:"0",margin:"0"}}>-</Col>
              <Col xs="5">
                {!this.state.dateUpdate && (<Input
                          type="datetime-local"
                          name="ended2"
                          value={this.state.ended2}
                          onChange={(e) => this.handleInputChange(e)}
                        />)}

                  {this.state.dateUpdate && (this.state.ended2)}
              </Col>
            </Row>
            <Row>
              <Col xs="1" style={{padding:"0",margin:"0"}}>3</Col>
              <Col xs="5">
              {!this.state.dateUpdate && (<Input
                          type="datetime-local"
                          name="started3"
                          value={this.state.started3}
                          onChange={(e) => this.handleInputChange(e)}
                        />)}

                        {this.state.dateUpdate && (this.state.started3)}</Col>
              <Col xs="1" style={{padding:"0",margin:"0"}}>-</Col>
              <Col xs="5">{!this.state.dateUpdate && (<Input
                          type="datetime-local"
                          name="ended3"
                          value={this.state.ended3}
                          onChange={(e) => this.handleInputChange(e)}
                        />)}

                        {this.state.dateUpdate && (this.state.ended3)}</Col>
            </Row>
          </Container>
          {!this.state.dateUpdate && (<Button onClick={()=>this.orgDatePick()}>Submit</Button>)}
        </div>
        </div>
      </div>
    )
  }
}
