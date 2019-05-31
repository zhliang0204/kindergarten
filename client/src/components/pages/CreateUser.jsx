import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import api from "../../api";
import CreateChild from "./CreateChild"
import CreateParent from "./CreateParent"
import CheckNewFamily from "./CheckNewFamily"


export default class CreateUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      userTab:1,
      childId:"",
      childInfo:"",
      fatherInfo:"",
      motherInfo:"",
      isMotherSkip:false,
      isFatherSkip:false,
    }

    // this.handleInputChange = this.handleInputChange.bind(this)
    this.nextStepTab = this.nextStepTab.bind(this)
    this.setParentInfo = this.setParentInfo.bind(this)
    this.setChildInfo = this.setChildInfo.bind(this)
    this.isParentSkip = this.isParentSkip.bind(this)
    this.setUserTab = this.setUserTab.bind(this)
  }

  setChildInfo(newChild){
    this.setState({
      childInfo:newChild,
      userTab:2
    })
  }

  isParentSkip(skipParent){
    if(skipParent === "mother"){
      this.setState({isMotherSkip:true})
    }
    if(skipParent === "father"){
      this.setState({isFatherSkip:true})
    }
  }

  setParentInfo(newParent){
    if(this.state.userTab === 2){
      this.setState({
        fatherInfo:newParent,
        userTab:3
      })
    } else {
      if(this.state.userTab === 3){
        this.setState({
          motherInfo:newParent,
          userTab:4
        })
      }
    }
  }

  setUserTab(e){
    // e.preventDefault()
    // console.log("clicked")
    this.setState({
      userTab:1,
    })
  }

  nextStepTab(stepNum){
   this.setState({
     userTab:stepNum + 1
   })
  }

  render() {
    return (
      <div className="create-user outer-div">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
          {this.state.userTab === 1 && (<CreateChild langTab={this.props.langTab} setChildInfo={this.setChildInfo}/>)}
          {this.state.userTab === 2 && (<CreateParent userTab={this.state.userTab} nextStepTab = {this.nextStepTab} langTab={this.props.langTab} setParentInfo={this.setParentInfo} isParentSkip={this.isParentSkip}/>)}
          {this.state.userTab === 3 && (<CreateParent userTab={this.state.userTab} nextStepTab = {this.nextStepTab} langTab={this.props.langTab} setParentInfo={this.setParentInfo} isParentSkip={this.isParentSkip}/>)}

          {this.state.userTab === 4 && (
            <CheckNewFamily userTab={this.state.userTab} nextStepTab={this.nextStepTab} childInfo={this.state.childInfo} fatherInfo={this.state.fatherInfo} motherInfo={this.state.motherInfo} isFatherSkip={this.state.isFatherSkip} isMotherSkip={this.state.isMotherSkip}/>
          )}

          {this.state.userTab === 5 && (
            <div>
              <div className="newuser-type">Child and Parents are added</div>
              <div className="btn-click" onTouchStart={this.setUserTab} onClick={this.setUserTab}><i className="fas fa-plus-circle"></i>Add a child</div>
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
