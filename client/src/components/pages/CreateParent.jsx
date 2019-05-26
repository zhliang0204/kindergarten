import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from "./../../api";

export default class CreateParent extends Component {
  constructor(props){
    super(props)
    this.state = {
            
      firstname:"" ,
      lastname:"" ,
      email:"" ,
      phone:"" ,
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
    
   return (
     api.getAllemails()
      .then(emails => {
        console.log(emails)
        if(this.state.parentFirstName === ""){
          errorList.push(1)
        }
        if(this.state.lastname === ""){
          errorList.push(2)
        }
        if(this.state.email === ""){
          errorList.push(3)
        }
        if(this.state.email !== "" && this.state.email.indexOf("@") === -1){
          errorList.push(4)
        }
        if(this.state.phone === ""){
          errorList.push(5)
        }
        if(this.state.phone !== "" && this.state.phone.length !== 11){
          errorList.push(6)
        }


        if(emails.indexOf(this.state.email) !== -1){
        
          errorList.push(8)
        }
        return errorList
      })
   )
  }

  skipParent(){
    if(this.props.userTab === 2){
      this.props.isParentSkip("father")
    }
    if(this.props.userTab === 3){
      this.props.isParentSkip("mother")
    }
    
    this.props.nextStepTab(this.props.userTab)
  }


  handleParentSubmit(e){
    

    this.checkInfo()
        .then(errorList => {
          console.log(errorList)
          if(errorList.length === 0){
            let subrole = this.props.userTab === 2? "father" : "mother";
            e.preventDefault()
            let parentInfo = {
              firstname: this.state.firstname, 
              lastname: this.state.lastname, 
              email: this.state.email, 
              phone: this.state.phone,
              subrole: subrole,
              // childId: this.state.childId,
              // message:""
            }
            this.props.setParentInfo(parentInfo)
            this.setState({
              firstname:"",
              lastname:"",
              email:"",
              phone:""
            })
          } else {
            this.setState({
              errorList:errorList,
            })
          }
        })

  }

 

  render() {
    return (
      <div className="create-user">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
         <div className="parent">
            {this.props.userTab === 2 && (<div className="newuser-type">Father Information</div>)}
            {this.props.userTab === 3 && (<div className="newuser-type">Mother Information</div>)}
            <div className="btn-click" onTouchStart={(e)=> this.skipParent(e)} onClick={(e)=>this.skipParent(e)}><i className="fas fa-arrow-right"></i>Skip</div>

            <Form>
                <FormGroup>
                  <Label for="firstname">Fisrt name:</Label>
                  {this.state.errorList.indexOf(1) !== -1 && (<div className="hint">Please input parent first name</div>)}
                  <Input type="text" name="firstname" id="firstname" value={this.state.firstname} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="lastname">Last name:</Label>
                  {this.state.errorList.indexOf(2) !== -1 && (<div className="hint">Please input parent last name</div>)}
                  <Input type="text" name="lastname" id="lastname" value={this.state.lastname} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email:</Label>
                  {this.state.errorList.indexOf(3) !== -1 && (<div className="hint">Please input parent email</div>)}
                  {this.state.errorList.indexOf(4) !== -1 && (<div className="hint">Please input valid parent email</div>)}
                  {this.state.errorList.indexOf(8) !== -1 && (<div className="hint">This email address has been used</div>)}

                    <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="phone">Phone:</Label>
                  {this.state.errorList.indexOf(5) !== -1 && (<div className="hint">Please input parent phone phone</div>)}
                  <Input type="text" name="phone" id="phone" value={this.state.phone} onChange={this.handleInputChange}/>
                </FormGroup>
                <div className="btn-click" onTouchStart={(e)=> this.handleParentSubmit(e)} onClick={(e)=>this.handleParentSubmit(e)}><i className="fas fa-arrow-right"></i>Next Step</div>

            </Form>

          </div>
         

          {this.state.message && <div className="info info-danger">
            {this.state.message}
          </div>}
        
        </div>)}
      </div>
    )
  }
}
