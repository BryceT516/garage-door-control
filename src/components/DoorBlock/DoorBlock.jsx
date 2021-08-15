import './DoorBlock.css';
// import DoorSensors from '../DoorSensors/DoorSensors';
// import DoorActivator from '../DoorActivator/DoorActivator';

function DoorBlock (props) {
    const activateDoor = () => {   
        props.socket.emit("activate", props.door.id);
    };

    return (
        <div className="door-block">
            <img src={props.door.imageSrc()} 
                width={props.door.imgWidth} 
                height={props.door.imgHeight} 
                alt={props.door.imgAlt}
                onClick={activateDoor}
            />
        </div>
    )
}

export default DoorBlock;
