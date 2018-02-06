<template>
    <div class="modal">
        <div v-click-outside="exit" class="modal-wrap">
            <header class="tabs">
                <button v-bind:class="{ active: importModal }" @click="importModal = true">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Import
                </button>
                <button :disabled="$store.getters.numberOfQuestions <= 0" v-bind:class="{ active: !importModal }" @click="importModal = false">
                    <i class="fa fa-clone" aria-hidden="true"></i> Export
                </button>
            </header>
            <div class="modal-content">
                <span @click="exit" class="close">&times;</span>
                <div>
                    <component :is="modalName"></component>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Import from "./Import";
import Export from "./Export";
import ClickOutside from 'vue-click-outside'
export default {
  data() {
    return {
      importModal: true
    };
  },
  directives: {
    ClickOutside
  },
  computed: {
    modalName() {
      if (this.importModal) {
        return "appImport";
      } else {
        return "appExport";
      }
    }
  },
  methods: {
    exit() {
      this.$emit("close");
    }
  },
  components: {
    appImport: Import,
    appExport: Export
  },
};
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 1em;
}
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.45); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-wrap {
  background-color: #fefefe;
  margin: 8% auto 0; /* 15% from the top and centered */
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.7);
  max-width: 600px; /* Could be more or less, depending on screen size */
  position: relative;
}
.modal-content {
  padding: 1.2em;
}

.tabs {
  display: flex;
  flex-flow: wrap;
  button {
    flex: 0 0 50%;
    padding: 1em 0;
    font-weight: 500;
    font-size: 14px;
    border: 0;
    background: #f1f1f1;
    &:hover {
      cursor: pointer;
    }
    &.active {
      background: transparent;
      border-bottom: 0;
      background: #276cb5;
      color: #fff;
    }
    &:not(.active):not(:disabled):hover {
      background: #dbdbdb;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }
}

/* The Close Button */
.close {
  color: rgb(231, 231, 231);
  position: absolute;
  bottom: -28px;
  right: 0;
  font-size: 28px;
  line-height: 20px;
  padding: 2px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: rgb(122, 122, 122);
  cursor: pointer;
}
</style>
