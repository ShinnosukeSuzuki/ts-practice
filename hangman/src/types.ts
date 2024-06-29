import { Stage } from "./models/Stage";

export  type Question = {
  word: string;
  hint: string;
}

export type GameState = {
  stage: Stage;
  done: boolean;
}

export type Color = "red" | "green" | "yellow" | "white" ;

export type UserInterface = {
  input(): Promise<string>;
  clear(): void;
  destroy(): void;
  output(message: string, color?: Color): void;
  outputAnswer(message: string): void;
}

