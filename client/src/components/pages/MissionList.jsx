import React, { Component } from 'react';
import MissionDetail from './MissionDetail';
import api from './../../api';
import { Route, withRouter } from 'react-router-dom';
import { Table, Row, Col } from 'reactstrap';

// export default class MissionList extends Component {
class MissionList extends Component {

  constructor(props){
    super(props);
    this.state ={
      events:[],
      initEvnt: {},
    }
  }

  handleSelectedEnent(id){
    this.props.history.push('/missions/' + id);
    console.log(id)
  }

  componentDidMount(){
    api.getEvents()
      .then(res => {
        this.setState({
          events:res
        })

        this.props.history.push('/missions/' + res[0]._id)
      })
  }

  render() {
    return (
      <div className="Mission-list outer-div">
        {this.state.events && (
          <Row>
            <Col md="4">
            <div className="list-scroll">
            <Table hover>
              <tbody>
                {this.state.events.map((event, i) =>(
                  <tr key={i} onClick={()=>this.handleSelectedEnent(event._id)}>
                  <td>{event.eventname}</td>
                </tr>
                ))}
              </tbody>
              </Table>
              </div>
            </Col>
            <Col md="8">
              <Route path='/missions/:id' render={()=><MissionDetail/>}/>            
            </Col>
          </Row>
        )}
    
      </div>
    )
  }
}
export default withRouter(MissionList);
