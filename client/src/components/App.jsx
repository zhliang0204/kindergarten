import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
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
    this.state = {
      isGerman: true,
    }
  }

  // handleLogoutClick(e) {
  //   api.logout()
  // }

  handleLanguage(e){
    let res = e.target.alt === "Chinese" ? false: true;
    // console.log(res)
    this.setState({
      isGerman:res,
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
              <img src={chpng} alt="Chinese" onClick = {(e)=>this.handleLanguage(e)}/>
              <img src={depng} alt="German" onClick = {(e)=>this.handleLanguage(e)}/>
              </div>
            </div>          
          </div>
          <NavBar isGerman={this.state.isGerman}/>   
        </header>
      </div>
    );
  }
}