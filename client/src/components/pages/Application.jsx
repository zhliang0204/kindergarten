import React, { Component } from 'react';
import { 
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} 
from 'reactstrap';
import api from "./../../api";

export default class Application extends Component {
  constructor(props){
    super(props)
    this.state={
      event:this.props.event,
      expectDate:"",
      applicants:"",
      isApply:null,
    }
  }

  handleInputChange(e){
    this.setState({
      [e.target.name] : e.target.value,
    })
  }

  loadApplicants(id){
    api.getApplication(id)
       .then(applicants => {
        //  console.log(applicants)
         this.setState({
          applicants:applicants,
         })
       })
  }

  loadUserApplyInfo(id){
    api.getPersonApplication(id)
        .then(res => {
          if(res.length > 0){
            this.setState({
              isApply:true
            })
          } else {
            this.setState({
              isApply:false
            })
          }
        })
  }

  handleServiceApply(){
    let applyInfor = {
      expectDate:this.state.expectDate,
      serviceHours:this.state.event.reqhours
    }
    this.setState({
      isApply:true
    })
    api.postPersonApplication(this.state.event._id, applyInfor)
       .then(res => {
         this.loadApplicants(this.state.event._id)
       })
  }

  

  componentDidMount(){
    let eventId = this.state.event._id;
    this.loadApplicants(eventId)
    this.loadUserApplyInfo(eventId)
    console.log("------vote----component-------")
    console.log(this.state.event)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.event !== prevProps.event) {
      this.loadVote(this.props.event._id)
      this.loadUserApplyInfo(this.props.event._id)
    }
    console.log("-----vote ----- match------")
    console.log(this.props.event._id)
  }

  render() {
    return (
      <div className="application">
        <div>
          <h3>Application List</h3>
          {this.state.applicants.length > 0 && (
            this.state.applicants.map((curApl, i) => (
              <div key={i}>{curApl._user.firstname + `(`+ curApl._user._child[0].firstname + `)`}</div>
            ))
          )}
        </div>
        {this.props.tag === 3 && !this.state.isApply && (
          <Form>
          <FormGroup>
            <Label for="expectDate">Expect Date:</Label>
            <Input type="datetime-local" name="expectDate" value={this.state.expectDate} onChange={(e)=>this.handleInputChange(e)}/>
          </FormGroup>
            <Button onClick={()=>this.handleServiceApply()}>Apply</Button>
        </Form> 
        )}
        
      </div>
    )
  }
}
