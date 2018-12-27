<template>
    <div>
        <div class="questionOverlay"></div>
        <div class="questionText">
            <p class="question-num">{{questionNum}}.</p>
            <p class="text-left" v-html="text"></p>
            <button @click="$emit('answer')">Antwort</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Question extends Vue {
    @Prop() private questionNum: number;
    @Prop() private text: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .question-num {
        font-size: 40px;
        font-weight: bold;
    }

    .text-left {
        text-align: left;
        color: #fff;
        font-weight: 700;
        background-color: #000000aa;
    }

    .questionText {
        position: absolute;
        top: -50px;
        padding: 0 10%;
        left: 50%;
        max-width: 80%;
        transform: translateX(-50%);
        font-size: 18px;
        z-index: 10000;
    }

    button {
        width: 200px;
        height: 15%;
        border: none;
        font-size: 32px;
        background-color: #000;
        border: 1px #eee solid;
        color: #fff;
        z-index: 1000;
    }

    button:hover {
        background-color: #001f3fff;
    }

    .questionOverlay {
        position: fixed;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(90, 101, 107, 0.664);
    }
</style>
