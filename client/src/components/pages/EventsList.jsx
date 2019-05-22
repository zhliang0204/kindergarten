import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import api from '../../api';
import {withRouter, Route } from 'react-router-dom';
import EventDetail from './EventDetail'

class EventsList extends Component {
  constructor(props){
    super(props)
    this.state = {
      events:[],
    }
  }

  loadEvent(){
    api.getEvents()
       .then(events => {
         this.setState({
           events:events
         })
       })
  }

  showEventDetail(id){
    this.props.history.push("/events/detail/"+id)
  }

  componentDidMount(){
    this.loadEvent()
  }

  createEvent(){
    this.props.history.push("/createEvent")
  }

  render() {
    return (
      <div className="events-list outer-div">
        {this.props.isGerman && (<div className="german">building......</div>)}
        {!this.props.isGerman && (<div className="Chinese">
        <div className="btn-click" onClick={()=>this.createEvent()}><i class="fas fa-plus-circle"></i>Add Task</div>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.events && (
              this.state.events.map((cur, i) =>(
                <tr key={i} onClick={(cur_id)=>this.showEventDetail(cur._id)}>
                  <th scope="row">{i+1}</th>
                  <td>{cur.title}</td>
                  <td>{cur.eventState}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        </div>)}
       
      </div>
    )
  }
}

export default withRouter(EventsList);