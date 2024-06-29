import rawData from "./data/questions.test.json";
import { Game } from "./models/Game";
import { Qiuz } from "./models/Quiz";
import { Message } from "./models/Message";
import { CLI } from "./utils/CLI";
import { Question } from "./types";

const questions: Question[] = rawData;
const quiz = new Qiuz(questions);
const message = new Message(CLI);
const game = new Game(quiz, message, CLI);

game.start();
