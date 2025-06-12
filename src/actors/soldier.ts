import { GameLevel } from "@/levels/gamelevel";
import { Actor, Circle, Collider, CollisionContact, CollisionType, Color, Engine, Font, GraphicsGroup, Scene, Side, Text, TextAlign, vec, Vector } from "excalibur";
import { Base } from "./base";

export interface SoldierConfig {
    homeBase: Base;
    health: number;
    damage: number;
    spawn: Vector;
    target: Vector;
    name: string;
    soldierColor: Color;
}

export class Soldier extends Actor {
    healthText: Text;
    health: number;
    damage: number;
    target: Vector;
    soldierColor: Color;
    homeBase: Base;

    currentEnemyTarget: Soldier | null = null;
    attackCooldown: number = 0; // Cooldown for attacking other soldiers
    attackCooldownTime: number = 1000; // 1 second cooldown

    constructor(scene: GameLevel, config: SoldierConfig) {
        super({
          name: config.name,
          pos: config.spawn,
          width: 40,
          height: 40,
          collisionType: CollisionType.Active,
        });

        this.target = config.target;
        this.health = config.health;
        this.damage = config.damage;
        this.soldierColor = config.soldierColor;
        this.homeBase = config.homeBase;

        this.scene = scene;
    }

    override onInitialize() {
        const bodyGraphic = new Circle({
            radius: 20,
            color: this.soldierColor,
            strokeColor: Color.Black,
            lineWidth: 2
        });

        this.healthText = new Text({
            text: this.health.toString(),
            color: Color.White,
            origin: vec(0, 0),
            font: new Font({ 
                size: 15, 
                bold: true,
                textAlign: TextAlign.Center, 
            }),
        });

        const graphicsGroup = new GraphicsGroup({
            members: [
                bodyGraphic, 
                {
                    offset: vec(22, 15),
                    graphic: this.healthText
                }
            ],
        });

        this.graphics.add(graphicsGroup);
    
        this.actions.delay(500);
        this.actions.repeatForever(ctx => {
            const moveOffset = this.target.sub(this.pos).normalize();
            
            ctx.moveBy({
                offset: moveOffset,
                durationMs: 10,
                // easing: (t) => t * t // Quadratic easing
            })
        });
    }

    override onPreUpdate(engine: Engine, elapsedMs: number): void {
        // Update health text
        this.healthText.text = this.health.toString();
        if (this.health <= 0) {
            this.kill();
        }

        // Check if soldier can attack
        if (this.attackCooldown > 0) {
            this.attackCooldown -= elapsedMs;
        }

        if (this.currentEnemyTarget && this.attackCooldown <= 0) {
            // Attack the current enemy target
            this.currentEnemyTarget.health -= this.damage;
            this.attackCooldown = this.attackCooldownTime; // Reset cooldown
        }
    }

    override onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        if (other.owner instanceof Soldier) {
            if (this.homeBase !== other.owner.homeBase) {
                // Enemy soldier
                this.currentEnemyTarget = other.owner as Soldier;
            }
        }
    }
}
