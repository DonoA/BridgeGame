import { GameLevel } from "@/levels/gamelevel";
import { Actor, Engine, Sprite, vec, Vector } from "excalibur";
import { ReplaceText } from "./replace_text";
import { gameState } from "@/game_state";
import { setGameScale } from "@/lib/util";

export class Menu extends Actor {
    menuDiv: HTMLElement;
    statPanel: ReplaceText;

    clickCooldown: number = 0;
    clickCooldownTime: number = 10000; // 1 second cooldown

    cooldownButtons: HTMLElement[] = [];

    constructor(scene: GameLevel) {
        super({
          name: 'MenuData',
          pos: vec(0, 0),
          width: 0,
          height: 0,
        });

        this.scene = scene;

        this.menuDiv = document.getElementById('menu');
        this.statPanel = new ReplaceText(document.getElementById('stat-panel'));
        this.scene.add(this.statPanel);

        this.setButtonHandler('train-unit', this.trainUnit.bind(this));
        this.setButtonHandler('mine-gold', this.mineGold.bind(this));
        this.setButtonHandler('add-science', this.addScience.bind(this));
        this.setButtonHandler('auto-train', this.autoTrain.bind(this));
        this.setButtonHandler('auto-mine', this.autoMine.bind(this));
        this.setButtonHandler('auto-mine', this.autoMine.bind(this));

        this.cooldownButtons = [
            'train-unit',
            'mine-gold',
            'add-science',
        ].map(id => document.getElementById(id));
    }

    setButtonHandler(elemId: string, handler: (element: HTMLElement, event: Event) => void) {
        const element = document.getElementById(elemId);
        element.addEventListener('click', (event) => handler(element, event));
    }

    override onPreUpdate(engine: Engine, elapsedMs: number): void {
        this.checkCooldownButtons(elapsedMs);
        this.updateStatPanel();
    }

    private checkCooldownButtons(elapsedMs: number) {
        if (this.clickCooldown > 0) {
            // Disable buttons during cooldown
            this.cooldownButtons.forEach(button => button.classList.add('disabled'));
        }

        // Handle cooldown for buttons
        if (this.clickCooldown > 0) {
            this.clickCooldown -= elapsedMs;
            if (this.clickCooldown <= 0) {
                this.cooldownButtons.forEach(button => button.classList.remove('disabled'));
            }
        }
    }

    private updateStatPanel() {
        const playerBase = gameState.playerBase;
        const statState = this.statPanel.state;
        statState.set('gold', playerBase.gold.toString());
        statState.set('science', playerBase.science.toString());
        statState.set('units', playerBase.getSoliders().length.toString());
    }

    trainUnit(element: HTMLElement, event: Event) {
        if (this.clickCooldown > 0) return; // Prevent action if cooldown is active

        gameState.playerBase.doSpawning();
        this.clickCooldown = this.clickCooldownTime; // Reset cooldown
    }

    mineGold() {
        if (this.clickCooldown > 0) return; // Prevent action if cooldown is active

        gameState.playerBase.addGold(1); // Add 1 gold
        this.clickCooldown = this.clickCooldownTime; // Reset cooldown
    }

    addScience() {
        if (this.clickCooldown > 0) return; // Prevent action if cooldown is active

        gameState.playerBase.addScience(1);
        this.clickCooldown = this.clickCooldownTime; // Reset cooldown
    }

    autoTrain() {

    }

    autoMine() {

    }

    autoScience() {

    }

    override onInitialize() {
        setGameScale(this.scene.engine);

        const screen = this.scene.engine.screen;
        const pageCoords = screen.worldToPageCoordinates(vec(10, screen.height - 210));
        document.documentElement.style.setProperty('--menu-pos-x', `${pageCoords.x}px`);
        document.documentElement.style.setProperty('--menu-pos-y', `${pageCoords.y}px`);

        this.menuDiv.classList.remove('hide')
    }
}
