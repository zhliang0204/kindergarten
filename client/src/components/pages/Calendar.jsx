import React, { Component } from "react";
import { render } from "react-dom";
// import events from "./events";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// moment.locale("en");
// BigCalendar.momentLocalizer(moment);
const localizer = BigCalendar.momentLocalizer(moment);

// const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
let events = [
  {
    'title': 'All Day Event very long title',
    'allDay': true,
    'start': new Date(2015, 3, 0),
    'end': new Date(2015, 3, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2015, 3, 7),
    'end': new Date(2015, 3, 10)
  },

  {
    'title': 'DTS STARTS',
    'start': new Date(2016, 2, 13, 0, 0, 0),
    'end': new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    'title': 'DTS ENDS',
    'start': new Date(2016, 10, 6, 0, 0, 0),
    'end': new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    'title': 'Some Event',
    'start': new Date(2015, 3, 9, 0, 0, 0),
    'end': new Date(2015, 3, 9, 0, 0, 0)
  },
  {
    'title': 'Conference',
    'start': new Date(2015, 3, 11),
    'end': new Date(2015, 3, 13),
    desc: 'Big conference for important people'
  },
  {
    'title': 'Meeting',
    'start': new Date(2015, 3, 12, 10, 30, 0, 0),
    'end': new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'start': new Date(2015, 3, 12, 12, 0, 0, 0),
    'end': new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start': new Date(2015, 3, 12, 14, 0, 0, 0),
    'end': new Date(2015, 3, 12, 15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'start': new Date(2015, 3, 12, 17, 0, 0, 0),
    'end': new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'title': 'Dinner',
    'start': new Date(2015, 3, 12, 20, 0, 0, 0),
    'end': new Date(2015, 3, 12, 21, 0, 0, 0)
  },
  {
    'title': 'Birthday Party',
    'start': new Date(2015, 3, 13, 7, 0, 0),
    'end': new Date(2015, 3, 13, 10, 30, 0)
  },
  {
    'title': 'Birthday Party 2',
    'start': new Date(2015, 3, 13, 7, 0, 0),
    'end': new Date(2015, 3, 13, 10, 30, 0)
  },
  {
    'title': 'Birthday Party 3',
    'start': new Date(2015, 3, 13, 7, 0, 0),
    'end': new Date(2015, 3, 13, 10, 30, 0)
  },
  {
    'title': 'Late Night Event',
    'start': new Date(2015, 3, 17, 19, 30, 0),
    'end': new Date(2015, 3, 18, 2, 0, 0)
  },
  {
    'title': 'Multi-day Event',
    'start': new Date(2015, 3, 20, 19, 30, 0),
    'end': new Date(2015, 3, 22, 2, 0, 0)
  }
]


export default class Calendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      view: "week",
      date: new Date(),
      width: 600,
      height:300
    }
  }


  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
  }

  render() {
    return (
      <div style={{ height: 700 }}>
        {/* <button onClick={() => this.setState({ view: "week" })}>week</button>
        <button onClick={() => this.setState({ view: "month" })}>Month</button> */}
        <BigCalendar
          localizer={localizer}
          style={{ height: this.state.height, width: this.state.width }}
          // toolbar={true}
          events={events}
          // step={60}
          // views={allViews}
          // view={this.state.view}
          // onView={() => {}}
          // date={this.state.date}
          // onNavigate={date => this.setState({ date })}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    );
  }
}


