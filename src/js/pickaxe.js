import {Actor, Vector, Engine, Random, Input, CollisionType, range, randomInRange} from "excalibur";
import {Resources} from "./resources";

export class Pickaxe extends Actor {

    constructor() {
        super({width: Resources.Pickaxe.width, height: Resources.Pickaxe.height})
    }

    onInitialize(engine) {
        this.scale = new Vector(0.7, 0.7);
        this.anchor = new Vector(0.5, 1);

        this.sprite = Resources.Pickaxe.toSprite();
        this.graphics.use(this.sprite);
        this.w = 10;
        this.h = 10;
        this.body.collisionType = CollisionType.Passive;

    }

    pose(pos) {
        this.pos = pos;
        this.sprite = Resources.Pickaxe.toSprite();
        this.graphics.use(this.sprite);
        console.log("Ik ben een pickaxe, dat is cool zeg")
    }
}
