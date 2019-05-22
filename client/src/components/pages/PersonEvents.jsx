import React, { Component } from 'react';
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "./../../api";
import PersonalEventDetail from "./PersonalEventDetail";
import {withRouter, Route } from 'react-router-dom';

const localizer = BigCalendar.momentLocalizer(moment);

// const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class PersonEvents extends Component {
  constructor(props){
    super(props)
    this.state = {
      view: "week",
      date: new Date(),
      width: 300,
      height:500,
      events:[],
      modal: false,
      curevent:"",
    }

    this.toggle = this.toggle.bind(this);
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
           if(eventState === "finish"){
            //  let started = eve._event.ended
             let started = new Date(eve._event.ended).setDate(new Date(eve._event.ended).getDate() + 1)
             let newStarted = new Date(started)
             let ended = new Date(eve._event.ended).setDate(new Date(eve._event.ended).getDate() + 3)
             let newEnded = new Date(ended)

             cur = {
              "title":eve._event.title,
              "start":newStarted,
              "end":newEnded,
              "id": eve._event._id,
              "description":eve._event.description,
              "tag":eve.tag,
              "eventState":eve._event.eventState
             }
            }
           else{
            cur = {
              "title":eve._event.title,
              "start":eve._event.started,
              "end":eve._event.ended,
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
        //  console.log(this.state.events)
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
      
    }
    
    // console.log(this.props.info.match.params.id)
  }

  render() {
    return (
      <div className="person-event">
        {/* <button onClick={() => this.setState({ view: "week" })}>week</button>
        <button onClick={() => this.setState({ view: "month" })}>Month</button> */}
        <BigCalendar
          selectable={true}
          localizer={localizer}
          style={{ height: this.state.height, width: this.state.width }}
          // toolbar={true}
          events={this.state.events}
          step={60}
          // views={allViews}
          // view={this.state.view}
          // onView={() => {}}
          // date={this.state.date}
          // onNavigate={date => this.setState({ date })}
          onSelectEvent={(event) => this.handleSelectEvent(event)}
          onSelectSlot={() =>this.handleSelect()}
          startAccessor="start"
          endAccessor="end"
        />

        {/* <PersonalEventDetail toggle={this.toggle} modal={this.state.modal} event={this.state.curevent} tag={this.state.curevent.tag}/> */}
      </div>

    );
  }
}

export default withRouter(PersonEvents);