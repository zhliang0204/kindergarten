import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
 } from 'reactstrap';

// import { Link} from 'react-router-dom';
import { Route, Link, NavLink, Switch } from 'react-router-dom';

import api from './../../api';
import Home from './Home';
// import Life from './Life';
// import Purpose from './Purpose';
// import Registration from './Registration';
// import Contact from './Contact';
// import Service from './Service';
import Login from './Login';
import Signup from './Signup';
// import MissionList from './MissionList';
import CreateEvent from './CreateEvent';
// import Team from './Team';
// import PersonalMission from './PersonalMission';
import CreateUser from "./CreateUser";
import UserActive from './UserActive';
// import ActiveAccount from './ActiveAccount';
import SetPassword from "./SetPasswrod";
import EventsList from "./EventsList";
import EventDetail from "./EventDetail";
import PersonService from "./PersonService";
import PersonEvents from "./PersonEvents";
import EditProcess from "./EditProcess";
import PersonalEventDetail from "./PersonalEventDetail";
// import GoogleCalendar from './GoogleCalendar'




export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="Kg-navbar">
        <Navbar expand="md" color="faded" light>
          <NavbarBrand href="/">Home</NavbarBrand> 
          <NavbarToggler onClick={this.toggle} className="mr-2" />
          
          <Collapse isOpen={this.state.isOpen} navbar> 
          
            <Nav className="ml-auto" navbar>

              <NavItem>
                {!api.isLoggedIn() && <NavLink to="/login">{this.props.isGerman? 'Login':'登陆'}</NavLink>}
              </NavItem> 

              <NavItem>
                {api.isLoggedIn() && <NavLink to="/events">{this.props.isGerman? 'Events':'服务'}</NavLink>}
              </NavItem>

              <NavItem>
                {api.isLoggedIn() && api.getLocalStorageUser().role !=="parent" && <NavLink to="/createuser"> {this.props.isGerman? 'Create':'创建用户'}</NavLink>}
              </NavItem> 

              <NavItem>
                {api.isLoggedIn() && <NavLink to="/person/servicehistory">{this.props.isGerman? 'ServiceHistory':'历史服务信息'}</NavLink>}
              </NavItem>

              <NavItem>
                {api.isLoggedIn() && <NavLink to="/person/events">{this.props.isGerman? 'personEvent':'个人服务'}</NavLink>}
              </NavItem>

              <NavItem>
                {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
              </NavItem> 
           
            </Nav>
          </Collapse>
        </Navbar>

        <Switch>
          <Route path="/" exact render={()=><Home isGerman={this.props.isGerman}/>}/>
          <Route path="/createuser" render={()=><CreateUser isGerman={this.props.isGerman}/>}/>
          <Route path="/active/:id" render={(info)=><UserActive isGerman={this.props.isGerman} info={info} />}/>
          {/* <Route path="/useractive" render={()=><ActiveAccount isGerman={this.props.isGerman} />}/> */}
          <Route path="/setpassword/:id" render={(info)=><SetPassword isGerman={this.props.isGerman} info={info} />}/>
          {/* <Route path="/events/detail/:id" render={()=><EventDetail isGerman={this.props.isGerman} />}/> */}
          <Route path="/events/detail/:id" render={(info)=><EventDetail isGerman={this.props.isGerman} info={info} />}/>
          <Route path="/events" render={(info)=><EventsList isGerman={this.props.isGerman} info={info}/>}/>
          <Route path="/person/servicehistory" render={()=><PersonService isGerman={this.props.isGerman} />}/>
          <Route path="/person/eventDetail/:id" render={(info)=><PersonalEventDetail isGerman={this.props.isGerman} info={info}/>}/>
          <Route path="/person/events" render={()=><PersonEvents isGerman={this.props.isGerman} />}/>
          {/* <Route path="/person/editprocess" render={()=><EditProcess isGerman={this.props.isGerman} />}/> */}
          


          {/* <Route path="/life" render={()=><Life isGerman={this.props.isGerman}/>}/> */}
          {/* <Route path="/purpose" render={()=><Purpose isGerman={this.props.isGerman}/>}/> */}
          {/* <Route path="/team" render={()=><Team isGerman={this.props.isGerman}/>}/> */}
          {/* <Route path="/contact" render={()=><Contact isGerman={this.props.isGerman}/>}/> */}
          {/* <Route path="/registration" render={()=><Registration isGerman={this.props.isGerman}/>}/> */}
          <Route path="/signup" render={()=><Signup isGerman={this.props.isGerman}/>}/>
          <Route path="/login" render={()=><Login isGerman={this.props.isGerman}/>}/>
          <Route path="/createEvent" render={(info)=><CreateEvent isGerman={this.props.isGerman} info={info}/>}/>
          {/* <Route path="/user/personalMission" render={()=><PersonalMission/>}/> */}
          {/* <Route path="/googleCalendar" render={()=><GoogleCalendar/>}/> */}
         
          
          {/* <Route path="/service" render={()=><Service isGerman={this.props.isGerman}/>}/> */}
          {/* <Route path="/missions" render={()=><MissionList/>}/> */}

          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}
