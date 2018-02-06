import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        quiz: [],
        score: 0,
        id: 1,
        exportedQuiz: null
    },

    // getters
    getters: {
        quiz: state => {
            return state.quiz;
        },
        numberOfQuestions: state => {
            return state.quiz.length;
        },
        score: state => {
            return state.score;
        },
        getId: state => {
            return state.id;
        },
        exportedQuiz: state => {
            return state.exportedQuiz;
        }
    },


    // action
    actions: {
        incrementId: ({commit}) => {
            commit("incrementId");
        },
        setSvar: ({ commit }, order) =>{
            commit("setSvar", order)
        },
        checkScore: ({commit}) =>{
            commit("checkScore");
        },
        resetQuiz: ({commit}) => {
            commit("resetQuiz");
        },
        newQuiz: ({commit}) => {
            commit("newQuiz");
        },
        pushNewQuestion: ({commit}, question) => {
            commit("pushNewQuestion", question);
        },
        shuffle: ({commit}) => {
            commit("shuffle");
        },
        removeQuestion: ({ commit }, id) =>{
            commit("removeQuestion", id)
        },
        editQuestion: ({commit}, id) => {
            commit("editQuestion", id);
        },
        move: ({ commit }, order) =>{
            commit("move", order)
        },
        swap: ({commit}) => {
            commit("swap");
        },
        importQuiz: ({ commit }, newQuiz) =>{
            commit("importQuiz", newQuiz)
        },
        exportQuiz: ({commit}) => {
            commit("exportQuiz")
        }
    },

    // mutation
    mutations: {
        incrementId(state) {
            state.id += 1;
        },
        setSvar (state, {index, dittSvar}) {
            state.quiz[index].dittSvar = dittSvar;

            if (state.quiz[index].dittSvar == state.quiz[index].answer){
                state.quiz[index].isCorrect = true;
            }
            else{
                state.quiz[index].isCorrect = false;
            }
        },
        checkScore (state){
            state.score = 0;
            for (let i = 0; i < state.quiz.length; i++) {
                const element = state.quiz[i];

                if (element.answer.toLowerCase() == element.dittSvar.toLowerCase()){
                    console.log(element.answer + " | " + element.dittSvar);
                    state.score++;
                }
                else{
                    console.log("Wrong");
                }

            }
        },
        resetQuiz (state){
            for (let i = 0; i < state.quiz.length; i++) {
                const element = state.quiz[i];
                element.dittSvar = "";
            }
        },
        newQuiz (state){
            state.quiz = [];
        },
        pushNewQuestion (state, question ){
            state.quiz.push(question);
        },
        shuffle(state){
            state.quiz = state.quiz.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
        },
        removeQuestion(state, id){
            var i = state.quiz.map(function(item) { return item.id; }).indexOf(id);
            state.quiz.splice(i, 1);
        },
        editQuestion(state, id){
            var index = state.quiz.map(function(item) { return item.id; }).indexOf(id);
            for (let i = 0; i < state.quiz.length; i++) {
                const element = state.quiz[i];
                if (element.id == id){
                    element.edit = true;
                }
                else{
                    element.edit = false;
                }
            }
        },
        move(state, {id, up}){
            var index = state.quiz.map(function(item) { return item.id; }).indexOf(id);
            var element = state.quiz[index];
                state.quiz.splice(index, 1);

                if (up){
                    if (index == 0){
                        state.quiz.splice(state.quiz.length, 0, element);
                    } else {
                        state.quiz.splice(index-1, 0, element);
                    }
                } else {
                    if (index+1 == state.quiz.length+1){
                        state.quiz.splice(0, 0, element);
                    } else {
                        state.quiz.splice(index+1, 0, element);
                    }
                }
        },
        swap(state){
            for (let i = 0; i < state.quiz.length; i++) {
                const question = state.quiz[i];
                var temp = question.answer;
                question.answer = question.title;
                question.title = temp;
            }
        },
        importQuiz(state, newQuiz){
            state.quiz = JSON.parse(newQuiz);
        },
        exportQuiz(state){
            state.exportedQuiz = JSON.stringify(state.quiz);
        },
    }
});