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
      personalVote:0
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
           personalVote = ""
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
    } else {
      supportTag = <i className="far fa-thumbs-up"></i>
      opposeTag = <i className="fas fa-thumbs-down"></i>
     
    }

    

    return (
      <div className="vote">
        {/* <h3>Vote Result</h3> */}

        {this.state.isVoted === true && (<div>
          <div>
            {/* {this.state.persoanlVote == 1? (<i className="fas fa-thumbs-up"></i>):(<i className="far fa-thumbs-up"></i>)} */}
            {supportTag}
            {this.state.support}
          </div>
          <div>
            {/* {this.state.persoanlVote == -1? (<i className="fas fa-thumbs-down"></i>):( <i className="far fa-thumbs-down"></i>)} */}
            {opposeTag}
            {this.state.oppose}
          </div>
        </div>)}


        {this.state.isVoted === false && (<div>
          <div onClick={(e) => this.handleSupport(e)}>
            <i className="far fa-thumbs-up"></i>
            {/* <i onClick={(e) => this.handleSupport(e)} className="far fa-thumbs-up"></i> */}

            {this.state.support}
          </div>

          <div onClick={(e) => this.handleOppose(e)}>
            <i class="far fa-thumbs-down"></i>
            {this.state.oppose}
          </div>

        </div>)}


        {/* {this.state.votes.length > 1 && this.state.isVoted === false && (<div> */}
        {/* { this.state.isVoted === false && (<div>

          <div onClick={() => this.handleSupport()}>
            <i class="far fa-thumbs-up"></i>
            {this.state.votes[1].total}
          </div>
          <div  onClick={() => this.handleOppose()}>
            <i class="far fa-thumbs-down"></i>
            {this.state.votes[0].total}
          </div>
        </div>)}



        {this.state.votes.length > 1 && (<div>
          <div><i class="far fa-thumbs-up"></i> {this.state.votes[1].total}</div>
          <div><i class="far fa-thumbs-down"></i> {this.state.votes[0].total}</div>
        </div>)}

        {this.state.votes.length === 1 && (<div>
          {this.state.votes[0]._id === 1? 
            (<div><div><i class="far fa-thumbs-up"></i> Support:{this.state.votes[0].total}</div><div><i class="far fa-thumbs-down"></i>Oppose:0</div></div>):
            (<div><div><i class="far fa-thumbs-up"></i> Support:0</div><div><i class="far fa-thumbs-down"></i>Oppose:{this.state.votes[0].total}</div></div>) }
        </div>)}

        {this.state.votes.length === 0 && (<div>
          <div><i class="far fa-thumbs-up"></i> Support:0</div>
          <div><i class="far fa-thumbs-down"></i> Oppose:0</div>
        </div>)}

        <h3>Your Vote</h3>
        {this.state.isVoted && (<div>
          {this.state.persoanlVote.voted === 1? (<div><i class="far fa-thumbs-up"></i>Support</div>):(<div><i class="far fa-thumbs-down"></i>Oppose</div>)}
        </div>)}

        {!this.state.isVoted && this.props.tag === 1 && (<div>
          <div>click to vote:</div>
          <Button id="support" onClick={(e)=>this.postVote(e)}><i class="far fa-thumbs-up"></i>support</Button>
          <Button id="oppose" onClick={(e)=>this.postVote(e)}>opppse</Button>
        </div>)} */}

      </div>
    )
  }
}
