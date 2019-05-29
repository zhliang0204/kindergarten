import React, { Component } from 'react';
import api from "../../api";
import { Table, Button } from 'reactstrap';

export default class ChildrenList extends Component {
  constructor(props){
    super(props)
    this.state = {
      children: ""
    }
  }

  loadChildren(){
    api.getAllChildren()
       .then(res => {
         console.log(res)
         this.setState({
           children:res
         })

         console.log(this.state.children)
       })
  }

  showChildDetail(childId){
    // e.preventDefault();
    // e.stopPropagation();
    // let childId = e
    this.props.info.history.push("/child/detail/"+childId)
    
  }

  componentDidMount(){
    this.loadChildren()
  }

  addChild(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.info.history.push("/createChild")
  }

  render() {
    return (
      <div>
      {this.props.langTab ==="lang1" && (<div className="german">building......</div>)}
      {this.props.langTab ==="lang2" && (<div className="simple-Chinese">building......</div>)}
      {this.props.langTab ==="lang3" && (<div className="traditional-Chinese">building......</div>)}

      {this.props.langTab ==="lang4" && (<div className="english">
        <div className="btn-click" onClick={(e)=>this.addChild(e)}><i className="fas fa-plus-circle"></i>Add Child</div>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.children  && (
              this.state.children.map((cur, i) =>(
                <tr key={cur._id} id={cur._id} onClick={()=>this.showChildDetail(cur._id)}>
                  <th scope="row">{i+1}</th>
                  <td>{cur.firstname}</td>
                  <td>{cur.state}</td>
                </tr>
              ))
            )}
            
            
          </tbody>
        </Table>

        </div>)}
      </div>
    )
  }
}
