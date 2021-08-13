import './DoorBlock.css';
import DoorSensors from '../DoorSensors/DoorSensors';
import DoorActivator from '../DoorActivator/DoorActivator';

function DoorBlock (props) {
    return (
        <div className="door-block">
            <h3>{props.doorInfo.doorName}</h3>
            <DoorSensors sensors={props.doorInfo.doorSensors} />
            <DoorActivator doorId={props.doorInfo.doorId} />
        </div>
    )
}

export default DoorBlock;