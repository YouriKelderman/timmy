//Imports   **
//          **
import {Actor, Engine, Vector, Color, Debug, Physics, Input, Axis} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";
import {Start} from "./start.js";
import {World} from "./world.js";
import {End} from "./end.js"

export class Game extends Engine {
    constructor() {
        Physics.useArcadePhysics();
        Physics.acc = new Vector(0, 300);
        super({width: 700, height: 700});
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        this.addScene('start', new Start());
        this.addScene('world', new World());
        this.addScene('end', new End());
        this.goToScene('start');
    }

    onInitialize(_engine) {
    }
}
new Game();
