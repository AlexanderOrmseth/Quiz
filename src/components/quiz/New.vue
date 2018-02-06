<template>
	<div>
		<div class="content-wrap">
			<h1 class="main-title">New Quiz</h1>
		</div>

		<div class="outer new-question">
			<div class="content-wrap">
                <div class="input-field-wrap">
                    <div class="row">
                        <label>question #{{numberOfQuestions+1}}</label>
                        <input ref="question" autofocus @keyup.enter="addQuestion" class="textbox" v-model.trim="title" type="text">
                    </div>
                    <div class="row">
                        <label>answer</label>
                        <input ref="answer" @keyup.enter="addQuestion" class="textbox" v-model.trim="answer" type="text">
                    </div>
                </div>
				<div class="button-row">
					<button
						class="btn btn-blue"
						@click="addQuestion">
						Add Question
					</button>
				</div>
			</div>
		</div>
		<div class="content-wrap">
			<div class="start-quiz flex-parent">
				<div class="left">
					<p>{{amountOfQuestions}}</p>
					<button
						:disabled="numberOfQuestions<2"
						class="btn-link"
						@click="shuffle">
						Shuffle
					</button>
					<button
						:disabled="numberOfQuestions<1"
						class="btn-link"
						@click="swap">
						swap
					</button>
					<button
						@click="showModal = true">
						Import/Export
					</button>
				</div>
				<div class="right">
					<button :disabled="numberOfQuestions<1" class="btn btn-blue" @click="startQuizz">Start Quiz</button>
				</div>
			</div>

			<ul v-click-outside="editFalse" class="question-list">
				<transition-group name="list" tag="li">
                    <li
                        class="question"
                        v-for="(question, i) in quiz"
                        :key="question.id"
                        v-bind:class="{ edit: question.edit }">

                        <header class="question-header flex-parent">
                            <div class="left"><p>question #{{i+1}}</p></div>
                            <div class="right">
                                <button
                                    :disabled="numberOfQuestions<2"
                                    @click="move({
                                        id: question.id,
                                        up: true
                                    })">
                                    <i class="fa fa-angle-up"></i>
                                </button>
                                <button
                                    :disabled="numberOfQuestions<2"
                                    @click="move({
                                        id: question.id,
                                        up:false
                                    })">
                                    <i class="fa fa-angle-down"></i>
                                </button>
                                <button
                                    @click="removeQuestion(question.id)">
                                    <i class="fa fa-remove"></i> remove
                                </button>
                            </div>
                        </header>

                        <div @click="editQuestion(question.id)" class="question-content">
                            <transition mode="out-in" name="editAnimation">
                                <div key="noEdit" v-if="!question.edit" class="no-edit">
                                    <h2>{{question.title}}</h2>
                                    <p>{{question.answer}}</p>
                                </div>
                                <div key="edit" v-else class="edit">
                                    <input
                                        class="input-text input-title"
                                        v-model.lazy.trim="question.title"
                                        type="text">
                                    <input
                                        class="input-text input-answer"
                                        v-model.lazy.trim="question.answer"
                                        type="text">
                                </div>
                            </transition>
                        </div>
                    </li>
				</transition-group>
			</ul>
		</div>
		<app-modal v-if="showModal" @close="showModal = false"></app-modal>
	</div>
</template>

<script>
import { quizMixin } from "./quizMixin";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import Modal from "../quiz/sub_components/modal/Modal";
import ClickOutside from "vue-click-outside";
export default {
  data() {
    return {
      title: "",
      answer: "",
      showModal: false,
      modalName: "appImport"
    };
  },
  components: {
    appModal: Modal
  },
  mixins: [quizMixin],
  computed: {
    ...mapGetters(["quiz", "numberOfQuestions", "getId"]),
    amountOfQuestions() {
      var x = this.numberOfQuestions;
      var string = "";
      x == 1 ? (string = x + " question") : (string = x + " questions");
      return string;
    }
  },
  directives: {
    ClickOutside
  },
  mounted() {
    this.$refs.question.focus();
  },
  methods: {
    // ACTIONS FROM STORE
    ...mapActions([
      "shuffle",
      "pushNewQuestion",
      "incrementId",
      "removeQuestion",
      "swap",
      "resetQuiz",
      "editQuestion",
      "move"
    ]),
    addQuestion() {
      if (!!this.title && !!this.answer) {
        this.incrementId();

        var question = {
          title: this.title.charAt(0).toUpperCase() + this.title.slice(1),
          answer: this.trimAnswer(this.answer),
          id: this.getId,
          edit: false
        };

        this.pushNewQuestion(question);
        this.$refs.question.focus();
        this.title = this.answer = "";
      } else {
        if (!!this.title) {
          this.$refs.answer.focus();
        } else {
          this.$refs.question.focus();
        }
      }
    },
    startQuizz() {
      if (this.numberOfQuestions > 0) {
        this.resetQuiz();
        this.$router.push({ name: 'quiz' });
      }
    },
    editFalse() {
      for (let i = 0; i < this.quiz.length; i++) {
        const element = this.quiz[i];
        element.edit = false;
      }
      console.log("CLICKED OUTSIDE");
    }
  }
};
</script>

