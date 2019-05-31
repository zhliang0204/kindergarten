import React, { Component } from 'react'
import { 
  Form,
  FormGroup,
  Input,
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
          // console.log("------load Discussions ------")
          // console.log(discussions)
          let discussionsShow = [];
          discussions.map((cur) => {
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

              let curdiss = {
                              firstname: cur._user.firstname,
                              childname: childname,
                              content: cur.content,
                          }
              discussionsShow.push(curdiss)
              
              
              })
              this.setState({
                discussions: discussionsShow,
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
    // console.log("------Load Discussion-------")
    // console.log(this.state.event)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.event !== prevProps.event) {
      this.loadDiscussions(this.props.event._id)
      // this.loadUserApplyInfo(this.props.event._id)
    }
    // console.log("-----Discussion ----- match------")
    // console.log(this.props.event._id)
  }

  render() {
    return (
      <div className="discussion">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
        {this.state.discussions && (<div>
          {this.state.discussions.map((cur, i) => (
            <div className="discussion-detail" key={i}>
              <span style={{color:"#00334e"}}><b>{cur.firstname + "(" + cur.childname + ")"}:</b></span>
              <span>{cur.content}</span>
            </div>
          ))}
          </div>)}

          <Form>
            <FormGroup>
              <Input type="textarea" name="content" placeholder="left your message here :)" value={this.state.content} onChange={(e)=>this.handleInputChange(e)} />
            </FormGroup>
              <Button onClick={()=>this.handleDisApply()}>Submit</Button>
          </Form>
        </div>)}
      </div>
    )
  }
}
