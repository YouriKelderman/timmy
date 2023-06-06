import {Actor, Vector, Engine, Random, CollisionType} from "excalibur";
import {Resources} from "./resources";


export class Dirt extends Actor {

    constructor(scaleTemp, chunkIDTemp, chunkCoords) {

        if(chunkCoords === undefined) {
            chunkCoords = [0,0]
        }

        super({
            width:Resources.Dirt.width, height:Resources.Dirt.height, pos: new Vector((chunkIDTemp % scaleTemp) * Resources.Dirt.width +25, Math.floor(chunkIDTemp /scaleTemp) *Resources.Dirt.height +25 + chunkCoords[1] *700)
        })
    }
    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed;
        this.sprite = Resources.Dirt.toSprite();
        this.graphics.use(this.sprite);
        this.anchor = new Vector(0.5, 0.5);

    }
    checkSelf(){

    }
}
