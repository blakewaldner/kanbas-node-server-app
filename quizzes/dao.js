import model from "./model.js";
export const createQuiz = (quiz) => model.create(quiz);
export const findAllQuizzes = () => model.find();
export const findQuizById = (quizId) => model.findById(quizId);
export const deleteQuiz = (quizId) =>
    model.deleteOne({ _id: quizId });
export const updateQuiz = (quizId, quiz) =>
    model.updateOne({ _id: quizId }, { $set: quiz });