import React from 'react';
import DoorBlock from '../DoorBlock/DoorBlock';
import './DoorList.css';

function DoorList(props) {
   
    const content = () => {
        if (props.doors) {
            return props.doors.map(door => <DoorBlock door={door} key={door.id} socket={props.socket} />)
        } else {
            return <h3>Loading</h3>
        }            
    };

return (
        <div className="door-list">
            <h2>Garage Doors</h2>
            {content()}
            <p>end of list</p>
        </div>
    );
}

export default DoorList;
