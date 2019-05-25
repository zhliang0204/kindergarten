import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from "./../../api";

export default class UserActive extends Component {
  constructor(props){
    super(props)
    this.state = {
      useremail: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    let userId = this.props.info.match.params.id
    let acitiveEmail = {
      email: this.state.useremail
    }

    api.activeAccount(userId,acitiveEmail)
       .then(activeUser => {
         console.log(activeUser)
         console.log('/setpassword/'+activeUser._id)
         this.props.info.history.push('/setpassword/'+activeUser._id)
       })
    console.log("mount")
  }

  componentDidMount() {
    console.log(this.props.info.match.params.id)
  }
  
  render() {
    return (
      <div className="user-active outer-div">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}
       
        {this.props.langTab ==="lang4" && (<div className="english">
          <div>Please input your email to active the account</div>
          <Form>
            <FormGroup>
              <Label for="useremail">Email:</Label>
              <Input type="email" name="useremail" id="useremail" value={this.state.useremail} onChange={this.handleInputChange}/>
            </FormGroup>
          </Form>
          <Button onClick={(e)=>this.handleSubmit(e)}>Active</Button>
        </div>
        )}
      </div>
    )
  }
}
