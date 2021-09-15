import { Lightning } from 'wpe-lightning-sdk';

export class App extends Lightning.Application {
  static _template() {
    return {
      MyBlueCube:{
        x: 100, y: 200, w: 100, h: 100, rect: true, color: 0xFF0034DD
      },
      MyGreenCube:{
        x: 400, y: 200, w: 100, h: 100, rect: true, color: 0xFF24DD00
      }
    };
  }
}
