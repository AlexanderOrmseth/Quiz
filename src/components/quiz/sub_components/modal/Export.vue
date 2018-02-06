<template>
    <div>
        <label>Copy quiz (click to select all)</label>

        <p ref="tb" class="exportedQuiz">{{exportedQuiz}}</p>

        <div class="button-row">
            <button @click="$parent.$emit('close')" class="btn btn-red">close</button>
        </div>
    </div>
</template>

<script>
export default {
  mounted() {
    window.getSelection().selectAllChildren(this.$refs.tb);
  },
  computed: {
    exportedQuiz() {
      return this.$store.getters.exportedQuiz;
    }
  },
  created() {
    this.$store.dispatch("exportQuiz");
  },
};
</script>

<style scoped>
.exportedQuiz {
  padding: 6px;
  background: #f3f3f3;
  border: 1px solid #c6c6c6;
  font-size: 14px;
  max-height: 160px;
  overflow-y: auto;
  cursor: pointer;

  -webkit-touch-callout: all; /* iOS Safari */
  -webkit-user-select: all; /* Safari */
  -khtml-user-select: all; /* Konqueror HTML */
  -moz-user-select: all; /* Firefox */
  -ms-user-select: all; /* Internet Explorer/Edge */
  user-select: all; /* Chrome and Opera */
}
h2 {
  margin-bottom: 1em;
}
label {
  text-transform: uppercase;
  font-size: 12px;
  color: #838383;
  font-weight: 500;
  margin-bottom: 0.4em;
  display: block;
}
</style>
