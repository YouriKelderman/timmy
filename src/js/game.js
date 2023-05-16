import {Actor, Engine, Vector, Color, Debug, Physics} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";
import {DVD} from "./dvd";
import {Tree} from "./tree";
import {Grass} from "./grass";
export class Game extends Engine {
    constructor() {
        Physics.useRealisticPhysics();
        Physics.acc = new Vector(0, 12000);
        super();
Physics.enabled = true;
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {

        for (let i = 1; i < 2; i++) {
            this.add(new DVD());
            if (i < 5) {
                this.add(new Tree());
                this.add(new Tree());
                this.add(new Grass(i));

            }
        }
    }
}

new Game();
