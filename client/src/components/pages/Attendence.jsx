import React, { Component } from 'react'
import { 
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Table,
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

  loadAttendants(id){
      api.getAttendence(id)
        .then(attendants => {
          console.log("------load Discussions ------")
          console.log(attendants)
          let attendantsShow = [];
          let expectDate = this.convertUTCDateToLocalDate(this.state.event.started)
          attendants.map((cur) => {
            console.log(cur)         
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
              // let expectDate = this.convertUTCDateToLocalDate(cur.expectDate)
              let curAttendants = {
                              firstname: cur._user.firstname,
                              childname: childname,
                              expectDate: expectDate,
                              tag:cur.tag
                          }
              attendantsShow.push(curAttendants)
              })
              this.setState({
                attendants: attendantsShow,
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
        {/* <h3>Attandence</h3>
        {this.state.attendants.length > 0 &&(
          this.state.attendants.map((att, i) => (
            <div key={i}>
              <span>{att.tag}</span>
              <span>{att._user.firstname + "(" + att._user._child[0].firstname + ")"}</span>
            </div>
          ))
        )} */}

        <div>
          <div className="attendants-detail-title">Attendants List</div>
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

      </div>
    )
  }
}
