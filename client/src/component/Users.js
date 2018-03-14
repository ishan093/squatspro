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



class Users extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      signInError: false,
      showNotificationSnackbar: false,
      notificationSnackbarText: '',
      userArray:[],
      arr:[],
      search:'',

    };
  
  }

  componentWillMount=()=>
  {
    
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
         this.setState({arr:response});
        console.log(this.state.userArray)
          
        })
        .catch(() => {
        
        });
  }


 search=()=>
 {

 }

  renderPerson(person, index) {
    return (
      <tr key={index}>
        <td> <Link to={`/Posts/${person.username}`}>{person.username}</Link></td>
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
     <SearchBar    
      onChange={(value) =>this.setState({search:value})}
      onRequestSearch={() => {
       if(this.state.search=='')
       {
         this.setState({userArray:this.state.arr})
       }
       else
       {
        var search=this.state.search
        var newarr=  this.state.arr.filter(function(obj) {
            return obj.username == search;
          });
  
          this.setState({userArray:newarr});
       }
     
       }}
      style={{
        left:500,
        position:'relative',
        maxWidth: 800,
        width:500,
        top:100,
        margin: '30 auto',
      }}
    /> 
     
     <table className="table">
    <thead className="thead-dark">
      <tr>
        <th>USERNAME</th>
        <th>EMAIL</th>
        <th>PHONE</th>
      </tr>
    </thead>
    <tbody>
       {this.state.userArray.map(this.renderPerson.bind(this))}
    </tbody>
  </table>
      </div>
    );
  }
}

export default Users;
