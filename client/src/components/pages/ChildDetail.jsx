import React, { Component } from 'react'
import api from "../../api";
import { Container, Row, Col } from 'reactstrap';



export default class ChildDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      child:""
    }
  }
  
  loadChild(id){
    api.findOneChild(id)
        .then(findedChild => {
          this.setState({
            child:findedChild[0],
          })
        })
  }

  componentDidMount(){
   let userId = this.props.info.match.params.id
   this.loadChild(userId)
  }

  convertUTCDateToLocalDate(date) {
    // let date1 = new Date(date)
    let newDate = new Date(date)

    let year = newDate.getFullYear()
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    let seconds = newDate.getSeconds();
    let minutes = newDate.getMinutes();
    let hour = newDate.getHours();

    if(month < 10){month ="0"+month}
    if(day < 10){day ="0"+day}  
    if(hour < 10){hour ="0"+hour}  
    if(minutes < 10){minutes ="0"+minutes}    
    if(seconds < 10){seconds ="0"+seconds}    
    let dateFormat = year+"-"+month+"-"+day
    return dateFormat;   
}

  render() {
    return (
      <div className="child-detail outer-div">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
          {this.state.child !== "" && (<Container>
                <Row>
                  <Col xs="5">First name:</Col>
                  <Col xs="7">{this.state.child.firstname}</Col>
                </Row>

                <Row>
                  <Col xs="5">Last name:</Col>
                  <Col xs="7">{this.state.child.lastname}</Col>
                </Row>

                <Row>
                  <Col xs="5">Birthday:</Col>
                  <Col xs="7">{this.convertUTCDateToLocalDate(this.state.child.birthday)}</Col>
                </Row>

                {/* <Row>
                  <Col xs="3">Email:</Col>
                  <Col xs="9">{this.state.child.email}</Col>                
                </Row> */}
              </Container>)}
        </div>)}
      </div>
    )
  }
}
