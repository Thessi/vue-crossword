<template>
    <div class="board" ref="board" :style="{gridAutoColumns: getCellSizeString, gridAutoRows: getCellSizeString, left: left}">
        <template v-for="(word, colIndex) in board.words">
            <Cell v-for="(letter, rowIndex) in word.letters" :key="letter.id" :ref="colIndex + '/' + rowIndex"
                :fixedText="word.fixed ? letter.letter : ''" :solved="word.solved"
                @valueChanged="valueChanged($event, colIndex, rowIndex)" @delete="jumpBack(colIndex, rowIndex)"
                :style="{gridRow: (rowIndex + getRowStartForWord(word) + 1).toString(), gridColumn: colIndex + 1}">
            </Cell>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import BoardService from "../services/boardService";
import Board from "../model/board";
import Cell from './Cell.vue';
import Word from "../model/word";

@Component({
  components: {
    Cell,
  },
})
export default class QuizBoard extends Vue {
    private activeWord: number = 0;

    private boardService: BoardService;

    private board: Board = new Board("");
    private rowNum: number = 1;
    private colNum: number = 1;
    private center: number = 0;
    private maxLength: number = 0;
    private left: string = "0px";

    get getCellSizeString(): string {
        return this.getCellSize() + "px";
    }

    private getCellSize(): number {
        return (window.innerHeight - 200) / this.maxLength;
    }

    public moveRight(): void {
        if (this.activeWord < this.colNum - 2 && this.board.words[this.activeWord + 1].fixed) {
            this.activeWord += 2;
            this.onWordChange(this.activeWord - 1, this.activeWord);
        }
        else if (this.activeWord < this.colNum - 1 && !this.board.words[this.activeWord + 1].fixed) {
            this.activeWord++;
            this.onWordChange(this.activeWord - 1, this.activeWord);
        }
        else
            this.onWordChange(this.activeWord, this.activeWord);
    }

    public moveLeft(): void {
        if (this.activeWord > 1 && this.board.words[this.activeWord - 1].fixed) {
            this.activeWord -= 2;
            this.onWordChange(this.activeWord + 1, this.activeWord);
        }
        else if (this.activeWord > 0 && !this.board.words[this.activeWord - 1].fixed) {
            this.activeWord--;
            this.onWordChange(this.activeWord + 1, this.activeWord);
        }
        else
            this.onWordChange(this.activeWord, this.activeWord);
    }

    private onWordChange(oldNum: number, newNum: number) {
        this.board.words[oldNum].active = false;
        this.board.words[newNum].active = true;
        this.left = window.innerWidth / 2 - (this.getCellSize() / 2) - (this.getCellSize() * newNum) + "px";
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
        /*else if(value.length === 0 && rowIndex > 0)
            ((this.$refs[colIndex + '/' + (rowIndex - 1)] as any)[0].$el as any).focus();*/
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
        margin-right: 500px;
    }
</style>
