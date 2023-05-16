import {Actor, Vector, Engine, Random, CollisionType} from "excalibur";
import {Resources} from "./resources";

export class Grass extends Actor {

    constructor(pos) {

        super({
            width: visualViewport.width, height: Resources.Grass.height
        })
    }


    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed;
        this.scale = new Vector(14, 1)
        this.anchor = new Vector(0.5, 0.5);
        this.rand = new Random();
        this.sprite = Resources.Grass.toSprite();
        this.graphics.use(this.sprite);
        this.w = Resources.Grass.width;
        this.h = Resources.Grass.height;
        this.pos = new Vector(390, 580)
    }

    changePosition(pos) {
        this.pos = new Vector(visualViewport.width / 2, 0)
    }
}
