import { GoogleGenerativeAI } from "@google/generative-ai"

export const generateQuestionsFromAi=async(position , note , experience_years , degree , next)=>{
const prompt = `
"قم بدور المحاور في مقابلة تقنية لوظيفة ${position}،
 مع الأخذ في الاعتبار ${note}.
  المتقدم لديه ${experience_years} سنوات من الخبرة ويشغل منصب 
  ${degree} (سواء كان Junior أو Mid-Level أو Senior).
   قدم 10 أسئلة تقنية فقط باللغة العربية، متدرجة في الصعوبة من السهل إلى الصعب، بصيغة JSON."
    الصيغة المطلوبة:
    {{
        "questions": [
            {{"number": 1, "question": "السؤال", "difficulty": "سهل"}},
            {{"number": 2, "question": "السؤال", "difficulty": "سهل"}},
            ...
            {{"number": 10, "question": "السؤال", "difficulty": "صعب"}}
        ]
    }}
`


const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
try {
    const result = await model.generateContent(prompt);
    const questions = result.response.candidates[0].content.parts[0].text;
    return JSON.parse(questions.slice(7, -4));

} catch (error) {
    return next(new Error("Error calling Gemini API:",error.response?.data || error.message ))
}
}