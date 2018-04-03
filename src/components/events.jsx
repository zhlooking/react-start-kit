import React from 'react';


export default class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {clickTime: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    console.log('React Event grandpa is fired');
    this.setState({clickTime: new Date().getTime()})
  };

  componentDidMount(){
    document.getElementById('grandpa').addEventListener('click',function(e){
      console.log('native Event GrandPa is fired');
    })
  }

  render(){
    return (
      <div id='grandpa' style={{ backgroundColor: 'lightcoral', padding: 10 }} onClick={this.handleClick}>
        <p>GrandPa Clicked at: {this.state.clickTime}</p>
        <InnerPanel />
      </div>
    )
  }
}

class InnerPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {clickTime:0};
    this.handleClick=this.handleClick.bind(this);
  }

  componentDidMount(){
    document.getElementById('dad').addEventListener('click',function(e){
      console.log('native Event Dad is fired');
      e.stopPropagation();
    })
  }

  handleClick(){
    console.log('React Event Dad is fired')
    this.setState({clickTime: new Date().getTime()})
  }

  render(){
    return (
      <div id='dad' style={{ backgroundColor: 'lightBlue', padding: 10 }} onClick={this.handleClick}>
        <p>Dad Clicked at: {this.state.clickTime}</p>
        <ContentPanel />
      </div>
    )
  }
}

class ContentPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clickTime:0};
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick() {
    console.log('React Event Son is fired');
    this.setState({clickTime: new Date().getTime()})
  }

  componentDidMount() {
    document.getElementById('son').addEventListener('click',function(e){
      console.log('native Event son is fired');
    })
  }

  render() {
    return (
      <div id="son" style={{ backgroundColor: 'lightGray', padding: 10 }} >
        <p onClick={this.handleClick}>Son Clicked at: {this.state.clickTime} </p>
      </div>
    )
  }
}
