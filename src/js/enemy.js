import {Actor, Vector, Engine, Random, CollisionType} from "excalibur";
import {Resources} from "./resources";


export class Enemy extends Actor {
    health = 100;
    constructor(pos) {
        super({
            width:Resources.Zombie.width, height:Resources.Zombie.height})
    }

}
