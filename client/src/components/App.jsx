import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import NavBar from './pages/NavBar';
import Home from './pages/Home';
import Purpose from './pages/Purpose';
import Registration from './pages/Registration';
import Contact from './pages/Contact';
import Service from './pages/Service';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import chpng from './../styles/images/cn.png';
import depng from './../styles/images/de.png'

export default class App extends Component {
  constructor(props) {
    super(props)
    // this.toggle = this.toggle.bind(this)
    this.state = {
      isGerman: true,
      dropdownOpen: false,
    }
  }

  toggle(){
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  // handleLogoutClick(e) {
  //   api.logout()
  // }

  handleLanguage(e){
    let res = e.target.id;
    var result;
    if(res === "lang3" || res === "lang2"){
      result = false
    } else {
      result = true
    }
    // console.log(res)
    this.setState({
      isGerman:result,
      dropdownOpen : !this.state.dropdownOpen
    })
    console.log(this.state.isGerman)
  }


  componentDidMount(){
    console.log(this.state.isGerman)
    console.log("did mount")
    console.log(this.props)
  }

  componentDidUpdate(){
    console.log("update")
    console.log(this.state.isGerman)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title">
            <h1>
              德国第一所中德双语幼儿园<br/>
              Deutsch-Chinesischer Kindergarten
            </h1>
            <div className="lang-flag">
              <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>
                  <DropdownToggle
                    tag="span"
                    onClick={() =>this.toggle()}
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                  >
                    <i class="fas fa-globe">De</i>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem id="lang1" onClick={(e) =>this.handleLanguage(e)}>Deutsch</DropdownItem>
                    <DropdownItem id="lang2" onClick={(e) =>this.handleLanguage(e)}>简体中文</DropdownItem>
                    <DropdownItem id="lang3" onClick={(e) =>this.handleLanguage(e)}>繁体中文</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>          
          </div>
          <NavBar isGerman={this.state.isGerman}/>   
        </header>
      </div>
    );
  }
}