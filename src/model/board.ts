import Word from "./word";

export default class Board {

    public words: Word[];

    constructor(public boardName: string) {
        this.words = [];
    }

    public AddWord(word: string, center: number, question: string, fixed?: boolean) {
        this.words.push(new Word(word, center, question, fixed));
    }

    public GetCenter(): number {
        return Math.max(...this.words.map<number>((word: Word) => word.center));
    }

    public GetLongestWord(): number {
        return Math.max(...this.words.map<number>((word: Word) => word.value.length));
    }

    public GetMaxLength(): number {
        return this.GetCenter() + Math.max(...this.words.map<number>((word: Word) => word.value.length - word.center));
    }
}
