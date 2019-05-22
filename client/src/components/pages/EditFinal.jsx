import React, { Component } from 'react'
import api from "./../../api"

export default class EditFinal extends Component {
  constructor(props){
    super(props);
    this.state = {
      attendants:""
    }
  }

  componentDidMount(){
    
  }
  render() {
    return (
      <div className="check-final">
        Edit Mission
      </div>
    )
  }
}
