import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import '../App.css';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Modal from './Modal';
import AppBar from 'material-ui/AppBar';
import { Link, browserHistory } from 'react-router';
import Register from './Register';
import SearchBar from 'material-ui-search-bar'


class Home extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      signInError: false,
      showNotificationSnackbar: false,
      notificationSnackbarText: '',
      userArray:[],
      search:'',

    };
  
  }

  componentWillMount=()=>
  {
    if(localStorage.getItem('username')==null)
    {
      browserHistory.push({
        pathname: '/'
      });
    }
   
    fetch('http://localhost:3001/api/users',
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
         this.setState({userArray:response});
        console.log(this.state.userArray)
          
        })
        .catch(() => {
        
        });
  }


  logout=()=>{
    
 localStorage.removeItem('username');
 fetch('http://localhost:3001/api/logout',
 {
   credentials: 'include',
   method: 'GET',
   headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
   },
 })
     .then(response => response.json())
     .then(() => {
      browserHistory.push({
         pathname: '/'
       });
     })
     .catch(() => {
     
     });


  }

  renderPerson(person, index) {
    return (
      <tr key={index}>
        <td>{person.username}</td>
        <td>{person.email}</td>
        <td>{person.phone}</td>
      </tr>
    )
  }

  render() {
    const buttonStyle = {
      backgroundColor: 'white',
      color: 'black',
      margin:10,
      display: 'inline',
    };
    return (
      <div>

      <AppBar
          style={{position:'fixed',top:'0'}}
          title="PostMAN"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
           
          iconElementRight={
      <div className="appBarIcons">
           <SearchBar    
      onChange={() => console.log('onChange')}
      onRequestSearch={() => {

        
      }}
      style={{
        margin: '0 auto',
        float:'left'
      }}
    />    
          <Modal  />
          <Link to="/Posts" style={{ textDecoration: 'none' }}><FlatButton style={buttonStyle} label="ShowPosts" /></Link>
          <FlatButton style={buttonStyle} label="Logout" onClick={this.logout.bind()}/>
      </div>     
         }
         />
     
     <div>
       {this.props.children}
       </div>
      </div>
    );
  }
}

export default Home;
