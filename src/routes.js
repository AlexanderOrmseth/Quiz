
import Home from "./components/Home.vue"
import NewQuiz from "./components/quiz/New"
import Quiz from "./components/quiz/Quiz"

export const routes = [
    { path: "/quiz", name: 'home', component: Home },
    { path: "/quiz/new", name: 'new', component: NewQuiz },
    { path: "/quiz/quiz", name: 'quiz', component: Quiz }
]