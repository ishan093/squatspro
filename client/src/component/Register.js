import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link, browserHistory } from 'react-router';


class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email:'',
      phone:'',
      registerErrorUser: false,
      registerErrorEmail:false,
      registerErrorPhone:false,
    };
  }

//Register user, if successfull then redirect to chat page
  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.registerErrorEmail==false && this.state.registerErrorPhone==false)
    {
      fetch('http://localhost:3001/api/register',
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
          phone: this.state.phone,
          email: this.state.email,
        }),
      })
          .then(response => response.json())
          .then(responseJson => {
            localStorage.setItem('username',responseJson.username);
             browserHistory.push({
            pathname: '/Home',
            state: {
              username: responseJson.username,
            },
          });
          })
          .catch(() => {
            this.setState({ registerError: true });
          });

    }
  }

  //check if username is already present or not

  onBlur = () => {
    fetch(`http://localhost:3001/api/register/${this.state.username}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
            .then(response => response.json())
            .then((responseJson) => {
              this.setState({ registerErrorUser: responseJson.alreadyInUse });
            })
            .catch(() => {

            });
  }

//validate email  
onemail=(value)=>
{
 var emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
 var valid = emailValid ? this.setState({ registerErrorEmail:false  }) :this.setState({ registerErrorEmail:true  });
}

//validate phone number
onphone=(value)=>
{
 var phonevalid = value.match(/^(\+\d{1,3}[- ]?)?\d{10}$/);
 var valid = phonevalid ? this.setState({ registerErrorPhone:false  }) :this.setState({ registerErrorPhone:true  });
}




  render() {
    return (
     <div>
      <div className="ChooseNickDialogContainer">


        <div className="ChooseNickDialog">
          <form onSubmit={this.onSubmit}>
            <TextField
              fullWidth
              autoFocus
              hintText="Username"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
              onBlur={this.onBlur}
              errorText={this.state.registerErrorUser && 'Username is already in use. Please choose another.'}
            />
            <TextField
              type="password"
              fullWidth
              hintText="Password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              required
            />
             <TextField
              fullWidth
              hintText="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              errorText={this.state.registerErrorEmail && 'Invalid Email Format'}
              onBlur={e=>this.onemail(e.target.value)}
              required
            />


             <TextField
              fullWidth
              hintText="Phone No"
              value={this.state.phone}
              valueType={Number}
              onChange={e => this.setState({ phone: e.target.value })}
              errorText={this.state.registerErrorPhone && 'Invalid Phone Format'}
              onBlur={e=>this.onphone(e.target.value)}
              required

            />
            <RaisedButton
              type="submit"
              disabled={false}
              fullWidth
              label="Register"
              backgroundColor='#3b5998'
              labelColor	='white'
            />
          </form>
          <br/>
          <p>or <Link to="/">login with an existing account</Link></p>
        </div>
      </div>
      </div>
    );
  }
}

export default Register;
