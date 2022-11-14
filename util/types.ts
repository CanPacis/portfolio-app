export interface Program {
  command: {
    value: "print" | "define" | "help" | "action";
    position: Position;
  };
  arguments: Expression[];
  flags: Flag[];
  position: Position;
}

export type Expression = Identifier | StringLiteral | NumberLiteral;

export interface Identifier extends Position {
  type: "identifier";
  value: string;
}

export interface StringLiteral extends Position {
  type: "string";
  value: string;
}

export interface NumberLiteral extends Position {
  type: "int";
  value: number;
}

export interface Flag extends Position {
  type: "flag";
  value: string;
}

export interface Position {
  line: number;
  col: number;
}

export interface Pointer {}
