import React, { Component } from 'react'
import api from "./../../api";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default class CheckNewFamily extends Component {
  constructor(props){
    super(props)
    this.state = {
      childInfo:this.props.childInfo,
      fatherInfo: this.props.fatherInfo,
      motherInfo: this.props.motherInfo,
    }

    this.handleInputChange = this.handleInputChange.bind(this)

  }

  handleInputChange(event) {
    event.preventDefault();
    event.stopPropagation();
    let userProperty = event.target.name.split("-")
    let childInfo = this.state.childInfo;
    let fatherInfo = this.state.fatherInfo;
    let motherInfo = this.state.motherInfo;
    if(userProperty[0] === "child"){
      childInfo[userProperty[1]] = event.target.value
    }
    if(userProperty[0] === "father"){
      fatherInfo[userProperty[1]] = event.target.value
    }
    if(userProperty[0] === "mother"){
      motherInfo[userProperty[1]] = event.target.value
    }

    this.setState({
      childInfo:childInfo,
      fatherInfo:fatherInfo,
      motherInfo:motherInfo
    })
  }

  handleSubmitFamily(e){
    e.preventDefault()
    e.stopPropagation();
    api.createChild(this.state.childInfo)
       .then(savedChild => {
         let childId = savedChild._id;
         let fatherInfo = this.state.fatherInfo;
         let motherInfo = this.state.motherInfo;
         if(fatherInfo === "" && motherInfo === "") {
          this.props.nextStepTab(this.props.userTab)
            
         } else {

          if(fatherInfo !== "" && motherInfo !== ""){
            fatherInfo.childId = childId;
            motherInfo.childId = childId;
            Promise.all([api.createParent(fatherInfo), api.createParent(motherInfo)])
                  .then(res => {
                    this.props.nextStepTab(this.props.userTab)
                 

                  })
           } else {
             if(fatherInfo !== ""){
              fatherInfo.childId = childId;
              api.createParent(fatherInfo)
                .then(res => {
                  this.props.nextStepTab(this.props.userTab)
                
                })
             } else {
              motherInfo.childId = childId;
              api.createParent(motherInfo)
                .then(res => {
                  this.props.nextStepTab(this.props.userTab)
                  
                })
             }
           }
         } 
       })
  }

  render() {
    return (
      <div className="check-family">
        <div className="child">
          <div className="newuser-type">Child Information</div>
          <Form>
            <FormGroup>
              <Label for="child-firstname">FisrtName:</Label>
              <Input type="text" name="child-firstname" id="child-firstname" value={this.state.childInfo.firstname} onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="child-lastname">LastName:</Label>
              <Input type="text" name="child-lastname" id="child-lastname" value={this.state.childInfo.lastname} onChange={this.handleInputChange}/>
            </FormGroup>

            <FormGroup>
              <Label for="child-birthday">Birthday:</Label>
              <Input type="date" name="child-birthday" id="child-birthday" value={this.state.childInfo.birthday} onChange={this.handleInputChange}/>
            </FormGroup>

            <FormGroup>
              <Label for="child-sex">Sex:</Label>
                <Input type="select" name="child-sex" id="child-sex" value={this.state.childInfo.sex} onChange={this.handleInputChange}>
                  <option value="F">F</option>
                  <option value="M">M</option>
                </Input>
            </FormGroup>
            <FormGroup>
              <Label for="child-age">Age:</Label>
              <Input type="text" name="child-age" id="child-age" value={this.state.childInfo.age} onChange={this.handleInputChange}/>
            </FormGroup>
          </Form>
        </div>

        {!this.props.isFatherSkip && (
          <div className="father">
            <div className="newuser-type">Father Information</div>

            <Form>
                <FormGroup>
                  <Label for="father-firstname">FisrtName:</Label>
                  <Input type="text" name="father-firstname" id="father-firstname" value={this.state.fatherInfo.firstname} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="father-lastname">FisrtName:</Label>
                  <Input type="text" name="father-lastname" id="father-lastname" value={this.state.fatherInfo.lastname} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="father-email">Email:</Label>
                    <Input type="email" name="father-email" id="father-email" value={this.state.fatherInfo.email} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="father-phone">Phone:</Label>
                  <Input type="text" name="father-phone" id="father-phone" value={this.state.fatherInfo.phone} onChange={this.handleInputChange}/>
                </FormGroup>
              </Form>
          </div>
        )}

        {!this.props.isMotherSkip && (
          <div className="mother">
            <div className="newuser-type">Mother Information</div>

            <Form>
                <FormGroup>
                  <Label for="mother-firstname">FisrtName:</Label>
                  <Input type="text" name="mother-firstname" id="mother-firstname" value={this.state.motherInfo.firstname} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="mother-lastname">FisrtName:</Label>
                  <Input type="text" name="mother-lastname" id="mother-lastname" value={this.state.motherInfo.lastname} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="mother-email">Email:</Label>
                    <Input type="email" name="mother-email" id="mother-email" value={this.state.motherInfo.email} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="mother-phone">Phone:</Label>
                  <Input type="text" name="mother-phone" id="mother-phone" value={this.state.motherInfo.phone} onChange={this.handleInputChange}/>
                </FormGroup>
            </Form>
          </div>
        )}

      
        <div>
        <button className="btn-click"  onClick={(e)=>this.handleSubmitFamily(e)}><i className="fas fa-save"></i>Submit</button>
        </div>
      </div>
    )
  }
}
