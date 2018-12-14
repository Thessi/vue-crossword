import Word from "./word";

export default class Board {

    public words: Word[];

    constructor(public boardName: string) {
        this.words = [];
    }

    public AddWord(word: string, center: number, fixed?: boolean) {
        this.words.push(new Word(word, center, fixed));
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
