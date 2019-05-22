import React, { Component } from 'react';
import api from "./../../api";
import Chart from "chart.js";
import {Bar} from 'react-chartjs-2';

export default class PersonService extends Component {
  constructor(props){
    super(props)
    this.state = {
      totalchartData:null,
      avechartData:null,

      isShow: true,
    }
  }
  initChart(){
    let labels = []
    let totaldata =[]
    let avedata = []
    api.getPersonaHistoryService()
    .then(res => {
      for(let i = 0; i < res.length; i++){
        labels.push(res[i].year)
        totaldata.push(res[i].totalHours)
        avedata.push(res[i].aveHours)

      }
      this.setState({
        totalchartData: {
          labels:labels,
          datasets:[{data:totaldata}],
        },
        avechartData :{
          labels:labels,
          datasets:[{data:avedata}],
        }
      })
    })
  }

  componentDidMount(){
    this.initChart()
  }

  render() {
    return (
      <div className="service-statistic">
       {this.state.totalchartData && (<Bar data={this.state.totalchartData} />)}
       {this.state.avechartData && (<Bar data={this.state.avechartData} />)}
      </div>
    )
  }
}
