import { Choice } from "../constants/ChoiceEnum";
import type PlayerInterface from "../interfaces/PlayerInterface";

export class Player implements PlayerInterface {
	name: string;
	choice: Choice;

	constructor(name?: string, choice?: Choice) {
        if(!name) {
            name = "BOT";
        }
        if(!choice || name == "BOT") {
            choice = this.getRandomChoice();
        }
		this.name = name;
		this.choice = choice;
	}

	getRandomChoice(): Choice {
		const choices = Object.values(Choice);
		return choices[Math.floor(Math.random() * choices.length)];
	}
}
