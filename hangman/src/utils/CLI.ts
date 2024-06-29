import readlinePromises from "readline/promises";
import chalk from "chalk";
import figlet from "figlet";
import { UserInterface, Color } from "../types";



// readlinePromisesインターフェイスのインスタンスを作成
const readline = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ユーザーインターフェイスの実装
export const CLI: UserInterface = {
  async input(): Promise<string> {
    const input = await readline.question("文字または単語を推測してください: ");
    return input.replaceAll(" ,", "").toLowerCase();
  },

  clear(): void {
    console.clear();
  },

  destroy(): void {
    readline.close();
  },

  output(message: string, color: Color = "white"): void {
    console.log(chalk[color](message), "\n");
  },

  outputAnswer(message: string): void {
    console.log(figlet.textSync(message, { font: "Big"}), "\n");
  },
}
