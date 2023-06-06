import {Scene} from "excalibur";
import {Actor, Engine, Vector, Color, Debug, Physics, Input, Text, Font, Axis} from "excalibur";

export class Start extends Scene {
    onInitialize(engine) {
        this.game = engine;
        let text = new Text({
            text: 'Klik ergens om te beginnen',
            font: new Font({ size: 30 }),
        })
        const actor = new Actor({
            pos: new Vector(350, 350)
        });
        actor.graphics.use(text);
        this.add(actor);
        this.game.enableCapturePointer = true;
        this.engine.input.pointers.primary.on("up", () => this.game.goToScene('world'))
    }

}
