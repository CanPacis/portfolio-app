declare class Go {
  importObject: any;
  run(instance: WebAssembly.Instance): Promise<void>;
}

declare function parse(input: string): Promise<void>;
