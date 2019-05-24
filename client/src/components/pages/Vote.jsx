import React, { Component } from 'react';
import { 
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} 
from 'reactstrap';
import api from "./../../api";

export default class Vote extends Component {
  constructor(props){
    super(props)
    this.state = {
      isVoted:null,
      support:0,
      oppose:0,
      event:this.props.event,
      personalVote:0,
      isVoteSt:this.props.event.eventState
    }
  }


  loadVote(id){
    let support;
    let oppose;
    let isVoted;
    let personalVote;

    let p1 = api.getPositiveVote(id)
      .then(positive => {
        console.log("----positive----")
        console.log(positive)
        support = positive
      })

    let p2 = api.getNegtiveVote(id)
       .then(negtive => {
        console.log("----negtive----")
        console.log(negtive)
         oppose = negtive
       })
    
    let p3 = api.getPersonalVote(id)
       .then(psvote => {
        console.log("----psVote----")
        console.log(psvote)
         if(psvote.length === 0){
           isVoted = false
           personalVote = 0
         } else {
           isVoted = true
           personalVote = psvote[0].voted
         }
       })

    Promise.all([p1, p2, p3])
           .then(res => {
             this.setState({
               support:support,
               oppose:oppose,
               isVoted:isVoted,
               personalVote:personalVote,
             })
             console.log(this.state)
           })
  }



  handleSupport(e){
    let eventId = this.props.event._id;
    console.log(e.target)
    
    // let perVote
    let voteinfo = {
      voted:1
    }

    

    api.postPersonalVote(eventId, voteinfo)
        .then(per => {
         console.log("----post votes-----")
         console.log(per)
         let curVote = this.state.support + 1
         this.setState({
          isVoted:true,
          personalVote:1,
          support:curVote,
        })
    
        console.log(this.state)
        })
  }

  handleOppose(e){
    let eventId = this.props.event._id;
    console.log(e.target)
    // let perVote
    let voteinfo = {
      voted:-1
    }

    console.log(this.state)

    api.postPersonalVote(eventId, voteinfo)
        .then(per => {
         console.log("----post votes-----")
         console.log(per)
         let curVote = this.state.oppose + 1
         this.setState({
          isVoted:true,
          personalVote:-1,
          oppose:curVote,
        })
        })
  }
  

  componentDidMount(){
    let eventId = this.state.event._id;
    this.loadVote(eventId)
    // this.loadUserVoteInfo(eventId)
    console.log("------vote----component-------")
    console.log(this.state.event)
    console.log(this.state.isVoted)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.event !== prevProps.event) {
      this.loadVote(this.props.event._id)
      // this.loadUserVoteInfo(this.props.event._id)
    }
    console.log("-----vote ----- match------")
    console.log(this.props.event._id)
  }

  render() {
    let supportTag
    let opposeTag
    if(this.state.personalVote == 1){
      supportTag = <i className="fas fa-thumbs-up"></i>
      opposeTag = <i className="far fa-thumbs-down"></i>
    }
    if(this.state.personalVote == -1) {
      supportTag = <i className="far fa-thumbs-up"></i>
      opposeTag = <i className="fas fa-thumbs-down"></i>
    }

    if(this.state.personalVote == 0){
      supportTag = <i className="far fa-thumbs-up"></i>
      opposeTag = <i className="far fa-thumbs-down"></i>
    }

    

    return (
      <div className="vote">
        {/* <h3>Vote Result</h3> */}

        {(this.state.isVoted === true|| this.state.isVoteSt !== "vote") && (<div className="vote-detail">
          <div className="sub-vote-detail">
            {/* {this.state.persoanlVote == 1? (<i className="fas fa-thumbs-up"></i>):(<i className="far fa-thumbs-up"></i>)} */}
            {supportTag}
            {this.state.support}
          </div>
          <div className="sub-vote-detail">
            {/* {this.state.persoanlVote == -1? (<i className="fas fa-thumbs-down"></i>):( <i className="far fa-thumbs-down"></i>)} */}
            {opposeTag}
            {this.state.oppose}
          </div>
        </div>)}


        {this.state.isVoted === false && this.state.isVoteSt === "vote" && (<div  className="vote-detail">
          <div className="sub-vote-detail" onClick={(e) => this.handleSupport(e)}>
            <i className="far fa-thumbs-up"></i>
            {/* <i onClick={(e) => this.handleSupport(e)} className="far fa-thumbs-up"></i> */}

            {this.state.support}
          </div>

          <div className="sub-vote-detail" onClick={(e) => this.handleOppose(e)}>
            <i className="far fa-thumbs-down"></i>
            {this.state.oppose}
          </div>

        </div>)}

      </div>
    )
  }
}
