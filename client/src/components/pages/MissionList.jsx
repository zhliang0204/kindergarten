import React, { Component } from 'react';
import api from './../../api';
import { Table, Row, Col } from 'reactstrap';

export default class MissionList extends Component {
  constructor(props){
    super(props);
    this.state ={
      events:[]
    }
  }

  componentDidMount(){
    api.getEvents()
      .then(res => {
        console.log(res);
        this.setState({events:res})
      })
  }

  render() {
    return (
      <div className="Mission-list">
        {this.state.events && (
          <Row>
            <Col md="4">
            <Table>
              <tbody>
                {this.state.events.map((event, i) =>(
                  <tr key={i}>
                  <td>{event.eventname}</td>
                </tr>
                ))}
              </tbody>
              </Table>
            </Col>
            <Col md="8"></Col>
          </Row>
        )}
    
      </div>
    )
  }
}
