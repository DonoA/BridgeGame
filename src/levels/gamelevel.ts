import { Scene, Engine, vec, Color, DefaultLoader, SceneActivationContext, ExcaliburGraphicsContext, Tile, TileMap } from "excalibur";
import { Base } from "../actors/base";
import { Soldier } from "../actors/soldier";
import { Resources } from "@/resources";
import { Background } from "@/actors/background";

export class GameLevel extends Scene {
    override onInitialize(engine: Engine): void {
        console.log(engine.drawWidth, engine.drawHeight);
        const playerBase = new Base({
            health: 100,
            location: vec(engine.drawWidth * 0.15, engine.drawHeight * 0.5),
            baseName: 'Player Base',
            baseColor: Color.Green,
            wallOffset: engine.drawWidth * 0.30
        });
        const enemyBase = new Base({
            health: 100,
            location: vec(engine.drawWidth * 0.85, engine.drawHeight * 0.5),
            baseName: 'Enemy Base',
            baseColor: Color.Red,
            wallOffset: engine.drawWidth * 0.65
        });
        this.add(playerBase);
        this.add(enemyBase);

        const background = new Background(Resources.Background.toSprite(), vec(engine.drawWidth, engine.drawHeight));
        this.add(background)

        // Scene.onInitialize is where we recommend you perform the composition for your game
        const testSoldier = new Soldier({
            health: 10,
            damage: 1,
            spawn: playerBase.pos,
            target: enemyBase.pos
        });
        this.add(testSoldier); // Actors need to be added to a scene to be drawn
    }

    override onPreLoad(loader: DefaultLoader): void {
        // Add any scene specific resources to load
    }

    override onActivate(context: SceneActivationContext<unknown>): void {
        // Called when Excalibur transitions to this scene
        // Only 1 scene is active at a time
    }

    override onDeactivate(context: SceneActivationContext): void {
        // Called when Excalibur transitions away from this scene
        // Only 1 scene is active at a time
    }

    override onPreUpdate(engine: Engine, elapsedMs: number): void {
        // Called before anything updates in the scene
    }

    override onPostUpdate(engine: Engine, elapsedMs: number): void {
        // Called after everything updates in the scene
    }

    override onPreDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
        // Called before Excalibur draws to the screen
    }

    override onPostDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
        // Called after Excalibur draws to the screen
    }
}
