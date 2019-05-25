import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from "./../../api";

export default class CreateUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      tab:1,
      childfirstname:"",
      childlastname:"",
      childsex:"F",
      childage:"",
      childId:"",
      childbirthday:"",
      
      fatherfirstname:"" ,
      fatherlastname:"" ,
      fatherusername:"",
      fatheremail:"" ,
      fatherphone:"" ,
      motherfirstname:"" ,
      motherlastname:"" ,
      motherusername:"",
      motheremail:"" ,
      motherphone:"" ,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClidSubmit(e){
    let childInfo = {
      firstname: this.state.childfirstname, 
      lastname: this.state.childlastname, 
      sex: this.state.childsex, 
      age: this.state.childage,
      birthday:this.state.childbirthday
    
      
    }
    console.log(childInfo)
    api.createChild(childInfo)
       .then(savedChild => {
         this.setState({
          childfirstname:"",
          childlastname:"",
          childsex:"",
          childage:"",
          childId:savedChild._id,
          tab:2,
         })
       })
  }

  handleFatherSubmit(e){
    e.preventDefault()
    let fatherInfo = {
      firstname: this.state.fatherfirstname, 
      lastname: this.state.fatherlastname, 
      email: this.state.fatheremail, 
      phone: this.state.fatherphone,
      subrole: "father",
      childId: this.state.childId,
      message:""
    }
    // console.log(fatherInfo)
    api.createParent(fatherInfo)
       .then(savedFather => {
         this.setState({
          fatherfirstname:"",
          fatherlastname:"",
          fatheremail:"",
          fatherphone:"",
          tab:3,
         })
         console.log("------saved parent-----")
         console.log(savedFather)
         let userInfo = {
          userId:savedFather._id, 
          email:savedFather.email
         }
         api.createUserMail(userInfo)
       })
  }

  handleMotherSubmit(e){
    let motherInfo = {
      firstname: this.state.motherfirstname, 
      lastname: this.state.motherlastname, 
      email: this.state.motheremail, 
      phone: this.state.motherphone,
      subrole: "mother",
      childId: this.state.childId,
    }
    api.createParent(motherInfo)
       .then(savedmother => {
         this.setState({
          motherfirstname:"",
          motherlastname:"",
          motheremail:"",
          motherphone:"",
          tab:4,
         })
         console.log("------saved parent-----")
         console.log(savedmother)
         let userInfo = {
          userId:savedmother._id, 
          email:savedmother.email
         }
         api.createUserMail(userInfo)
       })
  }

  createNewFamily(){
    this.setState({
      tab:1,
    })
  }

  render() {
    return (
      <div className="create-user outer-div">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
          {this.state.tab === 1 && (<div className="child">
          <div className="newuser-type">Child Information</div>
          <Form>
            <FormGroup>
              <Label for="childfirstname">FisrtName:</Label>
              <Input type="text" name="childfirstname" id="childfirstname" value={this.state.childfirstname} onChange={this.handleInputChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="childlastname">LastName:</Label>
              <Input type="text" name="childlastname" id="childlastname" value={this.state.childlastname} onChange={this.handleInputChange}/>
            </FormGroup>

            <FormGroup>
              <Label for="childbirthday">Birthday:</Label>
              <Input type="date" name="childbirthday" id="childbirthday" value={this.state.childbirthday} onChange={this.handleInputChange}/>
            </FormGroup>

            <FormGroup>
              <Label for="childsex">Sex:</Label>
                <Input type="select" name="childsex" id="childsex" onClick={this.handleInputChange}>
                  <option value="F">F</option>
                  <option value="M">M</option>
                </Input>
            </FormGroup>
            <FormGroup>
              <Label for="childage">Age:</Label>
              <Input type="text" name="childage" id="childage" value={this.state.childage} onChange={this.handleInputChange}/>
            </FormGroup>
            <div className="btn-click" onTouchStart={(e)=>this.handleClidSubmit(e)} onClick={(e)=>this.handleClidSubmit(e)}><i className="fas fa-arrow-right"></i>Next Step</div>
          </Form>
          
          </div>)}
          {this.state.tab === 2 && (<div className="father">
            <div className="newuser-type">Father Information</div>

            <Form>
                <FormGroup>
                  <Label for="fatherfirstname">FisrtName:</Label>
                  <Input type="text" name="fatherfirstname" id="fatherfirstname" value={this.state.fatherfirstname} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="fatherlastname">FisrtName:</Label>
                  <Input type="text" name="fatherlastname" id="fatherlastname" value={this.state.fatherlastname} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="fatheremail">Email:</Label>
                    <Input type="email" name="fatheremail" id="fatheremail" value={this.state.fatheremail} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="fatherphone">Phone:</Label>
                  <Input type="text" name="fatherphone" id="fatherphone" value={this.state.email} onChange={this.handleInputChange}/>
                </FormGroup>
                <div className="btn-click" onTouchStart={(e)=> this.handleFatherSubmit(e)} onClick={(e)=>this.handleFatherSubmit(e)}><i className="fas fa-arrow-right"></i>Next Step</div>
            </Form>


          </div>)}
          {this.state.tab === 3 && (<div className="mother">

          <div className="newuser-type">Mother Information</div>

          <Form>
              <FormGroup>
                <Label for="motherfirstname">FisrtName:</Label>
                <Input type="text" name="motherfirstname" id="motherfirstname" value={this.state.motherfirstname} onChange={this.handleInputChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="motherlastname">LastName：</Label>
                  <Input type="text" name="motherlastname" id="motherlastname" value={this.state.motherlastname} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="motheremail">Email:</Label>
                  <Input type="email" name="motheremail" id="motheremail" value={this.state.motheremail} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="motherphone">Phone:</Label>
                <Input type="text" name="motherphone" id="motherphone" value={this.state.motherphone} onChange={this.handleInputChange}/>
              </FormGroup>
              <div className="btn-click" onTouchStart={(e)=>this.handleMotherSubmit(e)}  onClick={(e)=>this.handleMotherSubmit(e)}><i className="fas fa-save"></i>Submit</div>
          </Form>

          </div>)}

          {this.state.tab === 4 && (
            <div>
              <div className="newuser-type">Child and Parents are added</div>
              <div className="btn-click" onClick={()=>this.createNewFamily()}><i className="fas fa-plus-circle"></i>Add Child</div>
            </div>
          )}

          {this.state.message && <div className="info info-danger">
            {this.state.message}
          </div>}
        
        </div>)}
      </div>
    )
  }
}
