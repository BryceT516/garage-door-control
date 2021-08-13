import './DoorSensor.css';

function DoorSensor (props) {
    return (
        <div className='door-sensor'>
            <h4>{props.info.sensorName}: {props.info.state}</h4>            
        </div>
    )
}

export default DoorSensor;