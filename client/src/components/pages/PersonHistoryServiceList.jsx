import React, { Component } from 'react';
import api from "./../../api";

export default class PersonHistoryServiceList extends Component {
  constructor(props){
    super(props)
    this.state = {
      processTask:[],
      finishTask:[],
    }
  }
  
  loadDoingTask(){
    api.personalDoingTask()
       .then(tasks => {
         let processTask = [];
         tasks.map((cur, i) => {
           let newDoing = {
             title:cur._event.title,
             role:cur.tag,
             serviceHours:cur.serviceHours
           }

           processTask.push(newDoing)
         })
         this.setState({
           processTask:processTask
         })
       })
  }

  loadFinshTask(){
    api.personalFinshTask()
    .then(tasks => {
      let finishTask = [];
      tasks.map((cur, i) => {
        let newDoing = {
          title:cur._event.title,
          role:cur.tag,
          serviceHours:cur.serviceHours
        }

        finishTask.push(newDoing)
      })
      this.setState({
        finishTask:finishTask
      })
    })
  }

  componentDidMount(){
    this.loadDoingTask();
    this.loadFinshTask();
  }
  
  render() {
    return (
      <div>
        <div className="person-process-task-list">
          <div>doing</div>
          {this.state.processTask && this.state.processTask.map((cur, i) => (
            <div key={i}>
              <p>{cur.title}</p>
              <p>{cur.role}</p>
              <p>{cur.serviceHours}</p>
            </div>
          ))}
        </div>
        <div className="person-finish-task-list">
          <div>finish</div>
        {this.state.finishTask && this.state.finishTask.map((cur, i) => (
            <div key={i}>
              <p>{cur.title}</p>
              <p>{cur.role}</p>
              <p>{cur.serviceHours}</p>
            </div>
          ))}
       
        </div>

      </div>
    )
  }
}
