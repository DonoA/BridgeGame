import { Actor, Circle, Color, Font, GraphicsGroup, Text, TextAlign, vec, Vector } from "excalibur";

export interface SoldierConfig {
    health: number;
    damage: number;
    spawn: Vector;
    target: Vector;
}

export class Soldier extends Actor {
    healthText: Text;
    health: number;
    damage: number;
    target: Vector; 

    constructor(config: SoldierConfig) {
        super({
          name: 'Soldier',
          pos: config.spawn,
          width: 40,
          height: 40,
        });

        this.target = config.target;
        this.health = config.health;
        this.damage = config.damage;
    }

    override onInitialize() {
        const bodyGraphic = new Circle({
            radius: 20,
            color: Color.Red,
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
    
        // Actions are useful for scripting common behavior, for example patrolling enemies
        this.actions.delay(1000);
        this.actions.repeatForever(ctx => {
            const moveOffset = this.target.sub(this.pos).normalize();

            ctx.moveBy({
                offset: moveOffset,
                durationMs: 100,
                // easing: (t) => t * t // Quadratic easing
            })
        });
    }
}
