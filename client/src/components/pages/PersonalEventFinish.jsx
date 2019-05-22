import React, { Component } from 'react';
import api from "./../../api";


export default class PersonalEventFinish extends Component {
  constructor(props){
    super(props)
    this.state = {
      isShow:true,
      event:this.props.event,
      attendants:"",
      isOrg:"",
      update:[],
      isUpdate:false,
    }
  }

  

  loadAttendants(){
    let eventId = this.state.event._event._id;
    let role = this.state.event.tag;
    let isOrg;
    if (role === "organize" || role === "assigned Org"){
      isOrg = true

      api.getFinalAttendants(eventId)
        .then(res => {
          // console.log(res)
          let attendants = []; 
          res.map((cur,i) => {
            let curAttendant = {
              userId:cur._user._id,
              firstname:cur._user.firstname,
              childname:cur._user._child[0].firstname,
              serviceHours:cur.serviceHours,
            }

            attendants.push(curAttendant)
          })
          return attendants
        })
        .then(res => {
          this.setState({
            isOrg:isOrg,
            attendants:res,
          })
        })
    } else {
      isOrg = false
      this.setState({
        isOrg:isOrg,
      })
    }
  }

  

  handleInputChange(event) {
    let index = parseInt(event.target.id);
    let curAttendants = this.state.attendants.slice();
    curAttendants[index].serviceHours = event.target.value
    console.log(curAttendants)
    
    this.setState({
      attendants: curAttendants
    })
  }


  handleSubmit(){
    let attendants = this.state.attendants;
    let eventId = this.state.event._event._id;
    let updateInfo = []
    attendants.map(cur => {
      let curAtt = {
        _user:cur.userId,
        serviceHours:cur.serviceHours
      }
      updateInfo.push(curAtt)
    })

    let updateDate = {
      updateInfo:updateInfo,
    }

    api.postFinalsWorkHours(eventId, updateDate)
        .then(res => {
          console.log("-------update work hours----")
          console.log(res)
          api.updateTotalCurServiceHours(eventId)
          .then(res => {
            console.log("-------update personal work-------")
            api.updatePersonCurServiceHours(eventId)
               .then(res => {
                 console.log("--------update email infor------")
                api.createEventFinshInfoMail(eventId)
                .then(res => {
                  console.log("----send email to participant-----")
                })
               })
          })
        })

    this.setState({
      isUpdate:true
    })
  }

  componentDidMount(){
    this.loadAttendants()
    console.log(this.props.event)
   

  }

  render() {
    return (
      <div>
       <div className="event-org-finish">
          <header>Check Work Hours: {this.state.event._event.title}</header>
          <h5>Description:</h5>
          <p>{this.state.event._event.description}</p>
          <h5>Started:</h5>
          <p>{this.state.event._event.started}</p>
          <h5>Ended:</h5>
          <p>{this.state.event._event.ended}</p>
          {this.state.isOrg && (
            <div className="attendants">
              <h5>Attendants:</h5>
              {this.state.attendants && (
                  <table >
                  <tr>
                    <th>#</th>
                    <th>FirstName</th> 
                    <th>ChildName</th>
                    <th>Work Hours</th>
                  </tr>
                  {this.state.attendants.map((cur,i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{cur.firstname}</td>
                      <td>{cur.childname}</td> 
                      
                      {this.state.isUpdate && (
                        <td>{cur.serviceHours}</td>
                      )}

                      {!this.state.isUpdate && (
                        <td>
                          <input
                            type="text"
                            id={i}
                            name={cur.userId}
                            value = {cur.serviceHours}
                            onChange={(e) => this.handleInputChange(e)}
                          />
                        </td>
                      )}
                        
                    </tr>
                  ))}
                  </table>
                  
              )}
              {!this.state.isUpdate && (<button onClick={()=>this.handleSubmit()}>Submit</button>)}
              {this.state.isUpdate && (<div>The task is finished</div>)}
            </div>
          )}

          {!this.state.isOrg && (
            <div>
              Please wait for organizer to update workhours
            </div>
          )}

       </div>
      </div>
    )
  }
}
