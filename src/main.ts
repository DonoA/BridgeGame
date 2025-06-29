import { Color, DisplayMode, Engine, FadeInOut, SolverStrategy, vec, Vector } from "excalibur";
import { loader, Resources } from "./resources";
import { GameLevel } from "./levels/gamelevel";

// Goal is to keep main.ts small and just enough to configure the engine

export const engine = new Engine({
  width: 1600, // Logical width and height in game pixels
  height: 1200,
  displayMode: DisplayMode.FitScreen, // Display mode tells excalibur how to fill the window
  pixelArt: true, // pixelArt will turn on the correct settings to render pixel art without jaggies or shimmering artifacts
  scenes: {
    start: GameLevel
  },
  physics: {
    solver: SolverStrategy.Arcade,
  },
  fixedUpdateTimestep: 30 // Turn on fixed update timestep when consistent physic simulation is important
});

engine.start('start', { // name of the start scene 'start'
  loader, // Optional loader (but needed for loading images/sounds)
  inTransition: new FadeInOut({ // Optional in transition
    duration: 1000,
    direction: 'in',
    color: Color.ExcaliburBlue
  })
}).then(() => {

});
