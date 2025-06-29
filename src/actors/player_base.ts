import { GameLevel } from "@/levels/gamelevel";
import { Base, BaseConfig } from "./base";
import { Color, Engine, vec } from "excalibur";
import { Soldier } from "./soldier";
import { Damagable } from "./damagable";
import { getClosestTarget, scatterLocation } from "@/lib/util";

export class PlayerBase extends Base {

    private soliderTemplate = new Soldier(this.scene, {
        homeBase: this,
        health: 2,
        damage: 1,
        spawn: vec(0, 0), // Placeholder, will be set in doSpawning
        targetMethod: this.soliderTargetMethod.bind(this), // Placeholder, will be set in doSpawning
        name: "PlayerSoldier",
        soldierColor: Color.Blue,
    });

    constructor(scene: GameLevel, config: BaseConfig) {
        super(scene, config);
        this.name = "PlayerBase";
    }

    override onInitialize(engine: Engine) {
        super.onInitialize(engine);
    }

    soliderTargetMethod(soldier: Soldier): Damagable | null {
        const targetBase = this.scene.gameState.enemyBase;
        return getClosestTarget(targetBase.getSoliders(), soldier.pos) ?? targetBase;
    }

    override doSpawning() {
        const location = scatterLocation(this.pos, 50);
        // Spawn player soldiers
        const soldier = this.soliderTemplate.copy({
            spawn: location, // Spawn slightly above the base
        });
        this.soldiers.push(soldier);
        this.scene.add(soldier);
    }

    addGold(amount: number) {
        this.gold += amount;
    }

    addScience(amount: number) {
        this.science += amount;
    }
}