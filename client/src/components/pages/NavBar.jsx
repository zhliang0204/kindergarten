import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import PersonHistoryServiceList from './PersonHistoryServiceList';
import EditEventDetailOrg from './EditEventDetailOrg';
import TaskHistoryAnalyze from "./TaskHistoryAnalyze";
import TaskCurrentAnalyze from "./TaskCurrentAnalyze";
import CreateChildNew from "./CreateChildNew";
import CreateOrBindFather from "./CreateOrBindFather";
import CreateOrBindMother from "./CreateOrBindMother";
import ChildrenList from "./ChildrenList";
import ChildDetail from "./ChildDetail";



export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.subToggle = this.subToggle.bind(this);

    this.state = {
      isOpen: false,
      btnDropdown:false,
      analysisBtnDropdown:false,
      userManagementBtnDropdown:false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  subToggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
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

              {/* <NavItem>
                {api.isLoggedIn() && api.getLocalStorageUser().role !=="parent" && <NavLink to="/createfamily">
                  {this.props.langTab === "lang1" && "Nutzer"}
                  {this.props.langTab === "lang2" && "用户"}
                  {this.props.langTab === "lang3" && "用戶"}
                  {this.props.langTab === "lang4" && "User"}
                </NavLink>}
              </NavItem>  */}

              <NavItem>
                {api.isLoggedIn() && api.getLocalStorageUser().role !=="parent" && <NavLink to="/createChild">
                  {this.props.langTab === "lang1" && "New"}
                  {this.props.langTab === "lang2" && "新增"}
                  {this.props.langTab === "lang3" && "新增"}
                  {this.props.langTab === "lang4" && "Create"}
                </NavLink>}
              </NavItem> 

              {api.isLoggedIn() && api.getLocalStorageUser().role !=="parent" && (
                <UncontrolledDropdown direction="down" isOpen={this.state.userManagementBtnDropdown} toggle={() => { this.setState({ userManagementBtnDropdown: !this.state.userManagementBtnDropdown }); }} nav inNavbar>
                  <DropdownToggle nav caret style={{fontSize:"1rem", color:"gray"}}>
                        {this.props.langTab === "lang1" && "Nutze"}
                        {this.props.langTab === "lang2" && "用户"}
                        {this.props.langTab === "lang3" && "用戶"}
                        {this.props.langTab === "lang4" && "User"}
                  </DropdownToggle>
                  <DropdownMenu>
                  <DropdownItem>
                      <NavLink to="/chlidrenList">
                        {this.props.langTab === "lang1" && "Kind"}
                        {this.props.langTab === "lang2" && "儿童"}
                        {this.props.langTab === "lang3" && "兒童"}
                        {this.props.langTab === "lang4" && "Child"}             
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink to="/parentsList">
                      {this.props.langTab === "lang1" && "Elternteil"}
                      {this.props.langTab === "lang2" && "家长"}
                      {this.props.langTab === "lang3" && "家長"}
                      {this.props.langTab === "lang4" && "Parent"}               
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                       <NavLink to="/teachersList">
                      {this.props.langTab === "lang1" && "Lehrer"}
                      {this.props.langTab === "lang2" && "幼师"}
                      {this.props.langTab === "lang3" && "幼師"}
                      {this.props.langTab === "lang4" && "Teacher"}               
                      </NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              


              <NavItem>
                {api.isLoggedIn() && <NavLink to="/events">
                  {this.props.langTab === "lang1" && "Aufgabe"}
                  {this.props.langTab === "lang2" && "任务"}
                  {this.props.langTab === "lang3" && "任務"}
                  {this.props.langTab === "lang4" && "Task"}
                </NavLink>}
              </NavItem>
              
              {api.isLoggedIn() && (
                <UncontrolledDropdown direction="down" isOpen={this.state.analysisBtnDropdown} toggle={() => { this.setState({ analysisBtnDropdown: !this.state.analysisBtnDropdown }); }} nav inNavbar>
                <DropdownToggle nav caret style={{fontSize:"1rem", color:"gray"}}>
                  {this.props.langTab === "lang1" && "Analyse"}
                  {this.props.langTab === "lang2" && "分析"}
                  {this.props.langTab === "lang3" && "分析"}
                  {this.props.langTab === "lang4" && "analysis"}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                  <NavLink to="/historyAnalyze">
                    {this.props.langTab === "lang1" && "Geschichte"}
                    {this.props.langTab === "lang2" && "历史工作"}
                    {this.props.langTab === "lang3" && "歷史工作"}
                    {this.props.langTab === "lang4" && "History"}               
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink to="/currentAnalyze">
                    {this.props.langTab === "lang1" && "Statistikliste"}
                    {this.props.langTab === "lang2" && "当前工作"}
                    {this.props.langTab === "lang3" && "当前工作"}
                    {this.props.langTab === "lang4" && "Current"}               
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              )}




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
          <Route path="/person/servicestatistics" render={()=><PersonHistoryServiceList langTab={this.props.langTab} />}/>
          <Route path="/historyAnalyze" render={()=><TaskHistoryAnalyze langTab={this.props.langTab} />}/>
          <Route path="/currentAnalyze" render={()=><TaskCurrentAnalyze langTab={this.props.langTab} />}/>
          <Route path="/createChild" render={(info)=><CreateChildNew langTab={this.props.langTab} info={info}/>}/>
          <Route path="/createParent/father/:id" render={(info)=><CreateOrBindFather langTab={this.props.langTab} info={info}/>}/>
          <Route path="/createParent/mother/:id" render={(info)=><CreateOrBindMother langTab={this.props.langTab} info={info}/>}/>
          <Route path="/chlidrenList" render={(info)=><ChildrenList langTab={this.props.langTab} info={info}/>}/>
          <Route path="/child/detail/:id" render={(info)=><ChildDetail langTab={this.props.langTab} info={info}/>}/>



          

          <Route path="/person/eventDetail/:id" render={(info)=><PersonalEventDetail langTab={this.props.langTab} info={info}/>}/>
          <Route path="/person/editProEvent/:id" render={(info)=><EditEventDetailOrg langTab={this.props.langTab} info={info}/>}/>

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
