import React, { Component } from 'react'
import api from "./../../api";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class EditProcess extends Component {
  constructor(props){
    super(props)
    this.state = {
      attandants:""
    }
  }

  loadAttendants(eventId){
    api.checkAttandants(eventId)
        .then(attendants => {
          let atts = [];
          attendants.map((cur, i) => {
            let curAtt = {
              _id:cur._id,
              serviceHours:cur.serviceHours,
              _user:cur._user._id,
              firstname:cur._user.firstname,
              expectDate:cur.expectDate,
              tag:cur.tag,
            }
            atts.push(curAtt)
          })
          return atts
        })
        .then(atts => {
          this.setState({
            attandants:atts
          })
        });
  }

  loadServiceHours(eventId){
    api.getSelectedEvent(eventId)
        .then(res => {
          console.log(res)
        })
  }

  componentDidMount(){
   let eventId = "5cdc616a7af98f29e47d9d74" ;
   this.loadAttendants(eventId)
  }

  handleSubmit(){
   
  }

  render() {
    return (
      <div className="process-event">
        <h3>Make sure participants and serviceHours</h3>
        {this.state.attandants && (
          this.state.attandants.map((attandant,i) => (
            <div key={i}>
              <div>{attandant.firstname}</div>
              <div>{attandant.serviceHours}</div>
            </div>
          ))
          
        )}
        <Button onClick={()=>this.handleSubmit()}>Submit</Button>
      </div>
    )
  }
}
