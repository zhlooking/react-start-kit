import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import UserStore from '../store/user-store'
import '../css/users.scss'

@inject('userStore')
@observer
export default class Users extends React.Component {
  static propTypes = {
    userStore: PropTypes.instanceOf(UserStore).isRequired,
  }

  filter = (evt) => {
    this.props.userStore.filter = evt.target.value
  }

  createNew = (evt) => {
    if (evt.which === 13) {
      this.props.userStore.createUser(evt.target.value)
      // eslint-disable-next-line
      evt.target.value = ''
    }
  }

  render() {
    const { filteredUsers, filter } = this.props.userStore

    return (
      <div id="users-page">
        <h2>this is user page page</h2>
        <h3>users</h3>
        <input type="text" className="create-new" onKeyPress={this.createNew} />
        <input type="text" className="filter" value={filter} onChange={this.filter} />
        <ul>{
          filteredUsers.map(user => <li className="user" key={user}>{user}</li>)
        }
        </ul>
      </div>
    )
  }
}
