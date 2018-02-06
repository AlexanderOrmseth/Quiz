<template>
    <div>
        <div v-if="quiz && quiz.length">

        <div v-if="!ferdig" class="outer question">
            <div class="content-wrap">
                <span class="quizNum">{{questionIndex+1}} / {{numberOfQuestions}}</span>
                <div class="row">
                    <h2 class="question-title">{{quiz[questionIndex].title}}</h2>
                </div>
                <div class="row">
                    <input ref="answer"
                        @focus="focused=true"
                        @blur="focused=false"
                        autofocus
                        @keyup.enter="nextQuestion(true)"
                        class="textbox"
                        v-model.trim="myAnswer"
                        type="text">
                </div>
                <div class="button-row">
                    <button
                        :disabled="questionIndex==0"
                        class="btn btn-blue"
                        @click="previousQuestion(true)">
                        <i class="fa fa-angle-left" aria-hidden="true"></i> previous
                    </button>
                    <button
                        class="btn btn-blue"
                        @click="nextQuestion(true)">
                        {{questionIndex+1>=numberOfQuestions ? "finish " : "next "}}
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="outer overlap score">
                <div class="score-container content-wrap">
                    <div class="score-title-container">
                        <h1 class="score-title">{{score}}/{{numberOfQuestions}}</h1>
                    </div>
                    <div class="options-container">
                        <div>
                            <button
                                class="btn btn-blue"
                                @click="tryAgain">
                                try again
                            </button>
                            <button
                                @click="editQuiz"
                                class="btn btn-blue">
                                edit quiz
                            </button>
                            <button
                                @click="makeNewQuiz"
                                class="btn btn-red">
                                new quiz
                                </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="result-container content-wrap overlap-outer">
                <div v-bind:class="{ correct : question.isCorrect, wrong : !question.isCorrect }" class="result" v-for="(question, i) in quiz" v-bind:key="question.id">
                    <header>
                        <div class="left">question #{{i+1}}</div>
                        <div class="right">
                            <p>{{question.isCorrect ? "correct" : "wrong"}}</p>
                        </div>
                    </header>
                    <div class="result-content">
                        <h2 class="question-title">{{question.title}}</h2>
                        <div class="answers">
                            <div class="correct-answer">
                                <h3>correct answer</h3>
                                <p>{{question.answer}}</p>
                            </div>
                            <div class="your-answer">
                                <h3>your answer</h3>
                                <p>{{question.dittSvar}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div v-else>
            <h1 class="main-title">Couldn't Find Quiz</h1>
            <router-link tag="button" class="btn btn-blue" :to="{ name: 'new' }">create a new quiz</router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { quizMixin } from "./quizMixin";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      questionIndex: 0,
      myAnswer: "",
      ferdig: false,
      focused: false
    };
  },
  mixins: [quizMixin],
  computed: {
    ...mapGetters(["quiz", "numberOfQuestions", "score"])
  },
  mounted() {
    if (this.quiz && this.quiz.length) {
      this.$refs.answer.focus();
    }
  },
  created() {
    window.addEventListener("keyup", this.myMethod);
  },
  destroyed() {
    window.removeEventListener("keyup", this.myMethod);
  },
  methods: {
    ...mapActions(["setSvar", "checkScore", "resetQuiz", "newQuiz"]),
    myMethod(e) {
      if (!this.ferdig && !this.focused) {
        if (e.keyCode == 37) {
          this.previousQuestion(false);
        } else if (e.keyCode == 39) {
          this.nextQuestion(false);
        }
      }
    },
    nextQuestion(setfocus) {
      var order = {
        index: this.questionIndex,
        dittSvar: this.trimAnswer(this.myAnswer)
      };
      // set my answer to store
      this.setSvar(order);

      if (this.questionIndex + 1 >= this.numberOfQuestions) {
        this.ferdig = true;
        this.checkScore();
      } else {
        this.questionIndex++;
        this.myAnswer = this.quiz[this.questionIndex].dittSvar;
        setfocus ? this.$refs.answer.focus() : this.$refs.answer.blur();
      }
    },
    previousQuestion(setfocus) {
      if (this.questionIndex != 0) {
        this.questionIndex--;
        this.myAnswer = this.quiz[this.questionIndex].dittSvar;
        setfocus ? this.$refs.answer.focus() : this.$refs.answer.blur();
      }
    },
    tryAgain() {
      this.ferdig = false;
      this.questionIndex = 0;
      this.myAnswer = "";
      this.resetQuiz();
    },
    makeNewQuiz() {
      this.newQuiz();
      this.$router.push({ name: 'new' });
    },
    editQuiz() {
      this.resetQuiz();
      this.$router.push({ name: 'new' });
    }
  }
};
</script>

<style lang="scss" scoped>

.question {
  background: rgba(49, 49, 51, 0.9);
  margin-bottom: 0;
  color: #dadada;
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
  .question-title {
    font-size: 2.1em;
  }
  .content-wrap {
    position: relative;
    .quizNum {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}



.score {
  text-align: center;
  background: #f6e27f;
  .score-title {
    color: #251605;
    font-size: 6em;
    margin: 1em 0;
    text-align: center;
    font-weight: 500;
  }
  .options-container {
    button {
      padding: 6px 12px;
      & + button {
        margin-left: 0.4em;
      }
    }
  }
}




.result {
  background: #fff;
  border: 1px solid rgb(217, 223, 230);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  & + .result {
    margin-top: 1em;
  }
  &.wrong {
    .answers {
      display: flex;
      flex-flow: wrap;
      & > div {
        flex: 0 0 50%;
        text-align: center;
      }
      .your-answer p {
        color: rgb(168, 30, 30);
      }
      h3 {
        text-transform: uppercase;
        font-size: 12px;
        color: #838383;
      }
    }
    header {
      .right {
        color: rgb(168, 30, 30);
        p:after {
          content: "\f071";
        }
      }
    }
  }
  &.correct {
    .answers {
      h3,
      .correct-answer {
        display: none;
      }
    }
    header {
      .right {
        color: rgb(19, 129, 47);
        p:after {
          content: "\f00c";
        }
      }
    }
  }
  header {
    display: flex;
    flex-direction: row;
    font-size: 12px;
    padding: 0.3em 0.5em;
    line-height: 22px;
    .left {
      flex-grow: 1;
    }
    .right {
      font-weight: 500;
      p {
        position: relative;
          padding-left: 18px;

        &:after {
          position: absolute;
          font-family: FontAwesome;
          left: 0;
        }
      }
    }
  }
  .result-content {
    padding: 1em;
    .question-title {
      border-bottom: 1px solid #d1d1d1;
      font-size: 2.2em;
      padding-bottom: 0.2em;
      margin-bottom: 1em;
    }
    .answers {
      font-weight: 500;
    }
  }
}

@media (max-width: 1000px) {
.question .question-title {
    font-size: 1.8em;
  }
  .score .score-title {
      font-size: 4em;
  }
}
@media (max-width: 550px) {
    .score .score-title {
      font-size: 3em;
        margin: .7em 0;
  }
  .result{
      &.wrong{
          .answers{
              display: block;
            &>div{
                text-align: left;
            }
              .correct-answer{
                  margin-bottom: 1em;
              }
          }
      }
      .result-content .question-title{
          font-size: 1.7em;
          margin-bottom: .7em;
      }
  }
}


div.row + div.row {
  margin-top: 1em;
}
</style>
