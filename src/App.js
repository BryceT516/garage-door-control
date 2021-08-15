import React from 'react';
import './App.css';
import DoorList from './components/DoorList/DoorList';
import Door from './Door';

class App extends React.Component {
  constructor() {
    super();
    this.io = require("socket.io-client");    
    this.state = {
          doors: null
        };
  };  
  
  componentDidMount() {
    this.socket = this.io("http://192.168.86.32:4000",{});
    
    this.socket.on("connect", (...args) => {
      console.log("connection made...");
      this.socket.emit("info", "connected!");  
    });

    this.socket.on("allData", (...args) => {
      console.log("All data received...");
      console.log(args);
      let doorList = args[0].doorList;
      console.log(doorList);
      this.setState({doors: doorList.map(door => { return new Door(door)})});
    });

    this.socket.on("events", (...args) => {
      console.log(args);
    });    
  }  

  render() {
    return (
      <div className="App">
        <DoorList doors={this.state.doors} socket={this.socket} />      
      </div>
    );
  }
}

export default App;
