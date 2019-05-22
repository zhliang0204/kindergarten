import React, { Component } from 'react';
import api from "./../../api";

export default class PersonalEventDetailPart extends Component {
  constructor(props){
    super(props)
    this.state = {
      isShow:true,
      event:this.props.event,
      dateList:[],
      datePicker:"",
      isPickDate:false,
    }
  }

  loadEvent(eventId){
    api.getPossibleDateForParticipant(eventId)
          .then(res => {
            let isPickDate = this.state.event.isChecked
            if(!isPickDate){
              this.setState({
                dateList:res[0].expectedDates,
                isPickDate:isPickDate,
              })
            } else {
              this.setState({
                datePicker:res[0].expectedDates[this.state.event.expectDate],
                isPickDate:isPickDate,
              })
            }

          })
  }

  parDatePick(e){
    let index = parseInt(e.target.name)
    // console.log(index)
    
    let dateInfo = {selectDateKey:index};
    console.log(dateInfo)
    let eventId = this.state.event._event._id
    api.updateDatesSlot(eventId, dateInfo)
       .then(res => {
         this.setState({
          isPickDate:true,
          datePicker:this.state.dateList[index]
         })
       })
    api.changeCheckedParticipant(eventId,dateInfo)
       .then(res => {
         console.log("---update participants status----")
       })
  }

  componentDidMount(){
    this.loadEvent(this.state.event._event._id)
    console.log(this.props.event)
    

  }
  render() {
    return (
      <div className="event-parti-preprocess">
          <header>Choose one of task date: {this.state.event._event.title}</header>
          <h5>Description:</h5>
          <p>{this.state.event._event.description}</p>
          <h5>Started:</h5>
          <p>{this.state.event._event.started}</p>
          <h5>Ended:</h5>
          <p>{this.state.event._event.ended}</p>
          <h5>Attendants:</h5>
          {this.state.attendants && (
            <ul>
              {this.state.attendants.map((cur,i) => (
                <li key={i}>{cur._user.firstname}</li>
              ))}
            </ul>
          )}

          <div>
            {!this.state.isPickDate && this.state.dateList && (<div>
              <h5>Choose one day to do task</h5>
              {this.state.dateList.map((cur,i) => (
                <div key={i}>
                <p>Started: {cur.started}</p>
                <p>Ended: {cur.started}</p>
                <p><button name={i} onClick={(e)=>this.parDatePick(e)}>choose</button></p>
                </div>
              ))}
            </div>)}

           {this.state.isPickDate && this.state.datePicker && (
              <div>
                <h5>Your choice of date</h5>
                <p>Started: {this.state.datePicker.started}</p>
                <p>Ended: {this.state.datePicker.ended}</p>
              </div>
            )}
          </div>
      </div>
    )
  }
}
