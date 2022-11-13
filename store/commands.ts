import {
  Title,
  Subtitle,
  Description,
  Experience,
  Contact,
} from "components/screen/primitives";
import React from "react";
import { atom } from "recoil";

export const DEFAULT_COMMANDS = [
  {
    id: 0,
    input: "print title",
    output: Title,
  },
  {
    id: 1,
    input: "print subtitle",
    output: Subtitle,
  },
  {
    id: 2,
    input: "print description",
    output: Description,
  },
  {
    id: 3,
    input: "print experience",
    output: Experience,
  },
  {
    id: 4,
    input: "print experience",
    output: Contact,
  },
];

export interface Command {
  id: number | string;
  input: string;
  output: React.FC;
}

export const command_store = atom<Command[]>({
  key: "command_store",
  default: DEFAULT_COMMANDS,
});
