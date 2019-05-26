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
      options:null,

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
      
      let dataset1 = [{
        data:totaldata,
        label:"History total serivice hours",
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      }];

      let dataset2 = [{
        data:avedata,
        label:"History average serivice hours",
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      }];

      this.setState({
        totalchartData: {
          labels:labels,
          datasets:dataset1,
        },
        options: {
          scales:{
            yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
          }
        },
        avechartData :{
          labels:labels,
          datasets:dataset2,
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
       {this.state.totalchartData && (<Bar data={this.state.totalchartData} options={this.state.options}/>)}
       {this.state.avechartData && (<Bar data={this.state.avechartData} options={this.state.options}/>)}
      </div>
    )
  }
}
