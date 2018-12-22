<template>
    <div id="app">
        <header>
            <h2>Weihnachtsquiz</h2>
        </header>
        <QuizBoard class="board" ref="board"/>
        <button class="navigateButton left" @click="moveLeft">&lt;</button>
        <button class="navigateButton right" @click="moveRight">&gt;</button>
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
html,
body {
    overflow: hidden;
    position: relative;
    height: 100%;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width: 100%;
}

header {
    height: 60px;
    width: 100%;
    position: fixed;
    background-color: #55bcc9;
    margin: -20px -40px 0 -8px;
    box-shadow: 0 1px 5px 1px #555;
    color: #eee;
    text-align: center;
    vertical-align: center;
    z-index: 100;
}

.board {
    position: absolute;
    top: 60px;
    padding: 0 5px 20px 5px;
    width: 100%;
}

.navigateButton {
    border: none;
    height: 100%;
    width: 10%;
    position: fixed;
    top: 48px;
    bottom: 0;
    background-color: #eefaffd8;
    font-size: 32px;
}

.left {
    left: 0;
    margin-left: 0;
    box-shadow: 1px 1px 2px 1px #999;
}

.right {
    right: 0;
    box-shadow: -1px 1px 2px 1px #999;
}
</style>
