import { StatusCodes } from "http-status-codes";
import axios from "axios";

export const generateQuestions = async (req, res, next) => {
    const { domain, experience_years, skills, projects } = req.body;

    const flaskServerUrl = "http://127.0.0.1:5001/generate-questions"; 
    const requestData = { domain, experience_years, skills, projects };

    try {
        const response = await axios.post(flaskServerUrl, requestData);

        res.status(StatusCodes.ACCEPTED).json({
            success: true,
            questions: response.data
        });
    } catch (error) {
        next(new Error("Failed to fetch questions from Flask server", { cause: StatusCodes.INTERNAL_SERVER_ERROR }));
    }
};
