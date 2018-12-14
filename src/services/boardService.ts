import Board from "../model/board";

export default class BoardService {
    private quizBoards: Board[] = [];

    constructor() {
        const toniBoard = new Board("toni");
        toniBoard.AddWord("2", 0);
        toniBoard.AddWord("PLANKALKÜL", 4);
        toniBoard.AddWord("BJARNE", 1);
        toniBoard.AddWord("SQL", 1);
        toniBoard.AddWord("PHP", 1);
        toniBoard.AddWord("-", 0, true);
        toniBoard.AddWord("E", 0);
        toniBoard.AddWord("X", 0);
        toniBoard.AddWord("8", 0);
        toniBoard.AddWord("9", 0);
        toniBoard.AddWord("TURING", 2);
        toniBoard.AddWord("-", 0, true);
        toniBoard.AddWord("0", 0);
        toniBoard.AddWord("7", 0);
        toniBoard.AddWord("1941", 2);
        toniBoard.AddWord("KUWAIT", 2);
        toniBoard.AddWord("J", 0);

        this.quizBoards.push(toniBoard);
    }

    public GetQuizByName(name: string): Board {
        const board = this.quizBoards.find((b: Board) => b.boardName === name);
        return !board ? new Board("") : board;
    }
}
