export const quizMixin = {
    methods:{
        trimAnswer(string){
            if(!!string){
                var result = string.replace(/[&\/\\#()~%'":<>{}]/g, '');
                return result.charAt(0).toUpperCase() + result.slice(1);
            }
            else{
                return "";
            }

        }
    }
};