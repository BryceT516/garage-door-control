import DoorSensor from '../DoorSensor/DoorSensor';
import './DoorSensors.css';

function DoorSensors (props) {
    return (
        <div className='door-sensors'>
            <h4>Status:</h4>
            {props.sensors.map(sensor => <DoorSensor info={sensor} />)}
        </div>
    )
}

export default DoorSensors;