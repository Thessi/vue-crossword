import Letter from "./letter";

export default class Word {
    private static wordIndex: number = 0;
    public solved: boolean;
    public wordInput: string[];
    public id: number;
    public letters: Letter[];

    constructor(public value: string,
                public center: number,
                public question: string,
                public fixed: boolean = false) {
                    this.wordInput  = new Array<string>(value.length);
                    this.id = Word.wordIndex++;
                    this.letters = value.split("").map((letter: string, index: number) =>
                        new Letter(letter, this.id + "/" + index));
                    this.solved = fixed;
                }
}