<style lang="scss" scoped>
.editAnimation-enter-active,
.editAnimation-leave-active {
  transition: all 0.1s;
}
.editAnimation-enter {
  opacity: 0;
  transform: translateX(20px);
}
.editAnimation-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.new-question {
  background: rgba(49, 49, 51, 0.9);
  .content-wrap {
    height: 250px;
    display: flex;
    flex-direction: column;
  }
  .input-field-wrap {
    flex-basis: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .button-row {
    margin-top: 2em;
  }
  input[type="text"] {
    margin-top: 0.3em;
    padding: 6px;
    background: #383838;
    border: 1px solid #595959;
    color: #dbdbdb;
    &:hover {
      border: 1px solid #5f5f5f;
    }
    &:focus,
    &:active {
      background: #2f2f2f;
      border: 1px solid #276cb5;
      box-shadow: 0 0 8px rgba(39, 108, 181, 0.49);
    }
  }
  label {
    font-weight: 500;
    text-transform: uppercase;
    font-size: 13px;
    color: #9e9e9f;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  }
}

ul.question-list {
  margin-top: 1em;
  position: relative;
}
li.question + li.question {
  margin-top: 1em;
}

/*
	Li Animation
*/

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate(-40px, -40px);
}
.list-leave-to {
  opacity: 0;
  transform: translate(40px, -40px);
}
.list-leave-active {
  position: absolute;
}

/*
	Question
*/
li.question {
  transition: all 0.3s ease-in-out;
  background: #fff;
  width: 100%;
  border: 1px solid rgb(217, 223, 230);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  &:hover {
    border: 1px solid #cfd1d2;
  }
  &:hover .question-header .right button {
    display: block;
  }
  /* HEADER */
  &.edit {
    .question-header {
      background: #fff7d1;
    }
  }
  .question-header {
    color: rgb(104, 104, 104);
    overflow: auto;
    border-bottom: 1px solid #e8ecef;
    padding: 0.3em 0.5em;
    background: #f6f6f6;
    p {
      font-size: 12px;
      line-height: 22px;
    }
    button {
      display: none;
      cursor: pointer;
      font-size: 12px;
      float: left;
      background: none;
      white-space: nowrap;
      padding: 1px 4px;
      border: 1px solid rgba(27, 31, 35, 0.15);
      border-radius: 3px;
      &:hover {
        color: #222;
        border: 1px solid rgba(27, 31, 35, 0.32);
      }
      &:disabled {
        cursor: not-allowed;
      }
      & + button {
        margin-left: 0.5em;
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
  }
  /* CONTENT */
  .question-content {
    padding: 0.7em;
    h2,
    .input-title {
      font-size: 1.8em;
      margin: 0.3em 0 0.6em;
    }
    .edit {
      .input-text {
        width: 100%;
        display: block;
        font-size: 100%;
        padding: 3px 5px;
        background: #fafafa;
        border: 1px solid #c6c6c6;
        transition: all 0.075s linear;
        border-radius: 3px;
        &.input-title {
          font-size: 1.8em;
        }
        &:focus,
        &:active {
          background: #fff;
          border: 1px solid #276cb5;
          box-shadow: 0 0 4px rgba(39, 108, 181, 0.4);
        }
      }
    }
  }
}

/* Start Quiz */
.start-quiz {
  p {
    font-weight: 500;
    margin-right: 1em;
  }
  .left,
  .right {
    display: flex;
    align-items: center;
  }
  .left {
    button + button {
      margin-left: 0.4em;
    }
    button {
      cursor: pointer;
      white-space: nowrap;
      padding: 3px 8px;
      border: 0;
      border-radius: 3px;
      color: #444;
      background: rgb(243, 243, 243);
      position: relative;
      &:disabled {
        cursor: not-allowed;
        opacity: 0.4;
      }
      &:after {
        content: "";
        position: absolute;
        height: 1px;
        width: 80%;
        background: #222;
        left: 10%;
        bottom: 2px;
        opacity: 0;
      }
      &:not(:disabled):hover {
        border: 0;
        color: #222;
        background: rgb(234, 234, 234);
      }
      &:not(:disabled):hover:after {
        transition: all 0.1s linear;
        opacity: 0.75;
        bottom: 4.5px;
      }
    }
  }
  .right button {
    padding: 0.5em 0.8em;
  }
}

div.row + div.row {
  margin-top: 1em;
}
.flex-parent {
  display: flex;
  flex-direction: row;
  & > .left {
    flex-grow: 1;
  }
}

@media (max-width: 550px) {
  .start-quiz {
    .left,
    .right {
      display: block;
    }
    .left {
      p {
        margin-bottom: 1em;
        margin-right: 0;
      }
      button + button {
        margin-left: .8em;
      }
    }
    .right {
      margin-top: 1em;
    }
  }
  .flex-parent {
    display: block;
  }

  .new-question {
    .content-wrap {
      height: auto;
      display: block;
    }
    .input-field-wrap {
      display: block;
    }
  }
}
</style>
