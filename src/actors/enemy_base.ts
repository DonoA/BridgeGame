import { GameLevel } from "@/levels/gamelevel";
import { Base, BaseConfig } from "./base";
import { Color, Engine, vec } from "excalibur";
import { Soldier } from "./soldier";
import { getClosestTarget, scatterLocation } from "@/lib/util";
import { Damagable } from "./damagable";
import { gameState } from "@/game_state";

export class EnemyBase extends Base {
    constructor(scene: GameLevel, config: BaseConfig) {
        super(scene, config);
        this.name = "EnemyBase";
    }

    override onInitialize(engine: Engine) {
        super.onInitialize(engine);
    }

    override doSpawning() {
        const location = scatterLocation(this.pos.add(vec(-100, 0)), 50);
        // Spawn enemy soldiers
        const soldier = new Soldier(this.scene, {
            homeBase: this,
            health: 4,
            damage: 1,
            spawn: location,
            targetMethod: () => gameState.playerBase,
            name: "EnemySoldier",
            soldierColor: this.baseColor || Color.Red,
        });
        this.soldiers.push(soldier);
        this.scene.add(soldier);
    }

    soliderTargetMethod(soldier: Soldier): Damagable | null {
        const targetBase = gameState.playerBase;
        return getClosestTarget(targetBase.getSoliders(), soldier.pos) ?? targetBase;
    }
}
