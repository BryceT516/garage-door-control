import DoorBlock from '../DoorBlock/DoorBlock';
import './DoorList.css';

function DoorList (props) {
    return (
        <div className="door-list">
            <h2>Garage Doors</h2>
            {props.doors.map(door => <DoorBlock doorInfo={door} />)}
            <p>end of list</p>
        </div>
    );
}

export default DoorList;