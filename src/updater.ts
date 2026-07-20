export class Updater {
  static start(callback: () => void, interval = 1000) {
    callback();

    setInterval(() => {
      callback();
    }, interval);
  }
}
