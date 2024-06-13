import data from "../../mocks/data_questions.json";
// import data from "../../mocks/data_with_answers.json";
const questions = data.data;

export const initialState = {
   currentQuestion: 0,
   questions: questions
}

export const AppReducer = (state,action) => {
    const {type,id} = action;
    switch(type){
        case 'next':
            return{
                ...state,
                currentQuestion: id
            }
        case 'answer': {
            return{

            }
        }

    }
}