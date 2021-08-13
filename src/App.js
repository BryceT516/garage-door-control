import './App.css';
import DoorList from './components/DoorList/DoorList';

function App() {
  let doorList = [
    { 
      doorName: "two-bay door",
      doorSensors: [
        {
          sensorName: 'open',
          state: 1,
        },
        {
          sensorName: 'closed',
          state: 0,
        }
      ],      
      doorId: "1",
    },
    {
      doorName: "one-bay door",
      doorSensors: [
        {
          sensorName: 'open',
          state: 0,
        },
        {
          sensorName: 'closed',
          state: 0,
        }
      ], 
      doorId: "2",
    }
  ];

  return (
    <div className="App">
      <DoorList doors={doorList} />      
    </div>
  );
}

export default App;
