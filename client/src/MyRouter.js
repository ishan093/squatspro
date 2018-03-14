import React from 'react';
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';
import ShowPost from './component/ShowPost';
import ShowUserPost from './component/ShowUserPost';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import UserInfo from './component/Users'



class MyRouter extends React.Component{
    render(){
        return(


            <Router  history={browserHistory}>
              <Route path='/' component={Login} />              
              <Route path='/Register' component={Register} />
              <Route path='/Home' component={Home} >   
                  <IndexRoute path='/' component={UserInfo} />                   
                  <Route path='/Posts' component={ShowPost} />                  
                  <Route path='/Posts/:id' component={ShowUserPost} />    
              </Route>
         </Router>
          
        );
    }
}

export default MyRouter;
