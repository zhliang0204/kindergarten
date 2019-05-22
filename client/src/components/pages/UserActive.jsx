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
    // console.log(userId)
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
    // let someVar = this.props.location.pathname.split('/').pop()
    // console.log("mount")
    console.log(this.props.info.match.params.id)
  }
  
  render() {
    return (
      <div className="user-active outer-div">
        {this.props.isGerman && <div className="german">german language</div>}
        {!this.props.isGerman && (<div>
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
