const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const MilitaryType = require('./models/MilitaryType');
const ExperimentalPlane = require('./Planes/ExperimentalPlane');

class Airport {

    constructor(planes) {
        this._planes = planes;
    }
    get planes() {
        return this._planes;
    }
    static print(planes) {
        return JSON.stringify(planes);
    }
    

     getPassengerPlanes() {
        var passengerPlanes = [];
        for (let p of this.planes) {
            if (p instanceof PassengerPlane) {passengerPlanes.push(p);}
        }
        return passengerPlanes;
    }

    getMilitaryPlanes() {
        let militaryPlanes = [];
        this.planes.forEach(plane => {
            if (plane instanceof MilitaryPlane) {
                militaryPlanes.push(plane);
            }
        });
        return militaryPlanes;
    }

    getPassengerPlaneWithMaxPassengersCapacity() {
        let passengerPlanes = this.getPassengerPlanes();
        let planeWithMaxCapacity = passengerPlanes[0];
        for (let i = 1; i < passengerPlanes.length; i++) {
            if (passengerPlanes[i].passengersCapacity > planeWithMaxCapacity.passengersCapacity) {
                planeWithMaxCapacity = passengerPlanes[i];
            }
        }
        return planeWithMaxCapacity;
    }

    getTransportMilitaryPlanes(){
        let transportMilitaryPlanes = [];
        for (let p of this.getMilitaryPlanes()) {
            if (p.getMilitaryType() === MilitaryType.TRANSPORT) {
                transportMilitaryPlanes.push(p);
            }
        }
        return transportMilitaryPlanes;
    }

    getBomberMilitaryPlanes()
    {
        let bomberMilitaryPlanes = [];
        for (let p of this.getMilitaryPlanes()) {
            if (p.getMilitaryType() === MilitaryType.BOMBER) {
                bomberMilitaryPlanes.push(p);
            }
        }
        return bomberMilitaryPlanes;
    }
    
    getExperimentalPlanes() {
        let experimentalPlanes  = [];
        this.planes.forEach(plane => {
            if (plane instanceof ExperimentalPlane) {
                experimentalPlanes.push(plane);
            }
        });
        return experimentalPlanes;
    }

    sortByMaxDistanceAscending() {
        return this.planes.sort((a, b) => (a.maxFlightDistance > b.maxFlightDistance) ? 1 : -1);
    }

    
    sortByMaxSpeed() {
        return this.planes.sort((a, b) => (a.maxSpeed > b.maxSpeed) ? 1 : -1);
    }

    sortByMaxLoadCapacity() {
        return this.planes.sort((a, b) => (a.maxLoadCapacity > b.maxLoadCapacity) ? 1 : -1);
    }

    
    
}

module.exports = Airport;
