import React, { Component } from 'react';
import BigCalendar from "react-big-calendar";
import Toolbar from "react-big-calendar";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import moment from "moment";

let navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
}

const localizer = BigCalendar.momentLocalizer(moment) 

export default class  CustomToolbar extends Component {
  



  handleChange = (event) => {
    this.props.onView(event.target.value);

  };

  render() {
      // let { localizer: { messages }, label } = this.props;
      const { view, views, onNavigate, label } = this.props;
      return(
        <div>
          <div className="rbc-toolbar">
              <span className="rbc-btn-group">
                  <button type="button" onClick={this.navigate.bind(null, navigate.PREVIOUS)} style={{border: "1px solid #ccc", width:"30px", padding:"3px", height:"34px", borderRadius:"3px"}}><i className="fas fa-chevron-left"></i></button>
              </span>
              <span className="rbc-toolbar-label" style={{width:"80px", padding:"3px", height:"34px"}}>{label}</span>
              <span className="rbc-btn-group">
                  <button type="button" onClick={this.navigate.bind(null, navigate.NEXT)} style={{border: "1px solid #ccc", width:"30px",padding:"3px",height:"34px", borderRadius:"3px"}}><i className="fas fa-chevron-right"></i></button>
              </span>
              

              <span className="rbc-btn-group" >
                <select
                style={{border: "1px solid #ccc", width:"80px",height:"34px", borderRadius:"3px"}}
                value={view}
                onChange={this.handleChange}
              >
                {views.map((value,i) => <option key={i} value={value}> {value} </option>)}
              </select>
              </span>


            

          </div>
         
          <div style={{margin: "5px 0", display:"flex", flexDirection:"row", flexWrap: "nowrap", justifyContent: "space-around", alignItems: "center",alignContent: "stretch"}}>
                <div style={{backgroundColor:"#FF8A5C", height:"15px", width:"80px", color:"white", fontSize:"0.6rem", textAlign:"center"}}>Pre-Execute</div>
                <div style={{backgroundColor:"#4592AF", height:"15px", width:"80px", color:"white", fontSize:"0.6rem", textAlign:"center"}}>Execute</div>
                <div style={{backgroundColor:"#8B5D5D", height:"15px", width:"80px", color:"white", fontSize:"0.6rem", textAlign:"center"}}>After-Execute</div>
          </div>
         
        </div>
      )
  }
  navigate = action => {
      this.props.onNavigate(action)
  }
}
