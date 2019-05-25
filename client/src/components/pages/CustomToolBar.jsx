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
                  <button type="button" onClick={this.navigate.bind(null, navigate.PREVIOUS)}><i className="fas fa-chevron-left"></i></button>
              </span>
              <span className="rbc-toolbar-label">{label}</span>
              <span className="rbc-btn-group">
                  <button type="button" onClick={this.navigate.bind(null, navigate.NEXT)}><i className="fas fa-chevron-right"></i></button>
              </span>

              <span className="rbc-btn-group">
                <select
                value={view}
                onChange={this.handleChange}
              >
                {views.map((value,i) => <option key={i} value={value}> {value} </option>)}
              </select>
              </span>

              
          </div>
         
        </div>
      )
  }
  navigate = action => {
      this.props.onNavigate(action)
  }
}
