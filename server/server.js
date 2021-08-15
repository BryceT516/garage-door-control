
let port = '4000'
const Gpio = require('onoff').Gpio;
const doorOneSensorOpen = new Gpio(2, 'in', 'both');
const doorOneSensorClosed = new Gpio(3, 'in', 'both');
const doorTwoSensorOpen = new Gpio(4, 'in', 'both');
const doorTwoSensorClosed = new Gpio(5, 'in', 'both');

const relayOne = new Gpio(18, 'out');
const relayTwo = new Gpio(19, 'out');

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
            origin: ["http://localhost:3000", "http://192.168.86.32:3000"],
            methods: ["GET", "POST"]
          }
});

let relayOneState = 0;
let relayOneOffTimeout = null;
let relayOneOnTimeout = null;
let relayTwoState = 0;
let relayTwoOffTimeout = null;
let relayTwoOnTimeout = null;

let doorList = [
{
  doorId: "1",
  doorType: 1,
  doorName: "two-bay door",
  doorSensors: [
    {
      sensorId: 0,
      sensorName: 'open',
      state: (doorOneSensorOpen.readSync()) ? 0 : 1,
    },
    {
      sensorId: 1,
      sensorName: 'closed',
      state: (doorOneSensorClosed.readSync()) ? 0 : 1,
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
      state: (doorTwoSensorOpen.readSync()) ? 0 : 1,
    },
    {
      sensorId: 3,
      sensorName: 'closed',
      state: (doorTwoSensorClosed.readSync()) ? 0 : 1,
    }
  ],
}
];

io.on("connection", (socket) => {
    console.log("connection made!");
    socket.emit("allData", {doorList: doorList});
    writeRelay(1);
    writeRelay(2);

    socket.on("info", (arg) => {
        console.log(`info received: ${arg}`);
    });

    socket.on("activate", (arg) => {
        console.log("door activation requested!");
        if (arg == 1) {
            console.log(`relayOneState = ${relayOneState}, relayTwoState = ${relayTwoState}`);
            if (relayOneState == 1) {
                abort(1);
                relayOneOnTimeout = setTimeout(activateRelay(1), 500);
            } else {
                console.log(`activating relay... #${arg}`);
                relayOneState = 1;
                writeRelay(1);
                relayOneOffTimeout = setTimeout(deactivateRelay(1), 1000);
                io.emit("events", `activated relay #${arg}`);
            }
        } else if (arg == 2) {
            console.log(`relayOneState = ${relayOneState}, relayTwoState = ${relayTwoState}`);
            if (relayTwoState == 1) {
                abort(2);
                relayOneOnTimeout = setTimeout(activateRelay(2), 500);
            } else {
                console.log(`activating relay... #${arg}`);
                relayTwoState = 1;
                writeRelay(2);
                relayTwoOffTimeout = setTimeout(deactivateRelay(2), 1000);
                io.emit("events", `activated relay ${arg}`);
            }
        } else {
            console.log(`error - bad array id ${arg}`)
        }
        console.log(`relayOneState = ${relayOneState}, relayTwoState = ${relayTwoState}`);
    });

    socket.on("getData", () => {
      console.log("data requested...");
      io.emit("allData", {doorList: doorList});
    });
})

doorOneSensorOpen.watch((err, value) => {
    console.log(`sensor one open new value = ${value}`);
    newValue = (value == 1) ? 0 : 1;
    doorList[0].doorSensors[0].state = newValue;
    io.emit("allData", {doorList: doorList});
});

doorOneSensorClosed.watch((err, value) => {
    console.log(`sensor one closed new value = ${value}`);
    newValue = (value == 1) ? 0 : 1;
    doorList[0].doorSensors[1].state = newValue;
    io.emit("allData", {doorList: doorList});
});

doorTwoSensorOpen.watch((err, value) => {
    console.log(`sensor two open new value = ${value}`);
    newValue = (value == 1) ? 0 : 1;
    doorList[1].doorSensors[0].state = newValue;
    io.emit("allData", {doorList: doorList});
});

doorTwoSensorClosed.watch((err, value) => {
    console.log(`sensor two closed new value = ${value}`);
    newValue = (value == 1) ? 0 : 1;
    doorList[1].doorSensors[1].state = newValue;
    io.emit("allData", {doorList: doorList});
});

const abort = (relayId) => {
    console.log("aborting...");
    if (relayId == 1) {
        clearTimeout(relayOneOffTimeout);
        relayOneState = 0;
        writeRelay(1);
    } else {
        clearTimeout(relayTwoOffTimeout);
        relayTwoState = 0;
        writeRelay(2);
    }
}

const activateRelay = (relay) => {
    console.log(`activating relay... #${relay}`);
    return () => {
        setState(relay);
        writeRelay(relay);
        setOffTimeout(relay);
        sendActivatedEvent(relay);
    }
}

const sendActivatedEvent = (relay) => {
    io.emit("events", `activated relay ${relay}`);
}


const setOffTimeout = (relay) => {
    if (relay == 1) {
        relayOneOffTimeout = setTimeout(deactivateRelay(relay), 1000);
    } else {
        relayTwoOffTimeout = setTimeout(deactivateRelay(relay), 1000);
    }
}

const deactivateRelay = (relay) => {
    console.log("In deactivating");
    return () => {
        console.log("deactivating relay...");
        clearState(relay);
        writeRelay(relay);
    }
};

const clearState = (relay) => {
    console.log(`in clearState, relay = ${relay}`);
    if (relay == 1) {
        relayOneState = 0;
    } else {
        relayTwoState = 0;
    }    
}

const setState = (relay) => {
    console.log(`in setState, relay = ${relay}`);
    if (relay == 1) {
        relayOneState = 1;
    } else {
        relayTwoState = 1;
    }    
}

const writeRelay = (relay) => {    
    relayRef = (relay == 1) ? relayOne : relayTwo;
    state = (relay == 1) ? relayOneState : relayTwoState;
    console.log(`in WriteRelay... values: relay = ${relay}, state = ${state}`);
    relayRef.writeSync(state);
};

httpServer.listen(port);

