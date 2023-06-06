import {Actor, Vector, Engine, Random, Input, CollisionType, CircleCollider} from "excalibur";
import {Resources} from "./resources";
import {Pickaxe} from "./pickaxe.js";
let tool;

export class DVD extends Actor {

    constructor() {
        tool = new Pickaxe();

        super({width: Resources.Logo.width, height: Resources.Logo.height})
    }

    onInitialize(engine) {
        tool.pose(this.pos);
        this.anchor = new Vector(0.5, 0.5);
        this.rand = new Random();
        this.sprite = Resources.Logo.toSprite();
        this.graphics.use(this.sprite);
        this.w = 100;
        this.h = 200;
        this.pos = new Vector(350, 100);
        this.z = 2;
        this.body.collisionType = CollisionType.Active;
        this.body.mass = 10000;
        this.scale = new Vector(1, 1);

    }

    onPreUpdate(engine) {
        tool.pos = this.pos;


        this.rotation = 0;
        let xspeed = 0
        let yspeed = 0
        if (engine.input.keyboard.isHeld(Input.Keys.A)) {
            xspeed = -300
        }
        if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.Space)) {
            yspeed = -90
        }
        if (engine.input.keyboard.isHeld(Input.Keys.S)) {
            yspeed = 30
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D)) {
            xspeed = 300
        }
        if (engine.input.keyboard.isHeld(Input.Keys.G)) {
            this.z = 100;
        }

        this.vel.y = this.vel.y + yspeed;
        this.vel.x = xspeed;
    }

}
