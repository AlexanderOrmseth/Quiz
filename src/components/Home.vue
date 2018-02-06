<template>
    <div>
        <div class="content-wrap">
            <h1 class="main-title">Quiz App</h1>
            <router-link tag="button" class="btn btn-blue" :to="{ name: 'new' }">create a new quiz</router-link>
            <button class="btn btn-blue" @click="importQuiz">Import Quiz</button>
            <app-modal v-if="showModal" @close="showModal = false"></app-modal>
        </div>
    </div>
</template>

<script>
import Modal from "./quiz/sub_components/modal/Modal";
export default {
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    importQuiz() {
      this.showModal = true;
    }
  },
  components: {
    appModal: Modal
  }
};
</script>
