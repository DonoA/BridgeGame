import { EnemyBase } from "./actors/enemy_base";
import { PlayerBase } from "./actors/player_base";

export class GameState {
    playerBase: PlayerBase;
    enemyBase: EnemyBase;
    engineScaled: boolean = false;
}

export const gameState = new GameState();
