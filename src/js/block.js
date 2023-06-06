import {Actor, Vector, Engine, Random, CollisionType} from "excalibur";
import {Resources} from "./resources";

let itemIds = [
    [0],
    [Resources.Grass, Resources.GrassLeft, Resources.GrassCorner],
    [Resources.Dirt],
    [Resources.Stone],
    [Resources.DarkStone],
[Resources.Tree]]
export class Block extends Actor {

    constructor(scaleTemp, chunkIDTemp, chunkCoords) {
        if(chunkCoords === undefined) {
            chunkCoords = [0,0]
        }
        super({
            width:Resources.Block.width, height:Resources.Block.height, pos: new Vector((chunkIDTemp % scaleTemp) * Resources.Block.width +25, Math.floor(chunkIDTemp /scaleTemp) *Resources.Block.height +25 + chunkCoords[1] *700)
        })
    }
    onInitialize(engine) {
        this.anchor = new Vector(0.5, 0.5);
    }

    checkSelf(sprite, subID){
if(!subID) {
    subID = 0;
}
        this.sprite = itemIds[sprite][subID].toSprite();
        this.graphics.use(itemIds[sprite][subID].toSprite());
        if(sprite === 5){
            this.scale = new Vector(0.7, 0.7);
            this.anchor = new Vector(0.5, 1);
        }
        if(sprite !== 4) {
            this.body.collisionType = CollisionType.Fixed;
        }
        else{
            this.body.collisionType = CollisionType.Passive;
        }
    }
}
