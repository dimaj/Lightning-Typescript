import { App } from './App';

window.onload = () => {
  let options = {
    stage: {
      w: 1280,
      h: 720,
      precision: 2 / 3,
      clearColor: 0x00000000,
    },
  };

  // @ts-ignore Being constructed by the Lightning app
  const app = new App(options, {});

  // @ts-ignore adding a new field
  window.App = app;
  document.body.appendChild(app.stage.getCanvas());
};

window.onunload = () => {
  // @ts-ignore
  window.App.destroy();
};
