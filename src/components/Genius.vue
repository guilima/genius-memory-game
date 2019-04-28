<template>
  <section>
    <p class="score">Score: {{ sequence.length && sequence.length - 1 }}</p>
    <div class="bright">
      <button
        class="button-color"
        v-for="button in buttons"
        :key="button.type"
        :class="{ 'bright-enter': button.active }"
        @click="onColorClick(button)"
        :disabled="sequence.length === 0"
        :style="{
          backgroundColor: colors[button.type],
          color: colors[button.type]
        }"
      ></button>
    </div>
    <button @click="addNextColor()" :disabled="sequence.length > 0">
      Iniciar
    </button>
    <p>
      {{ message }}
    </p>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IOptionalColorNumbers, IColors, IButtons } from "./IGenius";

@Component
export default class Genius extends Vue {
  private buttons: IButtons[];
  private sequence: IOptionalColorNumbers[];
  private quantity: number;
  private currentSequence: number;
  private colors: IColors;
  private message: string;
  constructor() {
    super();
    this.sequence = [];
    this.buttons = [];
    this.currentSequence = 0;
    this.quantity = 4;
    this.message = "";
    this.colors = {
      1: "red",
      2: "blue",
      3: "green",
      7: "brown",
      5: "purple",
      6: "orange",
      4: "yellow"
    };
  }
  created() {
    this.createButtons();
  }

  private createButtons(): void {
    this.buttons = Array.from({ length: this.quantity }, (_, k) => ++k).map(
      button => ({
        type: button,
        active: false
      })
    );
  }

  private setRandomcolor(): IOptionalColorNumbers {
    return Math.ceil(Math.random() * this.quantity) as IOptionalColorNumbers;
  }

  get isLastSequence(): boolean {
    return this.sequence.length - 1 === this.currentSequence;
  }

  private activeColor(button: IButtons, cooldown: number = 550): Promise<{}> {
    return new Promise((resolve, reject) => {
      button.active && reject("Calma, jovem.");
      button.active = true;
      setTimeout(() => {
        button.active = false;
      }, 350);
      setTimeout(() => {
        resolve("ok");
      }, cooldown);
    });
  }

  private async addNextColor() {
    this.sequence = [...this.sequence, this.setRandomcolor()];
    this.currentSequence = 0;
    for (var i = 0; i < this.sequence.length; i++) {
      var seq = this.sequence[i];
      await this.activeColor(this.buttons[seq - 1], 700);
    }
    console.log(this.sequence);
  }

  private reset(error: string = ""): void {
    this.sequence = [];
    this.message = error;
  }

  public async onColorClick(button: IButtons) {
    try {
      await this.activeColor(button);
    } catch (error) {
      console.log(error);
      return;
    }
    var isColorCorrect = this.sequence[this.currentSequence] === button.type;
    if (this.isLastSequence && isColorCorrect) {
      this.message = "Muito bem! Continue assim.";
      setTimeout(() => {
        this.addNextColor();
      }, 500);
    } else if (isColorCorrect) {
      ++this.currentSequence;
    } else {
      this.reset("Sequência incorreta");
    }
  }
}
</script>

<style scoped lang="scss">
.bright > * {
  transition: filter 0.25s linear, z-index 1s linear;
  z-index: 1;
  filter: drop-shadow(0px 0px 0px);
}
.bright-enter,
.bright-leave-to {
  z-index: 20;
  filter: drop-shadow(0px 0px 10px);
}

.button-color {
  border: none;
  height: 80px;
  width: 100px;
  position: relative;
}
</style>
