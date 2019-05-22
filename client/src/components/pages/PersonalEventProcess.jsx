import React, { Component } from 'react';
import api from "./../../api";

export default class PersonalEventProcess extends Component {
  constructor(props){
    super(props)
    this.state = {
      isShow:true,
      event:this.props.event,
      attendants:""
    }
  }

  loadAttendants(){
    let eventId = this.state.event._event._id;
    
    api.getAttendence(eventId)
        .then(res => {
          this.setState({
            attendants:res
          })
        })
  }

  componentDidMount(){
    this.loadAttendants()
    console.log(this.props.event)
   

  }
  render() {
    return (
      <div>
        <div>
          <div className="event-process">
            <header>{this.state.event._event.title}</header>

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
          </div>
        </div>
      </div>
    )
  }
}
