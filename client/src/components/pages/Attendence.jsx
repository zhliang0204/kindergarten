import React, { Component } from 'react'
import { 
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} 
from 'reactstrap';
import api from "./../../api";

export default class Attandence extends Component {
  constructor(props){
    super(props)
    this.state = {
      event:this.props.event,
      attendants:"",
    }
  }

  loadAttendants(id){
    api.getAttendence(id)
        .then(attendants => {
          console.log("------load attendants ------")
          console.log(attendants)
          this.setState({
            attendants:attendants
          })
        })
  }

  componentDidMount(){
    let eventId = this.state.event._id;
    this.loadAttendants(eventId)
        
    // this.loadUserApplyInfo(eventId)
    console.log("------vote----component-------")
    console.log(this.state.event)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.event !== prevProps.event) {
      this.loadAttendants(this.props.event._id)
      // this.loadUserApplyInfo(this.props.event._id)
    }
    console.log("-----vote ----- match------")
    console.log(this.props.event._id)
  }

  render() {
    return (
      <div className="attendence">
        <h3>Attandence</h3>
        {this.state.attendants.length > 0 &&(
          this.state.attendants.map((att, i) => (
            <div key={i}>
              <span>{att.tag}</span>
              <span>{att._user.firstname + "(" + att._user._child[0].firstname + ")"}</span>
            </div>
          ))
        )}
      </div>
    )
  }
}
