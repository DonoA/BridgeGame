import { Vector } from "excalibur";

export class BaseController {

    location: Vector;

    constructor(location: Vector) {
        this.location = location;
    }
}