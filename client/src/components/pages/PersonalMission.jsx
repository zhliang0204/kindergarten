import React, { Component } from 'react';
import api from "./../../api";
import Chart from "chart.js";
import {Bar} from 'react-chartjs-2';
import { Button } from 'reactstrap';
import  Calendar  from './Calendar';


// var data = {
// 	labels: ["January", "February", "March", "April", "May", "June", "July"],
// 	datasets: [
// 		{
// 			label: "My First dataset",
// 			fillColor: "rgba(220,220,220,0.2)",
// 			strokeColor: "rgba(220,220,220,1)",
// 			pointColor: "rgba(220,220,220,1)",
// 			pointStrokeColor: "#fff",
// 			pointHighlightFill: "#fff",
// 			pointHighlightStroke: "rgba(220,220,220,1)",
// 			data: [65, 59, 80, 81, 56, 55, 40]
// 		},
// 		{
// 			label: "My Second dataset",
// 			fillColor: "rgba(151,187,205,0.2)",
// 			strokeColor: "rgba(151,187,205,1)",
// 			pointColor: "rgba(151,187,205,1)",
// 			pointStrokeColor: "#fff",
// 			pointHighlightFill: "#fff",
// 			pointHighlightStroke: "rgba(151,187,205,1)",
// 			data: [28, 48, 40, 19, 86, 27, 90]
// 		}
// 	]
// };

export default class PersonalMission extends Component {
  constructor(props){
    super(props)
    this.state ={
      chartData:null,
      isShow: true,
      missions: [],
    }
    // this.initChart1()
    // this.chartRef = React.createRef();
  }
  // chartRef = React.createRef();

  componentDidMount(){
    // this.initChart1()
    this.initChart()
    this.loadMissions()
  }

  initChart1(){
    const myChartRef = this.chartRef.current.getContext("2d");
    console.log(myChartRef)
        
    new Chart(myChartRef, {
        // container: myChartRef,
        type: "Bar",
        data: {
            //Bring in data
            labels: ["Jan", "Feb", "March"],
            datasets: [
                {
                    label: "Sales",
                    data: [86, 67, 91],
                }
            ]
        },
       
    });

    this.setState({
      isShow:true
    })
  }

  initChart(){
   
    let labels = []
    let data =[]
    api.personalMission()
    .then(res => {
      for(let i = 0; i < res.length; i++){
        labels.push(res[i].year)
        data.push(res[i].serviceHours)
      }
      this.setState({
        chartData: {
          labels:labels,
          datasets:[{data:data}],
        }
      })
    })
  }

  loadMissions(){
    let res = [];
    api.personalFinal()
      .then(finals =>{
        res = finals.slice() 
      })
      .then(cur =>{
        
        api.personalApplication()
          .then(applications => {
            res.concat(applications)
            this.setState({
              missions: res
            })
          })
      })

  }


  // show personal mission list
  

  render() {
    return (
      <div className="Person-Mission outer-div">
        <div className="chart-info">
        {/* init1 */}
         {/* {this.state.isShow && (<div >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>)} */}
          {/* initChart() */}
          {this.state.chartData && (<Bar data={this.state.chartData} />)}
        </div>
        
        <div className="mission-list">
          <Calendar />
        </div>
      </div>
    )
  }
}
