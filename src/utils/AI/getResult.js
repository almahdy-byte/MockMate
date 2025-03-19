import { GoogleGenerativeAI } from "@google/generative-ai";

export const evaluateInterviewAnswers = async (interview_data, next) => {
const prompt = `أنت خبير تقني ومُقيّم للمقابلات. لديك قائمة بأسئلة تقنية وإجابات المرشح. المطلوب منك هو:
    
1. تقييم كل إجابة بعلامة من 0 إلى 10 بناءً على دقتها واكتمالها.
2. تحديد الحالة "Correct" أو "Incorrect".
3. إذا كانت العلامة أقل من 6، اقترح موارد تعليمية متنوعة لتحسين الإجابة.

الأسئلة والإجابات:
${interview_data.map(item => `- السؤال: ${item.question}\n  الإجابة: ${item.answer}\n`).join("")}

رجّع النتيجة فقط في صيغة JSON كما يلي:

{
    "scores": [
        {"number": 1, "status": "Correct", "resource": ""},
        {"number": 2, "status": "Incorrect", "resource": "Deep Learning Book by Ian Goodfellow - Chapter 7"}
    ],
    "report": "تقييم شامل للأداء.",
    "total_score": " و يكون نوعه numbr إجمالي التقييم من 100",
    "feedbackTips": {
        "good": [
            {
                "tip": "احرص على استخدام أمثلة عملية من خبرتك عند الإجابة، فهذا يُظهر فهمًا عميقًا للمفاهيم.",
                "status": "good"
            },
            {
                "tip": "تأكد من تقديم إجابات واضحة ومباشرة مع الشرح المناسب عند الحاجة.",
                "status": "good"
            },
            {
                "tip": "إذا كنت متأكدًا من الإجابة، حاول تعزيزها بمعلومات إضافية لإظهار معرفتك المتقدمة.",
                "status": "good"
            }
        ],
        "medium": [
            {
                "tip": "حاول توضيح إجاباتك بمزيد من التفاصيل بدلاً من إعطاء إجابات مختصرة.",
                "status": "medium"
            },
            {
                "tip": "قم بمراجعة بعض المفاهيم الأساسية المتعلقة بالسؤال لضمان الدقة في إجابتك.",
                "status": "medium"
            },
            {
                "tip": "لا تتردد في طلب توضيح السؤال إذا شعرت أنه غير واضح لك.",
                "status": "medium"
            }
        ],
        "bad": [
            {
                "tip": "راجع الأساسيات والمفاهيم الرئيسية في المجال الذي يتمحور حوله السؤال.",
                "status": "bad"
            },
            {
                "tip": "حاول التدرب على الإجابة عن الأسئلة بشكل منطقي ومنظم بدلاً من الإجابات العشوائية.",
                "status": "bad"
            },
            {
                "tip": "استخدم مصادر موثوقة مثل الكتب والمقالات التقنية لفهم الموضوع بعمق.",
                "status": "bad"
            }
        ]
    }
}  و مع مرعاه ان داآما يجب ارجاع feedbackTips ,يجب علي الاقل ان تحتوي علي 3 عناصر تكرار tips ويكون مجموع ال في feedbackTips كلها لا يقل
`
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContent(prompt);
        const evaluation = result.response.candidates[0].content.parts[0].text;

        return JSON.parse(evaluation.slice(7, -4)); // تحويل النص إلى JSON

    } catch (error) {
        return next(new Error("Error calling Gemini API:", error.response?.data || error.message));
    }
};
