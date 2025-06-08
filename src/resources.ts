import { ImageSource, Loader, Resource, SpriteSheet } from "excalibur";
import swordPath from './assets/sword.png'; // Webpack asset/resource loader will find the image path
import BackgroundPath from './assets/background.png'; // Webpack asset/resource loader will find the image path

// It is convenient to put your resources in one place
export const Resources = {
  Sword: new ImageSource(swordPath),
  Background: new ImageSource(BackgroundPath)
} as const; // the 'as const' is a neat typescript trick to get strong typing on your resources. 

// We build a loader and add all of our resources to the boot loader
// You can build your own loader by extending DefaultLoader
export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
