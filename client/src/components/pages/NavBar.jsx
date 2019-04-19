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
import Life from './Life';
import Purpose from './Purpose';
import Registration from './Registration';
import Contact from './Contact';
import Service from './Service';
import Login from './Login';
import Signup from './Signup';
import MissionList from './MissionList';



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
        <Navbar expand="md">
          <NavbarBrand href="/">Home</NavbarBrand> 
          <NavbarToggler onClick={this.toggle} />
          
          <Collapse isOpen={this.state.isOpen} navbar> 
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to="/">{this.props.isGerman? 'Home':'主页'}</NavLink>
              </NavItem>
              <NavItem>
                {!api.isLoggedIn() && <NavLink to="/life">{this.props.isGerman? 'Kitaleben':'幼儿园生活'}</NavLink>}
              </NavItem>
              <NavItem>
                {!api.isLoggedIn() && <NavLink to="/purpose">{this.props.isGerman? 'Konzept':'办园心声'}</NavLink>}
              </NavItem>
              <NavItem>
                {!api.isLoggedIn() && <NavLink to="/registration">{this.props.isGerman? 'Anmeldung':'登记入园'}</NavLink>}
              </NavItem>
              <NavItem>
                {api.isLoggedIn() && <NavLink to="/signup">{this.props.isGerman? 'Benutzer Erstellen': '创建用户'}</NavLink>}
              </NavItem> 
              <NavItem>
                {!api.isLoggedIn() && <NavLink to="/login">{this.props.isGerman? 'Login':'登陆'}</NavLink>}
              </NavItem> 
              <NavItem>
                {!api.isLoggedIn() && <NavLink to='/service'>{this.props.isGerman? 'Elternservice':"家长服务"}</NavLink>}
              </NavItem> 
              <NavItem>
                {!api.isLoggedIn() && <NavLink to="/contact">{this.props.isGerman? 'Kontakt':'联系我们'}</NavLink>}
              </NavItem>  
              <NavItem>
                {api.isLoggedIn() && <NavLink to="/missions">{this.props.isGerman? 'Missions':'任务列表'}</NavLink>}
              </NavItem>
              <NavItem>
                {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
              </NavItem> 
           
            </Nav>
          </Collapse>
        </Navbar>

        <Switch>
          <Route path="/" exact render={()=><Home isGerman={this.props.isGerman}/>}/>
          <Route path="/life" render={()=><Life isGerman={this.props.isGerman}/>}/>
          <Route path="/purpose" render={()=><Purpose isGerman={this.props.isGerman}/>}/>
          <Route path="/contact" render={()=><Contact isGerman={this.props.isGerman}/>}/>
          <Route path="/registration" render={()=><Registration isGerman={this.props.isGerman}/>}/>
          <Route path="/signup" render={()=><Signup isGerman={this.props.isGerman}/>}/>
          <Route path="/login" render={()=><Login isGerman={this.props.isGerman}/>}/>
          <Route path="/service" render={()=><Service isGerman={this.props.isGerman}/>}/>
          <Route path="/missions" render={()=><MissionList/>}/>

          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}
