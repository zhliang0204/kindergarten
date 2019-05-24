import React, { Component } from 'react';
import api from "./../../api";
import Application from "./Application";
import Attendence from "./Attendence";
import Vote from "./Vote";
import Discussion from "./Discussion"


export default class EventDetail extends Component {
  constructor(props){
    super(props)
    this.state={
      event:"",
      tag:0,
      isVoteShow:false,
      isStopShow:false,
      isApplyShow:false,
      isProcessShow:false,
      isFinishShow:false,
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

  loadEvent(id){
    api.getSelectedEvent(id)
        .then(selectedEvent => {
          let curtag = 0;
          if(selectedEvent.eventState === "vote"){curtag = 1}
          if(selectedEvent.eventState === "stop"){curtag = 2}
          if(selectedEvent.eventState === "apply"){curtag = 3}
          if(selectedEvent.eventState === "process" || selectedEvent.eventState === "pre-process"){curtag = 4}
          if(selectedEvent.eventState === "finish"){curtag = 5}
         
          selectedEvent.started = this.convertUTCDateToLocalDate(selectedEvent.started)
          selectedEvent.ended = this.convertUTCDateToLocalDate(selectedEvent.ended)
          console.log(selectedEvent.started)
          this.setState({
            event:selectedEvent,
            tag:curtag
          })
        })
        .then(savedEvent => console.log("event loaded"))
  }

  voteToggle(e){
    this.setState(prevState => ({
      isVoteShow: !prevState.isVoteShow
    }));
  }

  stopToggle(e){
    this.setState(prevState => ({
      isStopShow: !prevState.isStopShow
    }));
  }

  applyToggle(e){
    this.setState(prevState => ({
      isApplyShow: !prevState.isApplyShow
    }));
  }

  processToggle(e){
    this.setState(prevState => ({
      isProcessShow: !prevState.isProcessShow
    }));
  }

  finishToggle(e){
    this.setState(prevState => ({
      isFinishShow: !prevState.isFinishShow
    }));
  }

  componentDidMount(){
    let eventId = this.props.info.match.params.id
    this.loadEvent(eventId)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.info.match.params.id !== prevProps.info.match.params.id) {
      this.loadEvent(this.props.info.match.params.id)
      
    }
    console.log("-----match------")
    console.log(this.props.info.match.params.id)
  }

  render() {
    return (
      <div className="event-detail outer-div">
        {this.props.isGerman && (<div className="german">building......</div>)}
        {!this.props.isGerman && (<div className="chinese">
          {this.state.event && (<div>
            <div className="event-detail-title">{this.state.event.title}</div>
            <div className="event-detail-state">status: {this.state.event.eventState}</div>
            <div className="event-detail-exec-period">
              <i className="far fa-calendar-alt"></i>&nbsp;<span>{this.state.event.started} - {this.state.event.ended}</span>
            </div>
            <div className="event-detail-description">description: <div>{this.state.event.description}</div></div>
            

           

            <div className="event-detail">

            {this.state.tag === 2 && (
                <div className="event-status-summary">
                  <div className={this.state.tag > 0 ? "event-status-tag":"event-status-tag2"}><i className="fas fa-poll"></i>Vote<i className="fas fa-arrow-right"></i></div>
                  <div className={this.state.tag > 0 ? "event-status-tag" : "event-status-tag2"}><i className="fas fa-hand-paper"></i>Stop</div>
              </div>
            )}

            {this.state.tag !== 2 && (
              <div className="event-status-summary">
                <div className={this.state.tag > 0 ? "event-status-tag":"event-status-tag2"}><i className="fas fa-poll"></i>Vote<i className="fas fa-arrow-right"></i></div>
                <div className={this.state.tag > 2 ? "event-status-tag":"event-status-tag2"}><i className="fas fa-hand-paper"></i>Apply<i className="fas fa-arrow-right"></i></div>
                <div className={this.state.tag > 3 ? "event-status-tag":"event-status-tag2"}><i className="fas fa-toolbox"></i>Execute<i className="fas fa-arrow-right"></i></div>
                <div className={this.state.tag > 4 ? "event-status-tag":"event-status-tag2"}> <i className="fas fa-circle-notch"></i>Finish</div>

               
              </div>
            )}

              
              {this.state.tag > 0 && (<div className="vote">
                <div className="event-status-detail-title" onClick={() => this.voteToggle()}>
                  <div >Vote</div>
                  {!this.state.isVoteShow && (<div><i className="fas fa-plus"></i></div>)}
                  {this.state.isVoteShow && (<div><i className="fas fa-minus"></i></div>)}
                </div>
                {this.state.isVoteShow && (<Vote event={this.state.event} tag={this.state.tag}/>)}
              </div>)}


              {this.state.tag === 2 && (<div className="stop">
                <div className="event-status-detail-title" onClick={() => this.stopToggle()}>
                  <div >Stop</div>
                  {!this.state.isStopShow && (<div><i className="fas fa-plus"></i></div>)}
                  {this.state.isStopShow && (<div><i className="fas fa-minus"></i></div>)}
                </div>
                {this.state.isStopShow && (<div>According to vote result, the event was stop</div>)}
              </div>) }


              {this.state.tag > 2 && (<div className="apply">

              <div className="event-status-detail-title" onClick={() => this.applyToggle()}>
                  <div >Apply</div>
                  {!this.state.isApplyShow && (<div><i className="fas fa-plus"></i></div>)}
                  {this.state.isApplyShow && (<div><i className="fas fa-minus"></i></div>)}
                </div>
                {this.state.isApplyShow && (<Application event={this.state.event} tag = {this.state.tag}/>)}
              </div>) }


              {this.state.tag > 3  && (<div className="process">
              <div className="event-status-detail-title" onClick={() => this.processToggle()}>
                  <div >Process</div>
                  {!this.state.isProcessShow && (<div><i className="fas fa-plus"></i></div>)}
                  {this.state.isProcessShow && (<div><i className="fas fa-minus"></i></div>)}
                </div>
                {this.state.isProcessShow && (<Attendence event={this.state.event} tag = {this.state.tag}/>)}
              </div>) }
          
              {this.state.tag > 4 && (
                <div>
                  <div className="event-status-detail-title" onClick={() => this.finishToggle()}>
                    <div >Finish</div>
                    {!this.state.isFinishShow && (<div><i className="fas fa-plus"></i></div>)}
                    {this.state.isFinishShow && (<div><i className="fas fa-minus"></i></div>)}
                  </div>
                  {this.state.isFinishShow && (<div className="finish">The task is finished, the service hours are added to pariticipants</div>)}
              </div>)}
            </div>

            <div className="event-discussion">
              <Discussion event={this.state.event} />
            </div>

          </div>)}
        </div>)}
      </div>
    )
  }
}
