<template>
    <div class="questionText">
        <p class="question-num">{{questionNum}}.</p>
        <p class="text-left" v-html="text"></p>
        <button @click="$emit('answer')">Answer</button>
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
        background-color: #aaa;
    }

    .questionText {
        margin: auto;
        height: 500px;
        font-size: 18px;
        vertical-align: middle;
        z-index: 10000;
    }

    button {
        position: absolute;
        bottom: 20%;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        height: 10%;
        border: none;
        font-size: 32px;
        background-color: #001f3fcc;
        border: solid 1px #111111;
        color: #aaa;
    }

    button:hover {
        background-color: #001f3fff;
    }
</style>
