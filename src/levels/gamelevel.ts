import { Scene, Engine, vec, Color, DefaultLoader, SceneActivationContext, ExcaliburGraphicsContext, Tile, TileMap } from "excalibur";
import { Soldier } from "../actors/soldier";
import { Resources } from "@/resources";
import { Background } from "@/actors/background";
import { gameState } from "@/game_state";
import { PlayerBase } from "@/actors/player_base";
import { EnemyBase } from "@/actors/enemy_base";
import { Menu } from "@/actors/menu";

export class GameLevel extends Scene {

    override onInitialize(engine: Engine): void {
        const background = new Background(Resources.Background.toSprite(), vec(engine.drawWidth, engine.drawHeight));
        this.add(background)

        const playerBase = new PlayerBase(this, {
            health: 100,
            location: vec(engine.drawWidth * 0.15, engine.drawHeight * 0.5),
            baseName: 'Player Base',
            baseColor: Color.Blue,
            wallOffset: engine.drawWidth * 0.30
        });
        gameState.playerBase = playerBase; // Store player base in game state

        const enemyBase = new EnemyBase(this, {
            health: 100,
            location: vec(engine.drawWidth * 0.85, engine.drawHeight * 0.5),
            baseName: 'Enemy Base',
            baseColor: Color.Red,
            wallOffset: engine.drawWidth * 0.65
        });
        gameState.enemyBase = enemyBase; // Store enemy base in game state

        this.add(playerBase);
        this.add(enemyBase);

        const menuController = new Menu(this);
        this.add(menuController);
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
