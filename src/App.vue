<template>
    <div id="app">
        <header>
            <h2 style="float: left">Weihnachtsquiz</h2>
        </header>
        <QuizBoard class="board" ref="board"/>
        <button @click="moveLeft">&lt;</button>
        <button @click="moveRight">&gt;</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import QuizBoard from './components/QuizBoard.vue';

@Component({
    components: {
        QuizBoard,
    },
})
export default class App extends Vue {
    private moveRight() {
        (this.$refs.board as QuizBoard).moveRight();
    }

    private moveLeft() {
        (this.$refs.board as QuizBoard).moveLeft();
    }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
}

header {
    height: 60px;
    width: 100%;
    background-color: #89cccc;
    margin: -8px -40px 0 -8px;
}

.board {
    position: absolute;
    top: 100px;
    padding: 0 5px 20px 5px;
    width: 100%;
    
}
</style>
