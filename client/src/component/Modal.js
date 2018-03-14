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
    open: false,
    title:'',
    body:''
    
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  addPost = () => {

   
      fetch('http://localhost:3001/api/post/add',
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.title,
          postBody: this.state.body,
          username:localStorage.getItem('username'),
        }),
      })
          .then(response => response.json())
          .then(() => {
            alert('Posted successfully');
            this.setState({open: false});
          })
          .catch(() => {
          
          });

    

   
  };
  render() {



    const buttonStyle = {
        backgroundColor: 'white',
        color: 'black',
        margin:10,
        display:'inline'
      };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.addPost}
      />,
    ];

    return (
      <div style={{display:'inline'}}>
        <FlatButton
        label="Add Post"
        primary={true}
        style={buttonStyle}
        onClick={this.handleOpen}
        buttonStyle={{display:'inline'}}
      />,
        <Dialog
          title="Write a blog"
          actions={actions}
          modal={true}
          open={this.state.open}
         >
         <form action="/" method="POST" onSubmit={(e) => { e.preventDefault(); alert('Submitted form!'); this.handleClose(); } }>
         
         <div style={{display:'block'}}>
          <TextField name="title" 
           value={this.state.title}
           onChange={e => this.setState({ title: e.target.value })}
          hintText="Title" />
         </div>
         
         <div style={{display:'block'}}>
          
          <TextField
          hintText="Write something....."
          multiLine={true}
          rows={2}
          rowsMax={4}
          value={this.state.body}
          onChange={e => this.setState({ body: e.target.value })}
          />
        </div>
        </form>
        </Dialog>
      </div>
    );
  }
}