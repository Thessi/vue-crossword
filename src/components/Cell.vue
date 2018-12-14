<template>
    <input type="text" v-if="fixedText" class="cell disabled" disabled :value="fixedText"/>
    <input type="text" v-else v-model="text" class="cell" ref="cell" :style="{backgroundColor: solved ? '#3D9970' : '#fff'}" maxlength="1" 
        @keyup.delete="$emit('delete')"/>
    <!-- <div class="cell"></div> -->
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Cell extends Vue {
    @Prop() private fixedText: string;
    @Prop() private solved: boolean;

    private text: string = "";

    @Watch('text')
    private formatText() {
        this.text = this.text.toUpperCase();
        this.$emit("valueChanged", this.text);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .cell {
        height: 100%;
        width: 100%;
        border: solid black 2px;
        font-size: 18px;
        text-align: center;
        padding: 0px;
        border-radius: 0;
        -webkit-appearance: none;
    }

    .disabled {
        background-color: #aaa;
    }
</style>
