import React, { Component } from 'react';
import api from '../../api';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      // password:"",
      // firstname: "",
      // lastname:"",
      // childname:"",
      email:"",
      phone:"",
      // address1:"",
      // address2:"",
      // city:"",
      // postal:"",
      // state:"",
      // country:"",
      role:"teacher",
      message: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // handleSelect(e){
  //   console.log(e.target.value)
  // }

  handleClick(e) {
    e.preventDefault()
    let data = {
      username: this.state.username,
      // password: this.state.password,
      email:this.state.email,
      phone:this.state.phone,
      role:this.state.role,
    }

    let email = {
      username:this.state.username,
      email: this.state.email,
    }
    // console.log(data);

    // test 
    api.createUser(data)
      .then(result => {
        api.createUserMail(email)
        .then(emailres => {
          console.log('SUCCESS!')
          this.setState({
            username: "",
            password: "",
            email:"",
            phone:"",
            role:"teacher"
          })
        })
        
        // this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup outer-div">
        {this.props.isGerman && <div className="german">german language</div>}
        {!this.props.isGerman && (<div className="chinese">
          <Form>
            <FormGroup>
              <Label for="username">用户名：</Label>
              <Input type="username" name="username" id="username" value={this.state.username} onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              {/* how to handle change? */}
              <Label for="role">角色：</Label>
                <Input type="select" name="role" id="role" onClick={this.handleInputChange}>
                  <option value="teacher">teacher</option>
                  <option value="parent">parent</option>
                </Input>
            </FormGroup>
            {/* <FormGroup>
              <Label for="password">密码：</Label>
              <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleInputChange}/>
            </FormGroup> */}
            {/* <FormGroup>
              <Label for="firstname">名字：</Label>
              <Input type="text" name="firstname" id="firstname" value={this.state.firstname} onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="lastname">姓氏：</Label>
              <Input type="text" name="lastname" id="lastname" value={this.state.lastname} onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="childname">孩子姓名：</Label>
              <Input type="text" name="childname" id="childname" value={this.state.childname} onChange={this.handleInputChange}/>
            </FormGroup> */}
            <FormGroup>
              <Label for="email">邮件：</Label>
              <Input type="text" name="email" id="email" value={this.state.email} onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="phone">移动电话：</Label>
              <Input type="text" name="phone" id="phone" value={this.state.phone} onChange={this.handleInputChange}/>
            </FormGroup>
            {/* <FormGroup>
              <Label for="address1">地址行1：</Label>
              <Input type="text" name="address1" id="address1" value={this.state.address1} onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="address2">地址行2：</Label>
              <Input type="text" name="address2" id="address2" value={this.state.address2} onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="postal">邮编：</Label>
              <Input type="text" name="postal" id="postal" value={this.state.postal} onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="city">城市：</Label>
              <Input type="text" name="city" id="city" value={this.state.city} onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="state">州：</Label>
              <Input type="text" name="state" id="state" value={this.state.state} onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="country">国家：</Label>
              <Input type="text" name="country" id="country" value={this.state.country} onChange={this.handleInputChange}/>
            </FormGroup> */}
            <Button onClick={(e)=>this.handleClick(e)}>创建</Button>
        </Form>
          {this.state.message && <div className="info info-danger">
            {this.state.message}
          </div>}        
        </div>)}

      </div>
    );
  }
}