import type { Choice } from "../constants/ChoiceEnum";

export default interface PlayerInterface {
	name: string,
	choice: Choice,
    getRandomChoice(): Choice,
}