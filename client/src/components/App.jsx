import React, { Component } from 'react';
// import { Route, Link, NavLink, Switch } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import NavBar from './pages/NavBar';


export default class App extends Component {
  constructor(props) {
    super(props)
    // this.toggle = this.toggle.bind(this)
    this.state = {
      isGerman: true,
      dropdownOpen: false,
      langTab:"lang1",
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
    this.setState({
      langTab: e.target.id,
      dropdownOpen : !this.state.dropdownOpen
    })
    console.log(this.state.langTab)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title">
            <h3>
              德国第一所中德双语幼儿园<br/>
              Deutsch-Chinesischer Kindergarten
            </h3>
            <div className="lang-flag">
              <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>
                  <DropdownToggle
                    tag="span"
                    onClick={() =>this.toggle()}
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                  >
                    {this.state.langTab ==="lang1" && (<span><i className="fas fa-globe"></i>De</span>)}
                    {this.state.langTab ==="lang2" && (<span><i className="fas fa-globe"></i>简中</span>)}
                    {this.state.langTab ==="lang3" && (<span><i className="fas fa-globe"></i>繁中</span>)}
                    {this.state.langTab ==="lang4" && (<span><i className="fas fa-globe"></i>En</span>)}

                   
                  </DropdownToggle>
                  <DropdownMenu right style={{minWidth:"5rem",position: "absolute",willChange: "transform",top: "0px",left: "0px",transform: "translate3d(-46px, 23px, 0px)"}}>
                    <DropdownItem style={{margin:"0",padding:"1px", textAlign:"center"}} id="lang1" onClick={(e) =>this.handleLanguage(e)}>Deutsch</DropdownItem>
                    <DropdownItem style={{margin:"0",padding:"1px", textAlign:"center"}} id="lang2" onClick={(e) =>this.handleLanguage(e)}>简体中文</DropdownItem>
                    <DropdownItem style={{margin:"0",padding:"1px", textAlign:"center"}} id="lang3" onClick={(e) =>this.handleLanguage(e)}>繁體中文</DropdownItem>
                    <DropdownItem style={{margin:"0",padding:"1px", textAlign:"center"}} id="lang4" onClick={(e) =>this.handleLanguage(e)}>English</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>          
          </div>
          <NavBar langTab={this.state.langTab}/>   
        </header>
      </div>
    );
  }
}