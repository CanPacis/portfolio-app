import { parserFactory } from "./parser";

const parser = parserFactory();

export class Engine {
  constructor() {}

  run(line: string) {
    console.log(parser)

    const state = parser.save()
    try {
      parser.feed(line);
      console.log(parser.results);
    } catch (error) {
      console.log(error);
    } finally {
      parser.restore(state);
    }
  }
}
