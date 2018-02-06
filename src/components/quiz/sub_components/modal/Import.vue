<template>
    <div>
        <label>paste exported quiz in this field</label>
        <input @keyup.enter="importQuiz('/quiz')" ref="tb" v-model="tb" class="textbox" type="text">
        <p></p>
        <div class="button-row">
            <button @click="importQuiz('/quiz')" class="btn btn-blue">start quiz</button>
            <button @click="importQuiz('/new')" class="btn btn-blue">edit quiz</button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tb: ""
    };
  },
  mounted() {
    this.$refs.tb.focus();
  },
  methods: {
    importQuiz(path) {
      if (
        /^[\],:{}\s]*$/.test(
          this.tb
            .replace(/\\["\\\/bfnrtu]/g, "@")
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              "]"
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
        )
      ) {
        this.$store.dispatch("importQuiz", this.tb);
        this.$parent.$emit("close");
        this.$router.push({ path: path });
      } else {
        console.log("Couldn't import quiz!");
      }
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 1em;
}
label {
  text-transform: uppercase;
  font-size: 12px;
  color: #838383;
  font-weight: 500;
  margin-bottom: 0.4em;
  display:block;
}
.textbox {
  max-width: 100%;
}
</style>
