import React, { Component } from 'react';
import api from "./../../api";
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

export default class TaskHistoryAnalyze extends Component {
  constructor(props){
    super(props)
    this.state = {
      totalchartData:null,
      avechartData:null,
      options:null,
      options2:null,

      years:[],
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
          api.getAllTaskHoursoFYear(year)
          // api.getPersonaHistoryService()
          .then(res => {
             
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
              personalTotaldata.push(cur.historyServiceHours[0].totalHours)
              PersonalAvedata.push(cur.historyServiceHours[0].aveHours)
              totalH.push(totalHours);
              totalAve.push(totalAveHours)
            })
      
            let dataset1 = [{
              data:personalTotaldata,
              // data:[2,1,2,2,1],
      
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
              borderColor:"#ec932f",
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
              borderColor:"#ec932f",
              data:totalAve,
              // yAxisID:"y-axis-2"
            }];
      
            this.setState({
              totalchartData: {
                datasets:dataset1,
              },
            
              options:{
                title:{
                  display:true,
                  text:"History total service hours",
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
                      },
                    }
                  ],
                  yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        min: 0,
                       
                    }
                  }]
                  // yAxes: [
                  //   {
                  //     type: 'linear',
                  //     display: true,
                  //     position: 'left',
                  //     id: 'y-axis-1',
                  //     gridLines: {
                  //       display: false
                  //     },
                  //     labels: {
                  //       show: true
                  //     }
                  //   },
                  //   {
                  //     type: 'linear',
                  //     display: true,
                  //     position: 'right',
                  //     id: 'y-axis-2',
                  //     gridLines: {
                  //       display: false
                  //     },
                  //     labels: {
                  //       show: true
                  //     }
                  //   }
                  // ]
                }},
                options2:{
                  title:{
                    display:true,
                    text:"History average service hours",
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
                        },
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

  getPossibleYears(number){
    let curDate = new Date()
    let year = curDate.getFullYear()
    let month = curDate.getMonth() + 1;

    let years = [];
    if (month < 9){
      year = year - 1
    }

    for(let i = 0; i<number; i++){
      years.push(year - i)
    }
    // this.setState({
    //   years:years,
    //   curYear:year
    // })
    
    return years
    
  }

  handleInputChange(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      curYear:e.target.value
    })
  }

  componentDidMount(){
    let resyears = this.getPossibleYears(6)    
    this.setState({
      years:resyears,
      curYear:resyears[0],
    })
    this.initChart(this.state.curYear)
        
    // Promise.all([this.getPossibleYears(6),this.initChart(this.state.curYear)])
    //        .then(res => {
    //          console.log("initial chart")
    //        })

  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.curYear !== prevState.curYear) {
      this.initChart(this.state.curYear)
    }
  }

  render() {
    
    return (
      <div className="service-statistic outer-div">
        {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
        {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
        {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

        {this.props.langTab ==="lang4" && (<div className="english">
          <FormGroup>
            <Label for="curYear">Select year to show chart</Label>
              <Input type="select" name="curYear" id="curYear" onClick={(e) =>this.handleInputChange(e)}>
                {this.state.years && this.state.years.map((cur,i) => (
                  <option value={cur} key={i}>{cur}</option>
                ))}
              
            </Input>
          </FormGroup>
          {this.state.curYear !== "" && this.state.totalchartData && (<Bar data={this.state.totalchartData} options={this.state.options}/>)}
          {this.state.curYear !== "" &&this.state.avechartData && (<Bar data={this.state.avechartData} options={this.state.options2}/>)}
       </div>)}
      </div>
    )
  }
}
