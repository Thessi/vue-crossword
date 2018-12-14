<template>
    <div id="app">
        <header style="text-algin: center; vertical-align: center;">
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
    private mounted() {
        const el = document.body;
        el.classList.add("hideOverflow");
    }

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
    width: 105%;
    position: fixed;
    background-color: #85144b;
    margin: -20px -40px 0 -8px;
    box-shadow: 0 1px 10px 1px black;
    color: #eee;
}

.board {
    position: absolute;
    top: 100px;
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
    background-color: #85144b55;
    font-size: 32px;
}

.left {
    left: 0;
    box-shadow: 1px 10px 20px 5px #555;
}

.right {
    right: 0;
    box-shadow: -1px 10px 20px 5px #555;
}
</style>
