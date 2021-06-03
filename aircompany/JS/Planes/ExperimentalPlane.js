const Plane = require('./Plane');

class ExperimentalPlane   extends Plane
{

    constructor(model, maxSpeed, maxFlightDistance, maxLoadCapacity, type, classificationLevel)  {
        super(model, maxSpeed, maxFlightDistance, maxLoadCapacity);
        this._type = type;
        this._classificationLevel = classificationLevel;

    }
    
    set model(value) {
        this._model = value;
    }
    
    set maxSpeed(value) {
        this._maxSpeed = value;
    }
    
    set maxFlightDistance(value) {
        this._maxFlightDistance = value;
    }
    
    set maxLoadCapacity(value) {
        this._maxLoadCapacity = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get classificationLevel() {
        return this._classificationLevel;
    }

    set classificationLevel(value) {
        this._classificationLevel = value;
    }
}

module.exports = ExperimentalPlane