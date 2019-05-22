import React, { Component } from 'react'
import { 
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} 
from 'reactstrap';
import api from "./../../api";


export default class Discussion extends Component {
  constructor(props){
    super(props)
    this.state ={
      event: this.props.event,
      discussions:"",
      content:"",
    }
  }

  loadDiscussions(id){
    api.getDisscussion(id)
        .then(discussions => {
          console.log("------load Discussions ------")
          console.log(discussions)
          this.setState({
            discussions:discussions
          })
        })
  }

  handleInputChange(e){
    this.setState({
      [e.target.name] : e.target.value,
    })
  }

  handleDisApply(){
    let eventId = this.state.event._id;
    let disInfo = {
      content:this.state.content
    }
    api.postDiscussion(eventId, disInfo)
        .then(res => {
          this.loadDiscussions(eventId);
          this.setState({content: ""})
        })
  }

  componentDidMount(){
    let eventId = this.state.event._id;
    this.loadDiscussions(eventId)
        
    // this.loadUserApplyInfo(eventId)
    console.log("------Load Discussion-------")
    console.log(this.state.event)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.event !== prevProps.event) {
      this.loadDiscussions(this.props.event._id)
      // this.loadUserApplyInfo(this.props.event._id)
    }
    console.log("-----Discussion ----- match------")
    console.log(this.props.event._id)
  }

  render() {
    return (
      <div className="discussion">
        {this.state.discussions && (<div>
          {this.state.discussions.map((cur, i) => (
            <div key={i}>
              <span>{cur._user.firstname + "(" + cur._user._child[0]._firstname + ")"}</span>
              <span>{cur.content}</span>
            </div>
          ))}
        </div>)}

        <Form>
          <FormGroup>
            <Input type="textarea" name="content" value={this.state.content} onChange={(e)=>this.handleInputChange(e)} />
          </FormGroup>
            <Button onClick={()=>this.handleDisApply()}>Submit</Button>
        </Form>
      </div>
    )
  }
}
