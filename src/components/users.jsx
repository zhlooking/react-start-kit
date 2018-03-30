import React from 'react';
import '../css/users.scss';

export default class Users extends React.Component {
  state = {
    count: 0,
  }

  handleChange = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    const { count } = this.state

    return (
      <div id="users-page">
        <div>this is user page</div>
        <div>count {count}</div>
        <button onClick={this.handleChange}>增加</button>
      </div>
    )
  }
}
