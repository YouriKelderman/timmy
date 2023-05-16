import {Actor, Vector, Engine, Random, Input, CollisionType, range, randomInRange} from "excalibur";
import { Resources } from "./resources";

export class Tree extends Actor {

    constructor() {
        super({width:Resources.Tree.width, height:Resources.Tree.height})

    }
    onInitialize(engine) {
        this.scale = new Vector(0.7, 0.7);
        this.anchor = new Vector(0.5, 0.5);
        this.rand = new Random();
        this.pos = new Vector(Math.floor(Math.random() * 800), 320);
this.z = 1;
        this.sprite = Resources.Tree.toSprite();
        this.graphics.use(this.sprite);
        this.w = Resources.Tree.width;
        this.h = Resources.Tree.height;
        this.z = 1;

    }

}
