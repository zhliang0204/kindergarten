import React, { Component } from 'react';
import api from "./../../api";
import { Button, Table, Input} from 'reactstrap';

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
    }
  }

  

  loadAttendants(){
    let eventId = this.state.event._event._id;
    api.getAttendence(eventId)
        .then(res => {
          let dateUpdate = this.state.event.isChecked
          let attendants = res;
          if(dateUpdate){
            api.getPossibleDateForParticipant(eventId)
               .then(res => {
                 console.log(res)
                 this.setState({
                  started1:res[0].expectedDates[0].started,
                  ended1:res[0].expectedDates[0].ended,

                  started2:res[0].expectedDates[1].started,
                  ended2:res[0].expectedDates[1].ended,

                  started3:res[0].expectedDates[2].started,
                  ended3:res[0].expectedDates[2].ended,

                  attendants:attendants,
                  dateUpdate:dateUpdate,
                 })
                
               })
          } else {
            this.setState({
              attendants:attendants,
              dateUpdate:dateUpdate,
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
      <div>
        <div className="event-org-preprocess">
          <header>Choose possible dates: {this.state.event._event.title}</header>
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

          <div className="org-date-picker">
                <h5>Selected 3 possible time slot to do task</h5>
                <h5>Date List:</h5>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Started</th>
                      <th>to</th>
                      <th>Ended</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>
                        {!this.state.dateUpdate && (<Input
                            type="datetime-local"
                            name="started1"
                            value={this.state.started1}
                            onChange={(e) => this.handleInputChange(e)}
                          />)
                        }
                        {this.state.dateUpdate && (this.state.started1)}
                        
                      </td>
                      <td>-</td>
                      <td>
                      {!this.state.dateUpdate && (<Input
                          type="datetime-local"
                          name="ended1"
                          value={this.state.ended1}
                          onChange={(e) => this.handleInputChange(e)}
                        />)}

                        {this.state.dateUpdate && (this.state.ended1)}

                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>
                      {!this.state.dateUpdate && (<Input
                          type="datetime-local"
                          name="started2"
                          value={this.state.started2}
                          onChange={(e) => this.handleInputChange(e)}
                        />)}

                          {this.state.dateUpdate && (this.state.started2)}

                      </td>
                      <td>-</td>
                      <td>
                      {!this.state.dateUpdate && (<Input
                          type="datetime-local"
                          name="ended2"
                          value={this.state.ended2}
                          onChange={(e) => this.handleInputChange(e)}
                        />)}

                      {this.state.dateUpdate && (this.state.ended2)}

                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>
                      {!this.state.dateUpdate && (<Input
                          type="datetime-local"
                          name="started3"
                          value={this.state.started3}
                          onChange={(e) => this.handleInputChange(e)}
                        />)}

                        {this.state.dateUpdate && (this.state.started3)}

                      </td>
                      <td>-</td>
                      <td>
                      {!this.state.dateUpdate && (<Input
                          type="datetime-local"
                          name="ended3"
                          value={this.state.ended3}
                          onChange={(e) => this.handleInputChange(e)}
                        />)}

                        {this.state.dateUpdate && (this.state.ended3)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                
                {!this.state.dateUpdate && (<Button onClick={()=>this.orgDatePick()}>Submit</Button>)}

              </div>

        </div>
      </div>
    )
  }
}
