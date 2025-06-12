import { Actor, Color, Engine, GraphicsGroup, Rectangle, Vector } from "excalibur";
import { Soldier } from "./soldier";
import { GameLevel } from "@/levels/gamelevel";

export interface BaseConfig {
    health: number;
    location: Vector;
    baseName: string;
    baseColor: Color;
    wallOffset: number; 
}

export class Base extends Actor {
    health: number;
    baseColor: Color;
    wallOffset: number;

    spawnRate: number = 5000; // milliseconds
    spawnTimer: number = 0;

    scene: GameLevel;

    constructor(scene: GameLevel, config: BaseConfig) {
        super({
          name: config.baseName,
          pos: config.location,
          width: 100,
          height: 100,
        });

        this.health = config.health;
        this.baseColor = config.baseColor;
        this.wallOffset = config.wallOffset;
        this.scene = scene;
    }

    override onInitialize(engine: Engine) {
        
    }

    override onPreUpdate(engine: Engine, elapsedMs: number): void {
        // Update spawn timer
        this.spawnTimer += elapsedMs;
        if (this.spawnTimer >= this.spawnRate) {
            this.spawnTimer = 0;
            this.doSpawning();
        }
    }

    protected doSpawning() {
        
    }
}