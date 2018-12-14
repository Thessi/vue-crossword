import Board from "../model/board";

export default class BoardService {
    private quizBoards: Board[] = [];

    constructor() {
        const board1 = new Board("board1");
        board1.AddWord("2", 0);
        board1.AddWord("PLANKALKÜL", 4);
        board1.AddWord("BJARNE", 1);
        board1.AddWord("SQL", 1);
        board1.AddWord("PHP", 1);
        board1.AddWord("-", 0, true);
        board1.AddWord("E", 0);
        board1.AddWord("X", 0);
        board1.AddWord("8", 0);
        board1.AddWord("9", 0);
        board1.AddWord("TURING", 2);
        board1.AddWord("-", 0, true);
        board1.AddWord("0", 0);
        board1.AddWord("7", 0);
        board1.AddWord("1941", 2);
        board1.AddWord("KUWAIT", 2);
        board1.AddWord("J", 0);

        this.quizBoards.push(board1);
    }

    public GetQuizByName(name: string): Board {
        const board = this.quizBoards.find((b: Board) => b.boardName === name);
        return !board ? new Board("") : board;
    }
}
