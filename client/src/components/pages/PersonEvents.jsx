import React, { Component } from 'react';
import BigCalendar from "react-big-calendar";
import Toolbar from "react-big-calendar";
import CustomToolBar from "./CustomToolBar"

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "./../../api";
import PersonalEventDetail from "./PersonalEventDetail";
import {withRouter, Route } from 'react-router-dom';

const localizer = BigCalendar.momentLocalizer(moment);

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class PersonEvents extends Component {
  constructor(props){
    super(props)
    this.state = {
      // view: "week",
      date: new Date(),
      width: 300,
      height:500,
      events:[],
      modal: false,
      curevent:"",
    }

    this.toggle = this.toggle.bind(this);
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

  handletoggle(event){
    this.toggle()
    this.setState({
      curevent:event
    })
    console.log(this.state.curevent)
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSelect(){
    console.log("handle select")
  }

  loadEvents(){
    api.getPersonalEvent()
       .then(events => {
         console.log(events)
         let curEvents = [];
         events.map((eve, i) => {
           let cur
           let eventState = eve._event.eventState;
           console.log("------evenstate------")
           console.log(eventState)
           let role = eve.tag
           console.log(role)
           if(eventState === "pre-process" && (role === "organize" || role === "assigned Org")){
            let started = new Date(eve._event.updated_at).setDate(new Date(eve._event.updated_at).getDate() + 1)
            let newStarted = new Date(started)
            let ended = new Date(eve._event.ended).setDate(new Date(eve._event.ended).getDate() + 16)
            let newEnded = new Date(ended)
            let showDetailStarted = this.convertUTCDateToLocalDate(newStarted)
            let showDetailEnded = this.convertUTCDateToLocalDate(newEnded)
             console.log("---------org+pre-process-------")
            cur = {
              "title":eve._event.title + " - choose date for task",
              "hint":"you are an organizer, please choose 3 possible date for task. Please left at least 14 days before task start.",
              "start":newStarted,
              "end":newEnded,
              "showStarted":showDetailStarted,
              "showEnded":showDetailEnded,
              "id": eve._event._id,
              "description":eve._event.description,
              "tag":eve.tag,
              "eventState":eve._event.eventState,
             }
            console.log(cur)
           }

           if(eventState === "pre-process" && (role === "participate" || role === "assigned")){

             let started = new Date(eve._event.updated_at).setDate(new Date(eve._event.updated_at).getDate() + 1)
             let newStarted = new Date(started)
             let ended = new Date(eve._event.ended).setDate(new Date(eve._event.ended).getDate() + 16)
             let newEnded = new Date(ended)
             let showDetailStarted = this.convertUTCDateToLocalDate(newStarted)
             let showDetailEnded = this.convertUTCDateToLocalDate(newEnded)

             cur = {
              "title":eve._event.title + " - choose date for task",
              "hint":"you are an participants, please choose 1 of 3 possible dates for the task.",
              "start":newStarted,
              "end":newEnded,
              "showStarted":showDetailStarted,
              "showEnded":showDetailEnded,
              "id": eve._event._id,
              "description":eve._event.description,
              "tag":eve.tag,
              "eventState":eve._event.eventState, 
             }
           }

           if(eventState === "process"){
            let showDetailStarted = this.convertUTCDateToLocalDate(eve._event.started)
            let showDetailEnded = this.convertUTCDateToLocalDate(eve._event.ended)
            cur = {
              "title":eve._event.title,
              // "start":eve._event.started,
              "start":eve._event.started,
              "end":eve._event.ended,
              "showStarted":showDetailStarted,
              "showEnded":showDetailEnded,
              "id": eve._event._id,
              "description":eve._event.description,
              "tag":eve.tag,
              "eventState":eve._event.eventState, 
             }
           }

           if(eventState === "finish"){
            //  let started = eve._event.ended
             let started = new Date(eve._event.ended).setDate(new Date(eve._event.ended).getDate() + 1)
             let newStarted = new Date(started)
             let ended = new Date(eve._event.ended).setDate(new Date(eve._event.ended).getDate() + 16)
             let newEnded = new Date(ended)
             let showDetailStarted = this.convertUTCDateToLocalDate(newStarted)
             let showDetailEnded = this.convertUTCDateToLocalDate(newEnded)
             cur = {
              "title":eve._event.title + " - check final work hours",
              "start":newStarted,
              "end":newEnded,
              "showStarted":showDetailStarted,
              "showEnded":showDetailEnded,
              "id": eve._event._id,
              "description":eve._event.description,
              "tag":eve.tag,
              "eventState":eve._event.eventState
             }
            }
           
           curEvents.push(cur)
         })
         this.setState({
           events:curEvents,
           width: window.innerWidth,
           height: window.innerHeight
         })
         console.log("--------------- load events ----------------")
         console.log(this.state.events)
       })
  }

  handleSelectEvent(event){
    
    this.props.history.push("/person/eventDetail/"+event.id)
  }

  componentDidMount() {
    this.loadEvents()   
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.curevent !== prevState.curevent) {
      console.log("-----update------")
      console.log(this.state.curevent)
      console.log(this.state.view)
      
    }
    
    // console.log(this.props.info.match.params.id)
  }

  render() {
    return (
      <div className="person-event">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
        <BigCalendar
          selectable={true}
          localizer={localizer}
          style={{ height: this.state.height, width: this.state.width }}
          // toolbar={true}
          events={this.state.events}
          step={60}
          // views={allViews}
          view={this.state.view}
          onView={this.onView}
          // date={this.state.date}
          // onNavigate={date => this.setState({ date })}
          onSelectEvent={(event) => this.handleSelectEvent(event)}
          onSelectSlot={() =>this.handleSelect()}
          startAccessor="start"
          endAccessor="end"
          views={ ['month', 'day'] }
          components={{
            toolbar: CustomToolBar,
          }}
        />

        {/* <PersonalEventDetail toggle={this.toggle} modal={this.state.modal} event={this.state.curevent} tag={this.state.curevent.tag}/> */}
      </div>)}
      </div>

    );
  }
}

export default withRouter(PersonEvents);