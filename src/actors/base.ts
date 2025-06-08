import { Actor, Color, Engine, GraphicsGroup, Rectangle, Vector } from "excalibur";

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

    constructor(config: BaseConfig) {
        super({
          name: config.baseName,
          pos: config.location,
          width: 100,
          height: 100,
        });

        this.health = config.health;
        this.baseColor = config.baseColor;
        this.wallOffset = config.wallOffset;
    }

    override onInitialize(engine: Engine) {
        
    }
}