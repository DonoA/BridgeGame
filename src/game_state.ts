import { Base } from "./actors/base";
import { Soldier } from "./actors/soldier";

export class GameState {
    playerBase: Base;
    enemyBase: Base;
    playerSoldiers: Soldier[] = [];
    enemySoldiers: Soldier[] = [];
}