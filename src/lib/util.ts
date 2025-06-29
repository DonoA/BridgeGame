import { Damagable } from "@/actors/damagable";
import { gameState } from "@/game_state";
import { Engine, vec, Vector } from "excalibur";

interface TargetDistance {
    target: Damagable | null;
    distance: number;
}

export function getClosestTarget(
    targets: Damagable[],
    position: Vector
): Damagable | null {
    if (targets.length === 0) {
        return null;
    }

    const result = targets
        .map((target) => ({ target, distance: position.distance(target.pos) }))
        .reduce((closest: TargetDistance, current: TargetDistance) => {
            if (closest.target === null || current.distance < closest.distance) {
                return current;
            } else {
                return closest;
            }
        }).target;

    return result;
}

export function scatterLocation(
    position: Vector,
    radius: number
): Vector {
    const angle = Math.random() * 2 * Math.PI; // Random angle
    const direction = new Vector(Math.cos(angle), Math.sin(angle));
    return position.add(direction.scale(radius));
}

export function setGameScale(engine: Engine) {
    if (gameState.engineScaled) {
        return; // Already scaled
    }

    const screen = engine.screen;
    const origin = screen.worldToPageCoordinates(Vector.Zero);
    const singlePixel = screen.worldToPageCoordinates(vec(1, 0)).sub(origin);
    const pixelConversion = singlePixel.x;
    document.documentElement.style.setProperty('--pixel-conversion', pixelConversion.toString());

    gameState.engineScaled = true;
}
