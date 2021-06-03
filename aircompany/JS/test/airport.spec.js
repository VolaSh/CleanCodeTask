const assert = require('chai').assert;

const Plane = require('../Planes/Plane');
const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const Airport = require('../Airport');
const MilitaryType = require('../models/MilitaryType');
const ExperimentalPlane = require('../Planes/ExperimentalPlane');
const ExperimentalTypes = require('../models/ExperimentalTypes');
const ClassificationLevel = require('../models/ClassificationLevel');

describe('My Test', () => {

    let planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MilitaryType.BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MilitaryType.BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MilitaryType.BOMBER),
        new MilitaryPlane('F-15', 1500, 12000, 10000, MilitaryType.FIGHTER),
        new MilitaryPlane('F-22', 1550, 13000, 11000, MilitaryType.FIGHTER),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MilitaryType.TRANSPORT),
        new ExperimentalPlane("Bell X-14", 277, 482, 500, ExperimentalTypes.HIGH_ALTITUDE, ClassificationLevel.SECRET),
        new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, ExperimentalTypes.VTOL, ClassificationLevel.TOP_SECRET)
    ];
    let planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

    it('should have Military Planes with transport type', () => {
        let airport = new Airport(planes);
        let transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
        let flag = true;
        for (let militaryPlane of transportMilitaryPlanes) {
            if (militaryPlane.getMilitaryType() !== MilitaryType.TRANSPORT) {
                flag = false;
                break;
            }
        }
        assert.equal(flag,true);
    });

    it('should check passenger plane with max passenger capacity', () => {
        let airport = new Airport(planes);
        let expectedPlaneWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();
        assert.isTrue(expectedPlaneWithMaxPassengersCapacity.passengersCapacity == planeWithMaxPassengerCapacity.passengersCapacity);
    });


    it('should check sortByMaxLoadCapacity method', () => {
        let airport = new Airport(planes);
        let planesSortedByMaxLoadCapacity = airport.sortByMaxLoadCapacity();
        let nextPlaneMaxLoadCapacityIsHigherThanCurrent = true;
        for (let i = 0; i < planesSortedByMaxLoadCapacity.length - 1; i++) {
            if (planesSortedByMaxLoadCapacity[i].maxLoadCapacity > planesSortedByMaxLoadCapacity[i + 1].maxLoadCapacity) {
                nextPlaneMaxLoadCapacityIsHigherThanCurrent = false;
                break;
            }
        }
        assert.isTrue(nextPlaneMaxLoadCapacityIsHigherThanCurrent);
    })

    it('should have Military Planes with Bomber type', () => {
        let airport = new Airport(planes);
        let bomberMilitaryPlanes  = airport.getBomberMilitaryPlanes ();
        let flag = true;
        for (let militaryPlane of bomberMilitaryPlanes) {
            if (militaryPlane.getMilitaryType() !== MilitaryType.BOMBER) {
                flag = false;
                break;
            }
        }
        assert.equal(flag,true);
    });
        
 
    it('should check that experimental planes do not have UNCLASSIFIED level', () => {
        let airport = new Airport(planes);
        let experimentalPlanes = airport.getExperimentalPlanes();
        let hasUnclassifiedPlanes = false;
        for (let experimentalPlane  of experimentalPlanes) {
            if (experimentalPlane.classificationLevel === ClassificationLevel.UNCLASSIFIED) {
                hasUnclassifiedPlanes = true;
                break;
            }
        }
        assert.isFalse(hasUnclassifiedPlanes);
    });
});



