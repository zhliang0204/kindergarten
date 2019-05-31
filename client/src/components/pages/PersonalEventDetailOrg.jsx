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
      errorList:[],
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
            // console.log(cur)         
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
                              tag:cur.tag,
                              
                          }
              attendantsShow.push(curAttendants)
              })
              
          
          if(dateUpdate){
            api.getPossibleDateForParticipant(eventId)
               .then(res => {
                //  console.log(res)
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
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  checkDateValidation(){
    let errorList = []
    if(this.state.started1 === ""){
      errorList.push(1)
    }
    if(this.state.ended1 === ""){
      errorList.push(2)
    }
    if(new Date(this.state.started1) >= new Date(this.state.ended1)){
      errorList.push(3)
    }
    if(this.state.started2 === ""){
      errorList.push(4)
    }
    if(this.state.ended2 === ""){
      errorList.push(5)
    }
    if(new Date(this.state.started2) >= new Date(this.state.ended2)){
      errorList.push(6)
    }
    if(this.state.started3 === ""){
      errorList.push(7)
    }
    if(this.state.ended3 === ""){
      errorList.push(8)
    }
    if(new Date(this.state.started3) >= new Date(this.state.ended3)){
      errorList.push(8)
    }

    return errorList
  }

  orgDatePick(){
    let errorList = this.checkDateValidation();
    if(errorList.length > 0){
      this.setState({
        errorList:errorList
      })
    } else {
      let eventId = this.state.event._event._id;
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
  }

  // orgDateEdit(){
  //   console.log("----need to finish edited part------")
  // }

  componentDidMount(){
    this.loadAttendants()
    // console.log(this.props.event)
   

  }

  render() {
    return (
      <div className="personal-event-detail-org">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
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
            {this.state.errorList.indexOf(1) !== -1 && (<div className="hint">"please input started date and time"</div>)}
            {this.state.errorList.indexOf(2) !== -1 && (<div className="hint">"please input ended date and time"</div>)}
            {this.state.errorList.indexOf(3) !== -1 && (<div className="hint">"please make sure ended date is later than started date"</div>)}

            <Row>
              <Col xs="1" style={{padding:"0",margin:"0"}}>#</Col>
              <Col xs="5">Started</Col>
              <Col xs="1" style={{padding:"0",margin:"0"}} >To</Col>
              <Col xs="5" >Ended</Col>
            </Row>

            <Row>
            {this.state.errorList.indexOf(4) !== -1 && (<div className="hint">"please input started date and time"</div>)}
            {this.state.errorList.indexOf(5) !== -1 && (<div className="hint">"please input ended date and time"</div>)}
            {this.state.errorList.indexOf(6) !== -1 && (<div className="hint">"please make sure ended date is later than started date"</div>)}
              <Col xs="1" style={{padding:"0",margin:"0"}}>1</Col>
              <Col xs="5">
                {!this.state.dateUpdate && (<Input
                            type="datetime-local"
                            name="started1"
                            value={this.state.started1}
                            min={this.convertDateFormat(this.dateSet(this.state.event._event.started, 0, "plus"))}
                            max={this.convertDateFormat(this.dateSet(this.state.event._event.ended, 0, "plus"))}
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
                          min={this.convertDateFormat(this.dateSet(this.state.event._event.started, 0, "plus"))}
                          max={this.convertDateFormat(this.dateSet(this.state.event._event.ended, 0, "plus"))}
                          onChange={(e) => this.handleInputChange(e)}
                        />)}
                {this.state.dateUpdate && (this.state.ended1)}
              </Col>
            </Row>

            <Row>
            {this.state.errorList.indexOf(7) !== -1 && (<div className="hint">"please input started date and time"</div>)}
            {this.state.errorList.indexOf(8) !== -1 && (<div className="hint">"please input ended date and time"</div>)}
            {this.state.errorList.indexOf(9) !== -1 && (<div className="hint">"please make sure ended date is later than started date"</div>)}
              <Col xs="1" style={{padding:"0",margin:"0"}}>2</Col>
              <Col xs="5">
                {!this.state.dateUpdate && (<Input
                          type="datetime-local"
                          name="started2"
                          value={this.state.started2}
                          min={this.convertDateFormat(this.dateSet(this.state.event._event.started, 0, "plus"))}
                          max={this.convertDateFormat(this.dateSet(this.state.event._event.ended, 0, "plus"))}
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
                          min={this.convertDateFormat(this.dateSet(this.state.event._event.started, 0, "plus"))}
                          max={this.convertDateFormat(this.dateSet(this.state.event._event.ended, 0, "plus"))}
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
                          min={this.convertDateFormat(this.dateSet(this.state.event._event.started, 0, "plus"))}
                          max={this.convertDateFormat(this.dateSet(this.state.event._event.ended, 0, "plus"))}
                          onChange={(e) => this.handleInputChange(e)}
                        />)}

                        {this.state.dateUpdate && (this.state.started3)}</Col>
              <Col xs="1" style={{padding:"0",margin:"0"}}>-</Col>
              <Col xs="5">{!this.state.dateUpdate && (<Input
                          type="datetime-local"
                          name="ended3"
                          value={this.state.ended3}
                          min={this.convertDateFormat(this.dateSet(this.state.event._event.started, 0, "plus"))}
                          max={this.convertDateFormat(this.dateSet(this.state.event._event.ended, 0, "plus"))}
                          onChange={(e) => this.handleInputChange(e)}
                        />)}

                        {this.state.dateUpdate && (this.state.ended3)}</Col>
            </Row>
          </Container>
          {!this.state.dateUpdate && (<Button onClick={()=>this.orgDatePick()}>Submit</Button>)}
          {/* {this.state.dateUpdate && (<Button onClick={()=>this.orgDateEdit()}>Edit</Button>)} */}

        </div>
        </div>
        </div>)}
      </div>
    )
  }
}
