import React, { Component } from 'react';
import api from "./../../api";
import { Table, Button } from 'reactstrap';
import {withRouter, Route } from 'react-router-dom';

class Home extends Component {
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
    if(api.isLoggedIn()){
      this.props.info.history.push("/events/detail/"+id)
    } else {
      this.props.info.history.push("/login")
    }
    
  }

  componentDidMount(){
    this.loadEvent()
    console.log(this.props)
  }

  createEvent(){
    // this.props.history.push("/createEvent")
    if(api.isLoggedIn()){
      this.props.info.history.push("/createEvent")
    } else {
      this.props.info.history.push("/login")
    }
  }

  render() {
    return (
      <div className="events-list outer-div">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
        <div className="btn-click" onClick={()=>this.createEvent()}><i className="fas fa-plus-circle"></i>Add Task</div>
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

export default withRouter(Home);
