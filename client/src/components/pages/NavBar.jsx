import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
 } from 'reactstrap';

import { Route, Link, NavLink, Switch } from 'react-router-dom';
import api from './../../api';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import CreateEvent from './CreateEvent';
import CreateUser from "./CreateUser"
// import CreateUser from "./CreateUser";
import UserActive from './UserActive';
import SetPassword from "./SetPasswrod";
import EventsList from "./EventsList";
import EventDetail from "./EventDetail";
import PersonService from "./PersonService";
import PersonEvents from "./PersonEvents";
// import EditProcess from "./EditProcess";
import PersonalEventDetail from "./PersonalEventDetail";
import logo from "./../../styles/images/Home.png"



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

  componentDidMount(){
    console.log(this.props)
  }

  render() {
    return (
      <div className="Kg-navbar">
        <Navbar expand="md" color="faded" light>
          <NavbarBrand href="/"><img src={logo} style={{width:"auto", height:"30px"}}/></NavbarBrand> 
          {/* <NavbarBrand><img src={logo} style={{width:"auto", height:"30px"}}/></NavbarBrand>  */}

          <NavbarToggler onClick={this.toggle} className="mr-2" />
          
          <Collapse isOpen={this.state.isOpen} navbar> 
          
            <Nav className="ml-auto" navbar>

              <NavItem>
                {!api.isLoggedIn() && <NavLink to="/login">
                  {this.props.langTab === "lang1" && "Anmeldung"}
                  {this.props.langTab === "lang2" && "登陆"}
                  {this.props.langTab === "lang3" && "登陸"}
                  {this.props.langTab === "lang4" && "Login"}
                </NavLink>}
              </NavItem> 

              <NavItem>
                {api.isLoggedIn() && <NavLink to="/events">
                  {this.props.langTab === "lang1" && "Aufgabe"}
                  {this.props.langTab === "lang2" && "任务"}
                  {this.props.langTab === "lang3" && "任務"}
                  {this.props.langTab === "lang4" && "Task"}
                </NavLink>}
              </NavItem>

              
              <NavItem>
                {api.isLoggedIn() && api.getLocalStorageUser().role !=="parent" && <NavLink to="/createfamily">
                  {this.props.langTab === "lang1" && "Nutzer"}
                  {this.props.langTab === "lang2" && "用户"}
                  {this.props.langTab === "lang3" && "用戶"}
                  {this.props.langTab === "lang4" && "User"}
                </NavLink>}
              </NavItem> 

              <NavItem>
                {api.isLoggedIn() && <NavLink to="/person/servicehistory">
                  {this.props.langTab === "lang1" && "Arbeitsstatistik"}
                  {this.props.langTab === "lang2" && "工作统计"}
                  {this.props.langTab === "lang3" && "工作統計"}
                  {this.props.langTab === "lang4" && "Work Statistics"}               
                </NavLink>}
              </NavItem>

              <NavItem>
                {api.isLoggedIn() && <NavLink to="/person/events">
                  {this.props.langTab === "lang1" && "Aufgabenkalender"}
                  {this.props.langTab === "lang2" && "任务日历"}
                  {this.props.langTab === "lang3" && "工作統計"}
                  {this.props.langTab === "lang4" && "Task calendar"} 
                </NavLink>}
              </NavItem>

              <NavItem>
                {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>
                {this.props.langTab === "lang1" && "Ausloggen"}
                  {this.props.langTab === "lang2" && "退出"}
                  {this.props.langTab === "lang3" && "退出"}
                  {this.props.langTab === "lang4" && "logout"}
                </Link>}
              </NavItem> 
           
            </Nav>
          </Collapse>
        </Navbar>

        <Switch>
          <Route path="/" exact render={(info)=><Home langTab={this.props.langTab} info={info}/>}/>
          {/* <Route path="/createuser" render={(info)=><CreateUser langTab={this.props.langTab} info={info}/>}/> */}
          <Route path="/createfamily" render={()=><CreateUser langTab={this.props.langTab} />}/>
          <Route path="/active/:id" render={(info)=><UserActive langTab={this.props.langTab} info={info} />}/>
          <Route path="/setpassword/:id" render={(info)=><SetPassword langTab={this.props.langTab} info={info} />}/>
          <Route path="/events/detail/:id" render={(info)=><EventDetail langTab={this.props.langTab} info={info} />}/>
          <Route path="/events" render={(info)=><EventsList langTab={this.props.langTab} info={info}/>}/>
          <Route path="/person/servicehistory" render={()=><PersonService langTab={this.props.langTab} />}/>
          <Route path="/person/eventDetail/:id" render={(info)=><PersonalEventDetail langTab={this.props.langTab} info={info}/>}/>
          <Route path="/person/events" render={()=><PersonEvents langTab={this.props.langTab} />}/>
          <Route path="/signup" render={()=><Signup langTab={this.props.langTab}/>}/>
          <Route path="/login" render={()=><Login langTab={this.props.langTab}/>}/>
          <Route path="/createEvent" render={(info)=><CreateEvent langTab={this.props.langTab} info={info}/>}/>
          <Route render={() => <h2 style={{textAlign:"center"}}>404</h2>} />
        </Switch>
      </div>
    );
  }
}
