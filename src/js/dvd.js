import {Actor, Vector, Engine, Random, Input, CollisionType, CircleCollider} from "excalibur";
import { Resources } from "./resources";

export class DVD extends Actor {

    constructor() {
        super({width:Resources.Logo.width, height:Resources.Logo.height})

    }
    onInitialize(engine) {

        this.on('collisionstart', (event) => this.hitSomething(event))
        this.anchor = new Vector(0.5, 0.5);
        this.rand = new Random();
        this.sprite = Resources.Logo.toSprite();
        this.graphics.use(this.sprite);
        this.w = Resources.Logo.width;
        this.h = Resources.Logo.height;
        this.pos = new Vector(
            this.rand.integer(this.w, engine.drawWidth - this.w),
            this.rand.integer(this.h, engine.drawHeight - this.h)
        );

        this.body.collisionType = CollisionType.Active;
        this.body.useGravity = true;
        // flip
        this.scale = new Vector(0.5, 0.5);
        this.anchor = new Vector(0.5, 0.5);
        //this.angularVelocity = Math.random() + 0.2;
        //this.rotation = 12;
    }
hitSomething(event){
        console.log("e");
}
    onPreUpdate(engine) {
        let xspeed = 0
        let yspeed = 0

        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.Left)) {
            xspeed = -300

        }
        if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.Space) || engine.input.keyboard.isHeld(Input.Keys.Up)) {
            yspeed = -900

        }
        if (engine.input.keyboard.isHeld(Input.Keys.S) || engine.input.keyboard.isHeld(Input.Keys.Down)) {
            yspeed = 300

        }
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.Right)) {
            xspeed = 300
        }
        this.vel = new Vector(xspeed, yspeed)
    }

}
