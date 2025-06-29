import { Base } from "./actors/base";
import { EnemyBase } from "./actors/enemy_base";
import { PlayerBase } from "./actors/player_base";
import { Soldier } from "./actors/soldier";

export class GameState {
    playerBase: PlayerBase;
    enemyBase: EnemyBase;
    playerSoldiers: Soldier[] = [];
    enemySoldiers: Soldier[] = [];
}