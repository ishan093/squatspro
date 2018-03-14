import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyRouter from './MyRouter'
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


ReactDOM.render(
    //defing our browser routes
    <MuiThemeProvider>
        <MyRouter />
    </MuiThemeProvider>
    ,
    document.getElementById('root')
)

registerServiceWorker();
