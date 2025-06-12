import { GameLevel } from "@/levels/gamelevel";
import { Base, BaseConfig } from "./base";
import { Color, Engine, vec } from "excalibur";
import { Soldier } from "./soldier";

export class PlayerBase extends Base {
    constructor(scene: GameLevel, config: BaseConfig) {
        super(scene, config);
        this.name = "PlayerBase";
    }

    override onInitialize(engine: Engine) {
        super.onInitialize(engine);

    }

    override doSpawning() {
        // Spawn player soldiers
        const soldier = new Soldier(this.scene, {
            homeBase: this,
            health: 10,
            damage: 1,
            spawn: this.pos.add(vec(200, 0)), // Spawn slightly above the base
            target: this.scene.gameState.enemyBase.pos,
            name: "PlayerSoldier",
            soldierColor: Color.Blue,
        });
        this.scene.gameState.playerSoldiers.push(soldier);
        this.scene.add(soldier);
    }
}