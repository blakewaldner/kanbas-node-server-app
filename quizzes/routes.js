import * as dao from "./dao.js";
function QuizRoutes(app) {
    const createQuiz = async (req, res) => {
        const quiz = await dao.createQuiz(req.body);
        res.json(quiz);
    };
    const findAllQuizzes = async (req, res) => {
        const quizzes = await dao.findAllQuizzes();
        res.json(quizzes);
    };
    const findQuizById = async (req, res) => {
        const quiz = await dao.findQuizById(req.params.quizId);
        res.json(quiz);
    };
    const deleteQuiz = async (req, res) => {
        const status = await dao.deleteQuiz(req.params.quizId);
        res.json(status);
    };
    const updateQuiz = async (req, res) => {
        const { quizId } = req.params;
        try {
            const status = await dao.updateQuiz(quizId, req.body);
            const updatedQuiz = await dao.findQuizById(quizId);
            req.session['currentQuiz'] = updatedQuiz;
            res.json(status);
        } catch (error) {
            res.status(500).json({ message: "An error occurred while updating the quiz", error: error.message });
        }
    };
    app.post("/api/quizzes", createQuiz);
    app.get("/api/quizzes", findAllQuizzes);
    app.get("/api/quizzes/:quizId", findQuizById);
    app.delete("/api/quizzes/:quizId", deleteQuiz);
    app.put("/api/quizzes/:quizId", updateQuiz);
}
export default QuizRoutes;