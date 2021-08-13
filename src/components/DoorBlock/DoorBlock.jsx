import './DoorBlock.css';
// import DoorSensors from '../DoorSensors/DoorSensors';
// import DoorActivator from '../DoorActivator/DoorActivator';

function DoorBlock (props) {
    const activateDoor = () => {
        // make the api call to activate the door
        console.log("Activating door");
        console.log(`door id = ${props.door.id}`);
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