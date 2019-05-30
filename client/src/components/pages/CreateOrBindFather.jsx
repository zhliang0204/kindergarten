import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col  } from 'reactstrap';
import api from "../../api";

export default class ChildBindWithFather extends Component {
  constructor(props){
    super(props)
    this.state = {
            
      firstname:"" ,
      lastname:"" ,
      email:"" ,
      phone:"" ,
      errorList:[],
      parentList:[],
      isCreate:true,
      isBind:false,
      curParent:"",
      curParentId:"",
      childId:"",

     
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleParentBind(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      curParentId: event.target.value,
     
    })
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
        if(this.state.firstname === ""){
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

  skipFather(e){
    e.preventDefault();
    e.stopPropagation();
    let childId = this.state.childId
   
    this.props.info.history.push("/createParent/mother/" + childId)
  }

  bindFather(e){
    e.preventDefault();
    e.stopPropagation();
    api.getAllParentAccordToRole("father")
        .then(parents => {
          let parentsList = []
          parents.map((cur,i) => {
            let childname = ""
            if(cur._child !== undefined && cur._child.length > 0){
              cur._child.map(curChild => {
                childname += curChild.firstname
                childname += ","
              })
            }

            if(childname.length > 0){
              childname = childname.substring(0, childname.length-1)
            }
            let curParent = {
              id:cur._id,
              firstname:cur.firstname,
              phone:cur.phone,
              email:cur.email,
              childname:childname
            }
            parentsList.push(curParent)
          })
          this.setState({
            parentList: parentsList,
            isBind:true,
            isCreate:false,
            curParentId:parentsList[0].id,
          })
        })
  }

  createFather(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      isBind:false,
      isCreate:true
    })
  }

  initComponent(){
    this.setState({
      childId:this.props.info.match.id
    })
  }

  getParticularUser(parentId){
    api.getParent(parentId)
       .then(parent => {
         this.setState({
           curParent:parent[0]
         })
       })
  }
 

  handleParentSubmit(e){
    e.preventDefault();
    e.stopPropagation();
    this.checkInfo()
        .then(errorList => {
          console.log(errorList)
          if(errorList.length === 0){
          
            e.preventDefault()
            let parentInfo = {
              firstname: this.state.firstname, 
              lastname: this.state.lastname, 
              email: this.state.email, 
              phone: this.state.phone,
              subrole: "father",
              childId: this.state.childId,
              // message:""
            }
            api.createParent(parentInfo)
                .then(parents => {
                  let fatherInfo = {
                    userId:parents._id,
                    email:parents.email,
                  }
                  api.createUserMail(fatherInfo)
                    .then(createUserEmail => {
                      this.setState({
                        firstname:"",
                        lastname:"",
                        email:"",
                        phone:""
                      })
    
                      let childId = this.state.childId
                      this.props.info.history.push("/createParent/mother/" + childId)
                    })
                  
                })
          } else {
            this.setState({
              errorList:errorList,
            })
          }
        })

  }

  handleParentBindSubmit(e){
    e.preventDefault();
    e.stopPropagation();
    let parentAndChildInfo = {
      userId: this.state.curParentId, 
      childId:this.state.childId,
    }
    api.bindWithParent(parentAndChildInfo)
       .then(res => {
         console.log(res)
         let childId = this.state.childId
         this.props.info.history.push("/createParent/mother/" + childId)
       })

  }

  componentDidMount(){
    let childId = this.props.info.match.params.id;
    console.log(childId)
    this.setState({
      childId:childId
    })
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.curParentId !== prevState.curParentId) {
      this.getParticularUser(this.state.curParentId)
    }  
  }
 

  render() {
    return (
      <div className="create-user outer-div">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
         <div className="parent">
            {/* {this.props.userTab === 2 && (<div className="newuser-type">Father Information</div>)}
            {this.props.userTab === 3 && (<div className="newuser-type">Mother Information</div>)} */}
            <div style={{textAlign:"right"}}>
              <button className="btn-click"  onClick={(e)=>this.bindFather(e)}><i className="fas fa-arrow-right"></i>Bind</button>
              <button className="btn-click"  onClick={(e)=>this.createFather(e)}><i className="fas fa-arrow-right"></i>Create</button>
              <button className="btn-click"  onClick={(e)=>this.skipFather(e)}><i className="fas fa-arrow-right"></i>Skip</button>

            </div>

           
            {this.state.isBind && (<div>
              <Form>
              <FormGroup>
                  <Label for="parent">Choose Father:</Label>
                    <Input type="select" name="parent" id="parent" onChange={(e) =>this.handleParentBind(e)}>
                      {this.state.parentList.length > 0 && this.state.parentList.map((cur,i) => (
                        <option value={cur.id} key={i} id={i}>{cur.firstname + "(" + cur.childname + ")"}</option>
                      ))}
                    </Input>
                </FormGroup>
            </Form>

            {this.state.curParent !== "" && (<Container>
              <Row>
                <Col xs="3">First name:</Col>
                <Col xs="9">{this.state.curParent.firstname}</Col>
              </Row>

              <Row>
                <Col xs="3">Last name:</Col>
                <Col xs="9">{this.state.curParent.lastname}</Col>
              </Row>

              <Row>
                <Col xs="3">Mobile:</Col>
                <Col xs="9">{this.state.curParent.phone}</Col>
              </Row>

              <Row>
                <Col xs="3">Email:</Col>
                <Col xs="9">{this.state.curParent.email}</Col>                
              </Row>
            </Container>)}

            <div style={{textAlign:"right"}}>
                <button className="btn-click"  onClick={(e)=>this.handleParentBindSubmit(e)}><i className="fas fa-arrow-right"></i>Next Step</button>
            </div>
            </div>)}


            {this.state.isCreate && (<div>
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
                  {this.state.errorList.indexOf(5) !== -1 && (<div className="hint">Please input parent mobile</div>)}
                  {this.state.errorList.indexOf(6) !== -1 && (<div className="hint">Please input an corrent mobile number</div>)}

                  <Input type="text" name="phone" id="phone" value={this.state.phone} onChange={this.handleInputChange}/>
                </FormGroup>
                <div style={{textAlign:"right"}}>
                  <button className="btn-click"  onClick={(e)=>this.handleParentSubmit(e)}><i className="fas fa-arrow-right"></i>Next Step</button>
                </div>
            </Form>

            </div>)}
 
          </div>
         

          {this.state.message && <div className="info info-danger">
            {this.state.message}
          </div>}
        
        </div>)}
      </div>
    )
  }
}
