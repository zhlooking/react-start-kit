import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import UserStore from './store/user-store'
import Users from './components/users'
import Events from './components/events'
import './css/base.scss'

const userStore = new UserStore()

const route = () => (
  <Provider userStore={userStore}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Users} />
        <Route exact path="/events" component={Events} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default hot(module)(route)
