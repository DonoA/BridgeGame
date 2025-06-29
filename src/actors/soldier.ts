import { GameLevel } from "@/levels/gamelevel";
import { Actor, Circle, CircleCollider, Collider, CollisionContact, CollisionType, Color, Engine, Font, GraphicsGroup, Scene, Side, Text, TextAlign, vec, Vector } from "excalibur";
import { Base } from "./base";
import { Damagable } from "./damagable";

export interface SoldierConfig {
    homeBase?: Base;
    health?: number;
    damage?: number;
    spawn?: Vector;
    targetMethod?: (solider: Soldier) => Damagable | null;
    name?: string;
    soldierColor?: Color;
}

export class Soldier extends Actor implements Damagable {
    healthText: Text;
    health: number;
    damage: number;
    soldierColor: Color;
    homeBase: Base;
    targetMethod: (solider: Soldier) => Damagable;

    attackCooldown: number = 0; // Cooldown for attacking other soldiers
    attackCooldownTime: number = 250; // 1 second cooldown
    attackRange: number = 5; // Range at which soldier can attack
    speed: number = 25;
    radius: number = 15; // Radius of the soldier for collision detection

    target: Damagable | null = null; // Target to move towards
    scene: GameLevel;

    constructor(scene: GameLevel, config: SoldierConfig) {
        super({
            name: config.name,
            pos: config.spawn,
            collisionType: CollisionType.Active,
            collider: new CircleCollider({
                radius: 15,
            }),
        });

        this.targetMethod = config.targetMethod;
        this.health = config.health;
        this.damage = config.damage;
        this.soldierColor = config.soldierColor;
        this.homeBase = config.homeBase;

        this.scene = scene;
    }

    copy(config: SoldierConfig): Soldier {
        return new Soldier(this.scene, {
            homeBase: config.homeBase ?? this.homeBase,
            health: config.health ?? this.health,
            damage: config.damage ?? this.damage,
            spawn: config.spawn ?? this.pos,
            targetMethod: config.targetMethod ?? this.targetMethod,
            name: config.name ?? this.name,
            soldierColor: config.soldierColor ?? this.soldierColor,
        });
    }

    override onInitialize() {
        const bodyGraphic = new Circle({
            radius: 15,
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
                    offset: vec(17, 11),
                    graphic: this.healthText
                }
            ],
        });

        this.graphics.add(graphicsGroup);

        this.actions.delay(100);
        this.actions.repeatForever(ctx => {
            if (this.target == null || this.target.health <= 0) {
                this.target = this.targetMethod(this);
            } else {
                const moveOffset = this.target.pos.sub(this.pos).normalize();

                ctx.moveBy({
                    offset: moveOffset,
                    durationMs: 100/this.speed,
                    // easing: (t) => t * t // Quadratic easing
                })
            }
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

        const targetDist = this.target ? this.target.pos.sub(this.pos).magnitude : Infinity;
        const attackDistance = this.attackRange + this.radius + this.target.radius;
        if (targetDist <= (attackDistance) && this.attackCooldown <= 0) {
            // Attack the current enemy target
            this.target.health -= this.damage;
            this.attackCooldown = this.attackCooldownTime; // Reset cooldown
        }
    }

    override onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        if (other.owner instanceof Soldier) {
            if (this.homeBase !== other.owner.homeBase) {
                // Enemy soldier
                this.target = other.owner as Soldier;
            }
        }
    }
}
