import React, { Component } from 'react';
import api from "../../api";
import Chart from "chart.js";
import {Bar} from 'react-chartjs-2';
import { 
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} 
from 'reactstrap';

export default class TaskCurrentAnalyze extends Component {
  constructor(props){
    super(props)
    this.state = {
      totalchartData:null,
      avechartData:null,
      options:null,
      options2:null,

      isShow: true,
      curYear:"",
    }
  }

  initChart(year){
    let labels = []
    let personalTotaldata =[]
    let totalH = [];
    let totalAve = []
    let PersonalAvedata = []
    this.getTotalTaskoFYear(year)
        .then(total => {
          let  totalHours;
          let totalAveHours;
          
          if(total.length > 0){
            totalHours = total[0].TotalHours
            totalAveHours = total[0].AveHours
          } 
          // console.log(totalHours)
          // console.log(totalAveHours)
          api.getCurrentTaskHoursoFAll()
          .then(res => {
            console.log(res)
            res.map((cur,i) => {
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
              labels.push(cur.firstname + "(" + childname + ")")
              personalTotaldata.push(cur.totalHours)
              PersonalAvedata.push(cur.aveHours)
              totalH.push(totalHours);
              totalAve.push(totalAveHours)
            })
      
            let dataset1 = [{
              data:personalTotaldata,
              label:"Personal",
              type:"bar",
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              // yAxisID:"y-axis-1"
            }
            ,{
              label:"Total",
              type:"line",
              fill:false,
              borderColor:"#ff4949",
              data:totalH,
              // yAxisID:"y-axis-2"
            }
          ];
      
            let dataset2 = [{
              data:PersonalAvedata,
              type:"bar",
              label:"Personal Average",
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              // yAxisID:"y-axis-1"
            }
            ,{
              label:"Total",
              type:"line",
              fill:false,
              borderColor:"#ff4949",
              data:totalAve,
              // yAxisID:"y-axis-2"
            }];
      
            this.setState({
              totalchartData: {
                datasets:dataset1,
              },
            
              options:{
                // maintainAspectRatio: false ,
                title:{
                  display:true,
                  text:"current total service hours",
                },
                responsive: true,
                tooltips: {
                  mode: 'label'
                },
                elements: {
                  line: {
                    fill: false
                  }
                },
                scales: {
                  xAxes: [
                    {labels:labels,
                     
                      display: true,
                      gridLines: {
                        display: false
                      }
                    }
                  ],
                  yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        min: 0,
                       
                    }
                  }]
                }},
                options2:{
                  // maintainAspectRatio: false ,
                  title:{
                    display:true,
                    text:"current average service hours",
                  },
                  responsive: true,
                  tooltips: {
                    mode: 'label'
                  },
                  elements: {
                    line: {
                      fill: false
                    }
                  },
                  scales: {
                    xAxes: [
                      {labels:labels,
                       
                        display: true,
                        gridLines: {
                          display: false
                        }
                      }
                    ],
                    yAxes: [{
                      ticks: {
                          beginAtZero:true,
                          min: 0,
                         
                      }
                    }]
                  }},
              avechartData :{
                labels:labels,
                datasets:dataset2,
              }
            })
          })
        })

  }

  getTotalTaskoFYear(year){
    return (api.getTotalTaskHousoFYear(year)
       .then(res => {
         return res
       })
    )
  }

  getYear(){
    let curDate = new Date()
    let year = curDate.getFullYear()
    let month = curDate.getMonth() + 1;
    // let day = curDate.getDate();

    if (month < 9){
      year = year - 1
    }

    return year+""
  }


  componentDidMount(){
    
    this.initChart(this.getYear())
    // this.initChart("2018")

  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.curYear !== prevState.curYear) {
      this.initChart(this.state.curYear)
    }
  }

  render() {
    
    return (
      <div className="service-statistic outer-div" style={{minHeight:"500px"}}>
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
        
          {this.state.totalchartData && (<Bar data={this.state.totalchartData} options={this.state.options} height={250}/>)}
          {this.state.avechartData && (<Bar data={this.state.avechartData} options={this.state.options2} height={250}/>)}
       </div>)}
      </div>
    )
  }
}
