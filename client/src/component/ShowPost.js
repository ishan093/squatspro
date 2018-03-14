import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class DialogExampleModal extends React.Component {



  state = {
   blogs:[]
    
  };

  componentWillMount=()=>
  {
    
    fetch('http://localhost:3001/api/post/get',
    {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then((response) => {
          console.log(response)
         this.setState({blogs:response});
          
        })
        .catch(() => {
        
        });
  }
 

  
  renderPost(blog, index) {
    return (

        <div class="card">
        <div class="card-header">
       <h4> {blog.title}</h4>
        </div>
        <div class="card-body">{blog.body}</div> 
        <div class="card-footer">by {blog.username}</div>
      </div>

    )
  }
  render() {

    return (
     <div>

<div className="box">
   {this.state.blogs.map(this.renderPost.bind(this))}
</div>


      </div>
    );
  }
}