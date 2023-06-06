import {Actor, Vector, Engine, Random, CollisionType, Input} from "excalibur";
import {Resources} from "./resources";
import {Enemy} from "./enemy.js"
import {Game} from "./game.js";
export class Zombie extends Enemy {

    constructor(pos) {
        super({
            width:Resources.Zombie.width, height:Resources.Zombie.height})
    }

    onInitialize(engine) {
        console.log(this.health);
        this.sprite = Resources.Zombie.toSprite();
        this.graphics.use(this.sprite);
        this.body.collisionType = CollisionType.Active;
        this.scale = new Vector(0.09, 0.09)
        this.anchor = new Vector(0.5, 0.5);
        this.pos = new Vector(200, 200);
        this.w = 50;
        this.h = 50;
        this.vel = new Vector(20, 0);

    }

}
