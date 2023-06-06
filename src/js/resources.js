import { ImageSource, Sound, Resource, Loader } from "excalibur";
import logoImage from "../images/player.png";
import treeImage from "../images/tree.png";
import grassImage from "../images/grass.png"
import dirtImage from "../images/dirt.png"
import stoneImage from "../images/stone.png"
import darkStoneImage from "../images/darkStone.png"
import blockImage from "../images/block.png"
import grassLeft from "../images/grassLeft.png"
import grassCorner from "../images/grassCorner.png"
import zombie from "../images/zombie.png"
import pickaxe from "../images/pickaxe.png"
const Resources = {
    Logo: new ImageSource(logoImage),
    Tree: new ImageSource(treeImage),
    Grass: new ImageSource(grassImage),
    GrassLeft: new ImageSource(grassLeft),
    Dirt: new ImageSource(dirtImage),
    Stone: new ImageSource(stoneImage),
    DarkStone: new ImageSource(darkStoneImage),
    Block: new ImageSource(blockImage),
    GrassCorner: new ImageSource(grassCorner),
    Pickaxe: new ImageSource(pickaxe),
    Zombie: new ImageSource(zombie)
};

const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}
const ResourceLoader = new Loader(resourceArray);

export { Resources, ResourceLoader };
