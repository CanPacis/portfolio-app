import React from "react";
import { Command } from "../store/commands";
import { parserFactory } from "./parser";
import { Pointer, Program } from "./types";
import styles from "../components/screen/styles.module.css";

const parser = parserFactory();

export interface HeapValue {
  value: string | string;
  component: string;
}

export class Heap {
  private values: Map<string, HeapValue> = new Map();

  set(key: string, value: HeapValue) {
    this.values.set(key, value);
  }

  get(key: string) {
    return this.values.get(key);
  }
}
export class Engine {
  heap: Heap = new Heap();

  async run(line: string): Promise<Command> {
    let parsed;
    let error = null;

    const state = parser.save();
    try {
      parser.feed(line);
      parsed = parser.results[0] as Program;
    } catch (_error) {
      error = _error;
    } finally {
      parser.restore(state);
    }

    if (!parsed) {
      return {
        input: line,
        output: this.createResponse("[Error] Invalid command... probably 🤷‍♂️"),
        id: `id-${Math.random()}`,
      };
    }

    let output: React.FC | null = null;

    switch (parsed.command.value) {
      case "print":
        output = this.print(parsed);
        break;
      case "define":
        output = this.define(parsed);
        break;
      case "help":
        output = this.help(parsed);
        break;
      case "action":
        output = this.action(parsed);
        break;
    }

    return {
      input: line,
      output: output || this.createResponse("[I don't know how you got here]"),
      id: `id-${Math.random()}`,
    };
  }

  print(program: Program): React.FC {
    const { arguments: args } = program;

    if (args.length !== 1) {
      return this.createResponse("[Error] Invalid number of arguments");
    }

    const [key] = args;

    if (key.type !== "identifier") {
      return this.createResponse("[Error] Invalid argument type");
    }

    const value = this.heap.get(key.value);

    return this.createResponse(
      value?.value || "[Error] Invalid key",
      value?.component
    );
  }

  define(program: Program): React.FC {
    console.log(program);
    const { arguments: args, flags } = program;

    if (args.length !== 2) {
      return this.createResponse("[Error] Invalid number of arguments");
    }

    const [key, value] = args;

    if (key.type !== "identifier") {
      return this.createResponse("[Error] Invalid key");
    }

    if (value.type !== "string" && value.type !== "identifier") {
      return this.createResponse("[Error] Invalid value");
    }

    if (value.type === "identifier") {
      const heapValue = this.heap.get(value.value);

      if (!heapValue) {
        return this.createResponse("[Error] Invalid value");
      }

      this.heap.set(key.value, heapValue);
      return this.createResponse(`✅ Done. ${key.value} == &${value.value}`);
    }

    let component = "div";

    if (flags[0]) {
      if (flags[0].type !== "flag") {
        return this.createResponse("[Error] Invalid flag");
      }

      component = flags[0].value;
    }

    this.heap.set(key.value, { value: value.value, component });

    return this.createResponse(`✅ Done. ${key.value} == "${value.value}"`);
  }

  help(program: Program): React.FC {
    return this.createResponse("Help");
  }

  action(program: Program): React.FC {
    return this.createResponse("Action");
  }

  createResponse(value: string, component = "div"): React.FC {
    const c = () =>
      React.createElement(
        component,
        { className: styles.command_response },
        value
      );
    return c;
  }
}
