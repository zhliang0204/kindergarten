import React, { Component } from 'react'
import { 
  Container,
  Row, 
  Col,
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink, 
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} 
from 'reactstrap';
import {withRouter } from 'react-router-dom';
import api from '../../api';
import classnames from 'classnames';


class MissionDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedEvent: null,
      selectedEventId:null,
      activeTab: '1',

      discussion: "",
      discussions:[],
      applications:[],
      serviceDate:'',

      finals:[],
    }
  }

  toggle(tab){
    if(this.state.activeTab !== tab){
      this.setState({
        activeTab:tab,
      })
    }
  }

  loadEvent(id){
    api.getSelectedEvent(id) 
      .then(res => {
        // console.log(res)
        this.setState({
          selectedEvent:res,
          selectedEventId: res._id,
          // discussions:res.discussion,
        })
      })
  }

  loadAll(id){
    api.getselectedEventAll(id)
        .then(res => {
          
          this.setState({
            selectedEvent:res,
            discussions:res.discussion,
            applications:res.candidates,
            finals:res.finals
          })
        })
  }

  handleTime(inputDate){
    var d = new Date(inputDate);
    return d.toLocaleTimeString() 
  }

  handleDate(inputDate){
    var d = new Date(inputDate);
    return d.toLocaleDateString()
  }


  handleInputChange(e){
    this.setState({
      [e.target.name] : e.target.value,
    })
  }


  handleDisApply(){
    let eventId = this.props.match.params.id;
    let data = {
      content:this.state.discussion,
    }
    api.postDiscussion(eventId, data)
      .then(res => {
        let curDiscussion = this.state.discussions.slice();
        curDiscussion.push(res)
        this.setState({
          discussions:curDiscussion,
          discussion:""
        })
      })
  }

  handleServiceApply(){
    let eventId = this.props.match.params.id;
    let serviceDate = this.state.serviceDate;
    let data = {serviceDate}
    api.postApplication(eventId, data)
        .then(res => {
          let curApplications = this.state.applications.slice();
          curApplications.push(res);
          this.setState({
            applications:curApplications,
            serviceDate:''
          })

        });
  }

  componentDidMount(){
    this.loadAll(this.props.match.params.id)

    this.handleDate('2019-04-30')
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.match.params.id !== prevProps.match.params.id){
      this.loadAll(this.props.match.params.id)
    }
  }

  render() {
    return (
      <div className="Mission-detail">
        {this.state.selectedEvent && (
          <div>
            <Container>
              <Row className="mission-header">{this.state.selectedEvent.eventname}</Row>
              <Row>
                <Col className='col-4'>From: </Col>
                <Col className='col-4'>{this.handleDate(this.state.selectedEvent.started)}</Col>
                <Col className='col-4'>{this.handleTime(this.state.selectedEvent.started)}</Col>
              </Row>

              <Row>
                <Col className='col-4'>To: </Col>
                <Col className='col-4'>{this.handleDate(this.state.selectedEvent.ended)}</Col>
                <Col className='col-4'>{this.handleTime(this.state.selectedEvent.ended)}</Col>

              </Row>

              <Row>
                <Col className='col-4'>Apply Before: </Col>
                <Col className='col-4'>{this.handleDate(this.state.selectedEvent.applybefore)}</Col>
                <Col className='col-4'>{this.handleTime(this.state.selectedEvent.applybefore)}</Col>

              </Row>

              <Row>
                <Col className='col-6'>Hours: {this.state.selectedEvent.reqhours}</Col>
                <Col className='col-6'>Person: {this.state.selectedEvent.reqpersons}</Col>
              </Row>
            </Container>

            <div className="mutil-tab">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    Discussion
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2') }}
                  >
                    Application
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}
                  >
                    Finals
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab} className="tab-content">
                <TabPane tabId="1">     
                <div className="content-list">              
                {this.state.discussions && this.state.discussions.map((diss, i) => (
                          <div className="dis" key={i}>
                            <div className='dis-content'>{diss.content}</div>
                            <div className='dis-username'>——{diss.username}</div>
                          </div>
                  ))}
                  </div>
                    <Form>
                      <FormGroup>
                        <Input type="textarea" name="discussion" value={this.state.discussion} onChange={(e)=>this.handleInputChange(e)} />
                      </FormGroup>
                      <Button onClick={()=>this.handleDisApply()}>Submit</Button>
                    </Form>   
                </TabPane>
                <TabPane tabId="2">
                <div className="content-list">
                  {this.state.applications && this.state.applications.map((application,i) => (
                    <Row key={i}>
                      <Col md="6">{application.username}</Col>
                      <Col md="6">{application.serviceDate}</Col>
                    </Row>
                  ))}
                  </div>
                  <Form>
                      <FormGroup>
                        <Input type="datetime-local" name="serviceDate" value={this.state.serviceDate} onChange={(e)=>this.handleInputChange(e)}/>
                      </FormGroup>
                    <Button onClick={()=>this.handleServiceApply()}>Apply</Button>
                  </Form> 
                  

                </TabPane>

                <TabPane tabId="3">
                <div className="content-list">
                  {this.state.selectedEvent.finals.map((final,i) => (
                    <Row key={i}>
                      <Col>UserName: {final.username}</Col>
                      <Col>Role: {final.role}</Col>
                      <Col>Service Date: {final.serviceDate}</Col>
                    </Row>
                  ))}
                </div>

                </TabPane>
              </TabContent>             
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(MissionDetail);
