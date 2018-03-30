import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader'
import Users from './components/users';
import './css/base.scss'

const route = () => {
  return (
    <Router>
      <div>
        <Route exact path='/' component={Users}/>
      </div>
    </Router>
  )
}

export default hot(module)(route)
