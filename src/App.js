import './App.css';
import DoorList from './components/DoorList/DoorList';
import Door from './Door';

const io = require("socket.io-client");

let socket = io("http://localhost:4000",{});

socket.on("connect", server => {
  console.log("connection made...");
})


function App() {
  let doorList = [
    {       
      doorId: "1",
      doorType: 1,
      doorName: "two-bay door",
      doorSensors: [
        {
          sensorId: 0,
          sensorName: 'open',
          state: 1,
        },
        {
          sensorId: 1,
          sensorName: 'closed',
          state: 0,
        }
      ],
    },
    { 
      doorId: "2",
      doorType: 0,
      doorName: "one-bay door",
      doorSensors: [
        {
          sensorId: 2,
          sensorName: 'open',
          state: 0,
        },
        {
          sensorId: 3,
          sensorName: 'closed',
          state: 1,
        }
      ],
    }
  ];

  let doorListObjects = doorList.map(door => { return new Door(door)});

  return (
    <div className="App">
      <DoorList doors={doorListObjects} />      
    </div>
  );
}

export default App;
