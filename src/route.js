import { BrowserRouter, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader'
import { Provider } from 'mobx-react';
import store from './store'

import Users from './components/users';
import Events from './components/events';

import './css/base.scss'

const route = () => {
  return (
    <Provider userStore={store}>
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Users}/>
          <Route exact path='/events' component={Events}/>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default hot(module)(route)
