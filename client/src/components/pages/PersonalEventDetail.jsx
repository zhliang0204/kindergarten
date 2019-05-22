import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Input} from 'reactstrap';
import PersonalEventDetailOrg from "./PersonalEventDetailOrg";
import PersonalEventDetailPart from "./PersonalEventDetailPart";
import PersonalEventProcess from "./PersonalEventProcess";
import PersonalEventFinish from "./PersonalEventFinish"
import api from "./../../api";

export default class PersonalEventDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      eventInfo:"",
      modal:true,
      attendants:"",
      possibleDate:"",
      started1:"",
      ended1:"",
      started2:"",
      ended2:"",
      started3:"",
      ended3:"",
      dateUpdate:false,
      dateList:[],
      datePicker:"",
      isPickDate:false,
      status:""
    }
  }

  loadEvent(eventId){
    api.getPersonalSelectedEvent(eventId)
      .then(res => {
        let tag = res[0].tag;
        let eventState = res[0]._event.eventState;
        if(eventState === "finish"){
          this.setState({
            event:res[0],
            status:4
          })
        }

        if(eventState === "process"){
          this.setState({
            event:res[0],
            status:3
          })
        }
        if((tag === "participate" || tag === "assigned") && eventState === "pre-process"){
          this.setState({
            event:res[0],
            status:2
          })
        }
        if((tag ===  "organize" || tag === "assigned Org") && eventState === "pre-process"){
          this.setState({
            event:res[0],
            status:1
          })
        }
      })
  }

  toggle(){
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount(){
    console.log("------component did mount--------")
    let eventId = this.props.info.match.params.id
    this.loadEvent(eventId)
    console.log(this.props.info.match.params.id )
  }


  render() {
    return (
      <div className="my-modal outer-div">
        <div toggle={() => this.toggle()}>

          {this.state.status === 1 && (
            <PersonalEventDetailOrg event={this.state.event}/>
          )}

          {this.state.status === 2 && (
            <PersonalEventDetailPart event={this.state.event}/>
          )}

          {this.state.status === 3 && (
            <PersonalEventProcess event={this.state.event}/>
          )}

          {this.state.status === 4 && (
            <PersonalEventFinish event={this.state.event}/>
          )}
        </div>  
      </div>
    )
  }
}
