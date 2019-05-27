import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from "./../../api";

export default class CreateChild extends Component {
  constructor(props){
    super(props)
    this.state = {
      userTab:this.props.userTab,
      firstname:"",
      lastname:"",
      sex:"F",
      age:"",
      childId:"",
      birthday:"",
      errorList:[],
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  checkInfo(){
    let errorList = []
    if(this.state.firstname === ""){
      errorList.push(1)
    }
    if(this.state.lastname === ""){
      errorList.push(2)
    }
    if(this.state.birthday === "" ){
      errorList.push(3)
    }
    if(this.state.age === ""){
      errorList.push(5)
    }

    return errorList
  }

  handleClidSubmit(e){
    e.preventDefault();
    e.stopPropagation();

    
    let errorList = this.checkInfo()

    if(errorList.length > 0){
      this.setState({
        errorList:errorList
      })
    } else {
      let childInfos = {
        firstname: this.state.firstname, 
        lastname: this.state.lastname, 
        sex: this.state.sex, 
        age: this.state.age,
        birthday:this.state.birthday
      }
      console.log(childInfos)
      this.props.setChildInfo(childInfos)
      // api.createChild(childInfo)
      //    .then(savedChild => {
      //      this.setState({
      //       firstname:"",
      //       lastname:"",
      //       sex:"",
      //       age:"",
      //       childId:savedChild._id,
      //       tab:2,
      //      })
      //    })
    }
  }

  

  render() {
    return (
      <div className="create-child">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
          <div className="child">
          <div className="newuser-type">Child Information</div>
            <Form>
              <FormGroup>
                <Label for="firstname">FisrtName:</Label>
                {this.state.errorList.indexOf(1) !== -1 && (<div className="hint">Please input child first name.</div>)}
                <Input type="text" name="firstname" id="firstname" value={this.state.firstname} onChange={this.handleInputChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="lastname">LastName:</Label>
                {this.state.errorList.indexOf(2) !== -1 && (<div className="hint">Please input child last name.</div>)}
                <Input type="text" name="lastname" id="lastname" value={this.state.lastname} onChange={this.handleInputChange}/>
              </FormGroup>

              <FormGroup>
                <Label for="birthday">Birthday:</Label>
                {this.state.errorList.indexOf(3) !== -1 && (<div className="hint">Please pick birthday of child.</div>)}
                <Input type="date" name="birthday" id="birthday" value={this.state.birthday} onChange={this.handleInputChange}/>
              </FormGroup>

              <FormGroup>
                <Label for="sex">Sex:</Label>
                  <Input type="select" name="sex" id="sex" onClick={this.handleInputChange}>
                    <option value="F">F</option>
                    <option value="M">M</option>
                  </Input>
              </FormGroup>
              <FormGroup>
                <Label for="age">Age:</Label>
                {this.state.errorList.indexOf(5) !== -1 && (<div className="hint">Please input age of child.</div>)}
                <Input type="text" name="age" id="age" value={this.state.age} onChange={this.handleInputChange}/>
              </FormGroup>
              <div className="btn-click" onClick={(e)=>this.handleClidSubmit(e)}><i className="fas fa-arrow-right"></i>Next Step</div>
            </Form>
          
          </div>
        </div>)}
      </div>
    )
  }
}
