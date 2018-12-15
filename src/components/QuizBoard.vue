<template>
    <div>
        <div class="board" ref="board" :style="{gridAutoColumns: getCellSizeString, gridAutoRows: getCellSizeString, left: left}">
            <template v-for="(word, colIndex) in board.words">
                <Cell v-for="(letter, rowIndex) in word.letters" :key="letter.id" :ref="colIndex + '/' + rowIndex"
                    :fixedText="word.fixed ? letter.letter : ''" :solved="word.solved"
                    @valueChanged="valueChanged($event, colIndex, rowIndex)" @delete="jumpBack(colIndex, rowIndex)"
                    :style="{gridRow: (rowIndex + getRowStartForWord(word) + 1).toString(), gridColumn: colIndex + 1}">
                </Cell>
            </template>
        </div>
        <template v-if="questionActive">
            <div class="questionOverlay"></div>
            <Question :text="!activeWord ? '' : activeWord.question" :questionNum="realWordIndex" @answer="onAnswer"></Question>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import BoardService from "../services/boardService";
import Board from "../model/board";
import Cell from './Cell.vue';
import Question from './Question.vue';
import Word from "../model/word";

@Component({
  components: {
    Cell,
    Question
  },
})
export default class QuizBoard extends Vue {
    private activeWordIndex: number = 0;

    private boardService: BoardService;

    private board: Board = new Board("");
    private rowNum: number = 1;
    private colNum: number = 1;
    private center: number = 0;
    private maxLength: number = 0;
    private left: string = "0px";
    private questionActive = true;

    get realWordIndex(): number {
        var index = this.activeWordIndex + 1;

        var index = index - this.board.words.slice(0, index).filter((value: Word) => value.fixed).length;

        return index;
    }

    get getCellSizeString(): string {
        return this.getCellSize() + "px";
    }

    get activeWord(): Word {
        return this.board.words[this.activeWordIndex];
    }

    private onAnswer(): void {
        this.questionActive = false;
        this.changeWordFocus(this.activeWordIndex);
    }

    private getCellSize(): number {
        return (window.innerHeight - 200) / this.maxLength;
    }

    public moveRight(): void {
        if (this.activeWordIndex < this.colNum - 2 && this.board.words[this.activeWordIndex + 1].fixed)
            this.activeWordIndex += 2;
        else if (this.activeWordIndex < this.colNum - 1 && !this.board.words[this.activeWordIndex + 1].fixed)
            this.activeWordIndex++;

        this.left = window.innerWidth / 2 - (this.getCellSize() / 2) - (this.getCellSize() * this.activeWordIndex) + "px";
        this.questionActive = true;
    }

    public moveLeft(): void {
        if (this.activeWordIndex > 1 && this.board.words[this.activeWordIndex - 1].fixed)
            this.activeWordIndex -= 2;
        else if (this.activeWordIndex > 0 && !this.board.words[this.activeWordIndex - 1].fixed)
            this.activeWordIndex--;

        this.left = window.innerWidth / 2 - (this.getCellSize() / 2) - (this.getCellSize() * this.activeWordIndex) + "px";
        this.questionActive = true;
    }

    private changeWordFocus(newNum: number) {
        ((this.$refs[newNum + '/0'] as any)[0].$el as any).focus();
    }

    private getRowStartForWord(word: Word): number {
        return this.center - word.center;
    }

    private jumpBack(colIndex: number, rowIndex: number)  {
        if (rowIndex > 0)
            ((this.$refs[colIndex + '/' + (rowIndex - 1)] as any)[0].$el as any).focus();
    }

    private valueChanged(value: string, colIndex: number, rowIndex: number)  {
        const word = this.board.words[colIndex];
        this.$set(word.wordInput, rowIndex, value);

        if (word.wordInput.join("") === word.value) {
            word.solved = true;
            if (this.board.words.every((w: Word) => w.solved)) {
                // Trigger success
            }
        }
        else
            word.solved = false;

        if (value.length > 0 && rowIndex < word.value.length - 1)
            ((this.$refs[colIndex + '/' + (rowIndex + 1)] as any)[0].$el as any).focus();
    }

    private mounted() {
        this.boardService = new BoardService();
        this.board = this.boardService.GetQuizByName("board1");

        this.rowNum = this.board.GetLongestWord();
        this.colNum = this.board.words.length;
        this.center = this.board.GetCenter();

        this.maxLength = this.board.GetMaxLength();

        this.left = window.innerWidth / 2 - (this.getCellSize() / 2) + "px";
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .board {
        display: grid;
        grid-column-gap: 2px;
        grid-row-gap: 2px;
        margin: -3% 500px 0 -8px
    }

    .questionOverlay {
        position: fixed;
        top: 0;
        padding-left: 10%;
        padding-right: 10%;
        height: 100%;
        width: 100%;
        background-color: #85144b33;
    }
</style>
