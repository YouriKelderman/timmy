import {Actor, Vector, Engine, Random, Input, CollisionType, range, randomInRange} from "excalibur";
import { Resources } from "./resources";

export class Tree extends Actor {

    constructor() {
        super({width:40, height: 100})

    }
    onInitialize(engine) {
        this.scale = new Vector(0.7, 0.7);
        this.anchor = new Vector(0.5, 1);
        this.rand = new Random();
        this.sprite = Resources.Tree.toSprite();
        this.graphics.use(this.sprite);
        this.w = 200;
        this.h = Resources.Tree.height;
        this.body.collisionType = CollisionType.Fixed;
    }

}
