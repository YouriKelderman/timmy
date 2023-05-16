import { ImageSource, Sound, Resource, Loader } from "excalibur";
import logoImage from "../images/playere.png";
import treeImage from "../images/tree.png";
import grassImage from "../images/grass.png"
const Resources = {
    Logo: new ImageSource(logoImage),
    Tree: new ImageSource(treeImage),
    Grass: new ImageSource(grassImage)
};
const ResourceLoader = new Loader([Resources.Logo, Resources.Tree, Resources.Grass]);

export { Resources, ResourceLoader };
