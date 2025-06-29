import { Actor, Circle, CircleCollider, CollisionType, Color, Engine, Font, GraphicsGroup, Rectangle, Text, TextAlign, vec, Vector } from "excalibur";
import { Soldier } from "./soldier";
import { GameLevel } from "@/levels/gamelevel";
import { Damagable } from "./damagable";

export interface BaseConfig {
    health: number;
    location: Vector;
    baseName: string;
    baseColor: Color;
    wallOffset: number;
}

export class Base extends Actor implements Damagable {
    health: number;
    baseColor: Color;
    wallOffset: number;
    gold: number = 0; // Gold for spawning soldiers
    science: number = 0; // Science for upgrades

    soldiers: Soldier[] = []; // List of soldiers spawned by this base

    spawnRate: number = 5000; // milliseconds
    spawnTimer: number = 0;
    radius: number = 50; // Radius of the base for collision detection

    healthText: Text;

    constructor(scene: GameLevel, config: BaseConfig) {
        super({
            name: config.baseName,
            pos: config.location,
            collisionType: CollisionType.Fixed,
            collider: new CircleCollider({
                radius: 50,
            }),
        });

        this.health = config.health;
        this.baseColor = config.baseColor;
        this.wallOffset = config.wallOffset;
    }

    override onInitialize(engine: Engine) {
        this.healthText = new Text({
            text: this.health.toString(),
            color: Color.White,
            font: new Font({
                size: 25,
                bold: true,
                textAlign: TextAlign.Center,
            }),
        });

        this.graphics.add(new GraphicsGroup({
            members: [
                new Circle({
                    radius: 50,
                    color: this.baseColor,
                    strokeColor: Color.Black,
                    lineWidth: 2,
                }),
                {
                    graphic: this.healthText,
                    offset: vec(50, 40), // Position above the base
                }
            ]
        }));
    }

    override onPreUpdate(engine: Engine, elapsedMs: number): void {
        // Update spawn timer
        this.spawnTimer += elapsedMs;
        if (this.spawnTimer >= this.spawnRate) {
            this.spawnTimer = 0;
            this.doSpawning();
        }

        this.healthText.text = this.health.toString();
    }

    getSoliders(): Soldier[] {
        this.soldiers = this.soldiers.filter(s => s.health > 0); // Remove dead soldiers
        return this.soldiers;
    }

    doSpawning() {

    }
}
