export abstract class Widget {
  protected id: string;

  protected title: string;

  constructor(id: string, title: string) {
    this.id = id;

    this.title = title;
  }

  abstract render(): string;

  setup() {}
}
