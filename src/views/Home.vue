<template>
  <div class="home">
    <Genius />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Genius from "@/components/Genius.vue";

@Component({
  components: {
    Genius
  }
})
export default class Home extends Vue {}
</script>
