import { Actor, Sprite, vec, Vector } from "excalibur";

export class Background extends Actor {

    sprite: Sprite;

    constructor(sprite: Sprite, size: Vector) {
        super({
          name: 'Background',
          pos: vec(0, 0),
          width: size.x,
          height: size.y,
          anchor: vec(0, 0),
        });

        this.sprite = sprite;
    }

    override onInitialize() {
        // scale to fit background
        this.sprite.scale = vec(this.width / this.sprite.width, this.height / this.sprite.height);
        this.graphics.add(this.sprite);
    }
}
