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
      activeTab: '1',
      discussion: "",
      discussions:[],
      candidate:"",
      candidates:[],
      candidateDate:'',
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
        console.log(res)
        this.setState({
          selectedEvent:res,
          discussions:res.discussion,
        })
      })
  }

  handleInputChange(e){
    this.setState({
      [e.target.name] : e.target.value,
    })
  }

  handleInputChange1(e){
    console.log(e.target.value)
  }

  handleDiscussion(){
    let eventId = this.props.match.params.id;
    let content = this.state.discussion;
    let data = {content}
    // console.log(content)
    api.postDiscussion(eventId, data);
    let curDiscussion = this.state.discussions.slice();
    let cur = {_userId: api.getLocalStorageUser()._id,
              username:api.getLocalStorageUser().username,
              content:content}
    
    curDiscussion.push(cur);
    // console.log(curDiscussion);

    this.setState({
      discussions: curDiscussion,
      discussion:"",
    })

  }

  handleApply(e){
    
  }

  

  componentDidMount(){
    // console.log(this.props.match);
    this.loadEvent(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.match.params.id !== prevProps.match.params.id){
      this.loadEvent(this.props.match.params.id);
    }
  }

  render() {
    return (
      <div className="Mission-detail">
        {this.state.selectedEvent && (
          <div>
            <Container>
              <Row>{this.state.selectedEvent.eventname}</Row>
              <Row>
                <Col className='col-6'>{this.state.selectedEvent.started}</Col>
                <Col className='col-6'>{this.state.selectedEvent.ended}</Col>
              </Row>
              <Row>
                <Col className='col-6'>{this.state.selectedEvent.reqhours}</Col>
                <Col className='col-6'>{this.state.selectedEvent.reqpersons}</Col>
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
                    onClick={() => { this.toggle('2'); }}
                  >
                    Candidates
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
                                   
                        {this.state.discussions && this.state.discussions.map((diss, i) => (
                          <div className="dis" key={i}>
                            <div className='dis-content'>{diss.content}</div>
                            <div className='dis-username'>——{diss.username}</div>
                          </div>
                        ))}
                    <Form>
                      <FormGroup>
                        {/* <Label for="exampleText"></Label> */}
                        <Input type="textarea" name="discussion" id="exampleText" value={this.state.discussion} onChange={(e)=>this.handleInputChange(e)} />
                      </FormGroup>
                      <Button onClick={()=>this.handleDiscussion()}>Submit</Button>
                    </Form>              
                    {/* </Col>
                  </Row> */}
                </TabPane>
                <TabPane tabId="2">
                  {this.state.selectedEvent.candidates && this.state.selectedEvent.candidates.map((candidate,i) => (
                    <Row key={i}>
                      {candidate}
                    </Row>
                  ))}
                  <Form>
                      <FormGroup>
                        {/* <Label for="exampleText"></Label> */}
                        <Input type="date" name="candidateDate" value={this.state.curDate} onChange={(e)=>this.handleInputChange(e)}/>
                        {/* <Input type="date" name="candidate" value={this.state.discussion} onChange={(e)=>this.handleInputChange(e)} /> */}
                      </FormGroup>
                    <Button onClick={(e)=>this.handleApply(e)}>Apply</Button>
                  </Form> 
                  

                </TabPane>

                <TabPane tabId="3">
                  {this.state.selectedEvent.finals.map((final,i) => (
                    <Row key={i}>
                      {final}
                    </Row>
                  ))}

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
