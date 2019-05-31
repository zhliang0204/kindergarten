import React, { Component } from 'react';
import api from "./../../api";
import { Button, Table, Input, Container, Row, Col} from 'reactstrap';

export default class PersonalEventDetailPart extends Component {
  constructor(props){
    super(props)
    this.state = {
      isShow:true,
      event:this.props.event,
      dateList:[],
      datePicker:"",
      isPickDate:false,
      startedShow:"",
      endedShow:"",
      isPickDateAvail:false,
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

  loadEvent(eventId){
    api.getPossibleDateForParticipant(eventId)
          .then(res => {
            console.log(res)
            if(res.length > 0) {
              let isPickDate = this.state.event.isChecked
              let expectedDatesShow = [];
              res[0].expectedDates.map((cur,i) => {
                let started ="";
                let ended ="";
                if(cur.started){started = this.convertUTCDateToLocalDate(cur.started)}
                if(cur.ended){ended = this.convertUTCDateToLocalDate(cur.ended)}
                let curdate = {
                  index:i,
                  started:started,
                  ended:ended,
                  picker:cur.picker
                }
                expectedDatesShow.push(curdate)
              })
              this.setState({
                dateList:expectedDatesShow,
                isPickDate:isPickDate,
                startedShow: this.convertUTCDateToLocalDate(this.state.event._event.started),
                endedShow: this.convertUTCDateToLocalDate(this.state.event._event.ended)
              })
            }
          })
  }

  parDatePick(e){
    let index = parseInt(e.target.name)
    // console.log(index)
    
    let dateInfo = {selectDateKey:index};
    // console.log(dateInfo)
    let eventId = this.state.event._event._id
    let newDateList = this.state.dateList.slice()
    let newCur = newDateList[index]
    newCur.picker = newCur.picker + 1;
    newDateList.splice(index, 1, newCur)

    api.updateDatesSlot(eventId, dateInfo)
       .then(res => {
         this.setState({
          isPickDate:true,
          dateList:newDateList,
         })
       })
    api.changeCheckedParticipant(eventId,dateInfo)
       .then(res => {
         console.log("---update participants status----")
       })
  }

  componentDidMount(){
    this.loadEvent(this.state.event._event._id)
    // console.log(this.props.event)
    

  }
  render() {
    return (
      <div className="event-parti-preprocess">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
          <div className="event-detail-title">{this.state.event._event.title + ` - choose date for task`}</div>
          <div className="event-detail-exec-period">
              <i className="far fa-calendar-alt"></i>&nbsp;<span>{this.state.startedShow} - {this.state.endedShow}</span>
          </div>
          <div className="event-detail-state">status: {this.state.event._event.eventState}</div>
          <div className="event-detail-state">role: {this.state.event.tag}</div>
          <div className="event-detail-description">Hint:<div>you are an participants, please choose 1 of 3 possible dates for the task.</div></div>
          <div className="event-detail-description">description: <div>{this.state.event._event.description}</div></div>

          <div>
            {this.state.dateList.length === 0 && (<div style={{textAlign:"center", fontSize:"0.8rem", fontWeight:"700"}}>
              please wait organizer provide 3 possible date for this task.
            </div>)}
            {this.state.dateList.length > 0 && (<div>
              {this.state.isPickDate && (<div style={{textAlign:"left", fontSize:"0.8rem", fontWeight:"700"}}>The current choose result</div>)}
              {!this.state.isPickDate && ( <div style={{textAlign:"left", fontSize:"0.8rem", fontWeight:"700"}}>Choose one day to do task</div>)}
             
              <Container style={{fontSize:"0.6rem"}}>
                <Row>
                  {/* <Col xs="1" style={{padding:"0",margin:"0"}}>#</Col> */}
                  <Col xs="5" style={{padding:"0",margin:"0"}}>Started</Col>
                  <Col xs="1" style={{padding:"0",margin:"0"}} >To</Col>
                  <Col xs="5" style={{padding:"0",margin:"0"}} >Ended</Col>
                  <Col xs="1" style={{padding:"0",margin:"0"}} >Pick</Col>
                </Row>
                
                {this.state.dateList.map((cur,i) => (
                  <Row key={i}>
                  <Col xs="5" style={{padding:"0",margin:"0"}}>{cur.started}</Col>
                  <Col xs="1" style={{padding:"0",margin:"0"}} >-</Col>
                  <Col xs="5" style={{padding:"0",margin:"0"}} >{cur.started}</Col>
                  {!this.state.isPickDate && (
                    <Col xs="1" style={{padding:"0",margin:"0"}} >
                     <button className="date-choose-btn" name={i} onClick={(e)=>this.parDatePick(e)}></button>
                    </Col>
                  )} 

                  {this.state.isPickDate && (
                    <Col xs="1" style={{padding:"0",margin:"0"}} >
                     {cur.picker}
                    </Col>
                  )} 
                  </Row>
                ))}
              </Container>
            </div>)}
          </div>
        </div>)}
      </div>
    )
  }
}
