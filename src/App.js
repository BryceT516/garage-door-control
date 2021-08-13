import './App.css';
import DoorList from './components/DoorList/DoorList';
import Door from './Door';

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
          state: 0,
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
