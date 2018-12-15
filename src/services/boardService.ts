import Board from "../model/board";

export default class BoardService {
    private quizBoards: Board[] = [];

    constructor() {
        const board1 = new Board("board1");
        board1.AddWord("2", 0, "0x02 ?");
        board1.AddWord("BJARNE", 1, "Erfinder von C++: Vorname ?");
        board1.AddWord("SQL", 1,  "Abkürzung für 'Structure Query Language' ?");
        board1.AddWord("PLANKALKÜL", 4, "Erste höhere Programmiersprache ?");
        board1.AddWord("PHP", 1, "Abkürzung für 'PHP: Hypertext Processor' ?");
        board1.AddWord("-", 0, '', true);
        board1.AddWord("E", 0, '14<sub>10</sub> = ?<sub>16</sub> ?');
        board1.AddWord("X", 0, "CHAR(88) ?");
        board1.AddWord("8", 0, "<code style='background-color: #aaa'>int x = 4;<br />int result = x-- * --x;</code>");
        board1.AddWord("9", 0, "1001<sub>2</sub> ?");
        board1.AddWord("TURING", 2, "Urvater der Computer ?");
        board1.AddWord("-", 0, "", true);
        board1.AddWord("0", 0, "23<sub>5</sub> - 16<sub>7</sub> = ?");
        board1.AddWord("7", 0, "Letzte C# Major Version ?");
        board1.AddWord("1941", 2, "Geburtsjahr von Dennis Ritchie ?");
        board1.AddWord("KUWAIT", 2, "Land mit der TLD '.kw' ?");
        board1.AddWord("J", 0, `<code style='background-color: #aaa'>
        def getCharacter(word):<br />
        &nbsp;&nbsp;&nbsp;&nbsp;return word[-4]<br /><br />
        bestProgrammingLanguage = "JAVA"<br />
        result = getCharacter(bestProgrammingLanguage)
        </code>`);

        this.quizBoards.push(board1);
    }

    public GetQuizByName(name: string): Board {
        const board = this.quizBoards.find((b: Board) => b.boardName === name);
        return !board ? new Board("") : board;
    }
}
