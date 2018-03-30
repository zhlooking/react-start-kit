import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Users from './components/users';
import './css/base.scss'

ReactDom.render((
  <Router>
    <div>
      <Route exact path='/' component={Users} />
    </div>
  </Router>
), document.getElementById('root'));
