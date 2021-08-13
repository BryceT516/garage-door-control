import TwoCarOpen from './images/garage-2-car-open.png';
import TwoCarBetween from './images/garage-2-car-between.png';
import TwoCarClosed from './images/garage-2-car-closed.png';
import OneCarOpen from './images/garage-1-car-open.png';
import OneCarBetween from './images/garage-1-car-between.png';
import OneCarClosed from './images/garage-1-car-closed.png';

class Door {
    constructor(doorInfo) {
      this.id = doorInfo.doorId;
      this.type = doorInfo.doorType;
      this.name = doorInfo.doorName;
      this.sensors = doorInfo.doorSensors;  
      this.imgWidth = 145;
      this.imgHeight = 95;
      this.imgAlt = "garage door unknown position";
    }
  
    id() {
      return this.id;
    }
  
    type() {
      return this.type;
    }

    name() {
        return this.name;
    }

    imgWidth() {
        return this.imgWidth;
    }

    imgHeight() {
        return this.imgHeight;
    }

    imageSrc() {
        let returnValue = null;
        if (this.type === 0) {
            // One car garage
            this.imgWidth = 84;
            switch (this.state()) {
                case "open":
                    returnValue = OneCarOpen;
                    this.imgAlt = "open one car garage.";
                    break;
                case "between":
                    returnValue = OneCarBetween;
                    this.imgAlt = "in between one car garage.";
                    break;
                case "closed":
                    returnValue = OneCarClosed;
                    this.imgAlt = "closed one car garage.";
                    break;
                default:
                    return null;                
            }
        } else if (this.type === 1) {
            // Two car garage
            switch (this.state()) {
                case "open":
                    returnValue = TwoCarOpen;
                    this.imgAlt = "open one car garage.";
                    break;
                case "between":
                    returnValue = TwoCarBetween;
                    this.imgAlt = "in between one car garage.";
                    break;
                case "closed":
                    returnValue = TwoCarClosed;
                    this.imgAlt = "closed one car garage.";
                    break;
                default:
                    return null;   
            }
        }
        return returnValue;
    }

    state() {
        if (this.openSensor().state === 1 && this.closedSensor().state === 0) {
            return "open";
        } else if (this.openSensor().state === 0 && this.closedSensor().state === 1) {
            return "closed";
        } else if (this.openSensor().state === 0 && this.closedSensor().state === 0) {
            return "between";
        } else {
            return "error";
        }
    }

    openSensor() {
        return this.sensors.find(this.isOpenSensor);
    }

    isOpenSensor(sensor) {
        return sensor.sensorName === 'open';
    }

    closedSensor() {
        return this.sensors.find(this.isClosedSensor);
    }

    isClosedSensor(sensor) {
        return sensor.sensorName === 'closed';
    }
  }

export default Door;