import { Damagable } from "@/actors/damagable";
import { Vector } from "excalibur";

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

  return targets
    .map((target) => ({ target, distance: position.distance(target.pos) }))
    .reduce((closest: TargetDistance, current: TargetDistance) => {
      if (closest.target === null || current.distance < closest.distance) {
        return current;
      } else {
        return closest;
      }
    }).target;
}

export function scatterLocation(
  position: Vector,
  radius: number
): Vector {
    const angle = Math.random() * 2 * Math.PI; // Random angle
    const direction = new Vector(Math.cos(angle), Math.sin(angle));
    return position.add(direction.scale(radius));
}