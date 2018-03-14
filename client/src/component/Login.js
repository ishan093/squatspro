import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import '../App.css';
import { Link, browserHistory } from 'react-router';
//background-image: url(https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Background.2e16d0ba.fill-1422x800.jpg);
class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      signInError: false,
      showNotificationSnackbar: false,
      notificationSnackbarText: '',

    };

  }

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({ signInError: false });

    if (this.state.username.length >= 1 && this.state.password.length >= 1) this.authenticate();
  }

  authenticate = () => fetch('http://localhost:3001/api/login',
    {
        
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
        .then(response => response.json())
        .then((responseJson) => {
          localStorage.setItem('username',responseJson.username);
          browserHistory.push({
            pathname: '/Home',
            state: {
              username: responseJson.username,
            },
          });
        })
        .catch(() => {
          this.setState({ signInError: true });
        })


  componentWillMount() {
    if (this.props.location.state) {
      if (this.props.location.state.message) {
        this.setState({ showNotificationSnackbar: true, notificationSnackbarText: this.props.location.state.message });
      }
    }
  }

  handleErrorSnackbarRequestClose = () => {
    this.setState({
      showNotificationSnackbar: false,
      notificationSnackbarText: '',
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
      
        <div className="ChooseNickDialogContainer">
          <p></p>
          <br/>
          <br/>
          <br/>
          <br/>


          <div className="ChooseNickDialog">
            <form onSubmit={this.onSubmit}>
              <TextField
                fullWidth
                autoFocus
                hintText="Username"
                value={username}
                onChange={e => this.setState({ username: e.target.value })}
              />
              <TextField
                type="password"
                fullWidth
                hintText="Password"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                errorText={this.state.signInError && "Username and/or password doesn't match"}
              />
              <RaisedButton
                type="submit"
                disabled={false}
                fullWidth
                label="Login"
                backgroundColor='#3b5998'
                labelColor	='white'
              />
            </form>
              <br/>
            <p><Link to="/register">Sign Up for App</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
