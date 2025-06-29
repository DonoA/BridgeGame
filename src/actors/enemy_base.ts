import { GameLevel } from "@/levels/gamelevel";
import { Base, BaseConfig } from "./base";
import { Color, Engine, vec } from "excalibur";
import { Soldier } from "./soldier";

export class EnemyBase extends Base {
    constructor(scene: GameLevel, config: BaseConfig) {
        super(scene, config);
        this.name = "EnemyBase";
    }

    override onInitialize(engine: Engine) {
        super.onInitialize(engine);
    }

    override doSpawning() {
        // Spawn enemy soldiers
        const soldier = new Soldier(this.scene, {
            homeBase: this,
            health: 10,
            damage: 1,
            spawn: this.pos.add(vec(-200, 0)),
            target: this.scene.gameState.playerBase.pos,
            name: "EnemySoldier",
            soldierColor: Color.Red,
        });
        this.scene.gameState.enemySoldiers.push(soldier);
        this.scene.add(soldier);
    }
}