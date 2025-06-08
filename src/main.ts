import { Color, DisplayMode, Engine, FadeInOut } from "excalibur";
import { loader, Resources } from "./resources";
import { GameLevel } from "./levels/gamelevel";

// Goal is to keep main.ts small and just enough to configure the engine

const engine = new Engine({
  width: 1600, // Logical width and height in game pixels
  height: 1200,
  displayMode: DisplayMode.FitScreen, // Display mode tells excalibur how to fill the window
  pixelArt: true, // pixelArt will turn on the correct settings to render pixel art without jaggies or shimmering artifacts
  scenes: {
    start: GameLevel
  },
  // physics: {
  //   solver: SolverStrategy.Realistic,
  //   substep: 5 // Sub step the physics simulation for more robust simulations
  // },
  // fixedUpdateTimestep: 16 // Turn on fixed update timestep when consistent physic simulation is important
});

engine.start('start', { // name of the start scene 'start'
  loader, // Optional loader (but needed for loading images/sounds)
  inTransition: new FadeInOut({ // Optional in transition
    duration: 1000,
    direction: 'in',
    color: Color.ExcaliburBlue
  })
}).then(() => {
  // This is called when the game has started and the start scene is loaded
});