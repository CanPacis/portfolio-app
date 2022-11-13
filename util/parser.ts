import grammar from "./grammar";
import { Parser, Grammar } from "nearley";

export const parserFactory = () => {
  return new Parser(Grammar.fromCompiled(grammar));
}