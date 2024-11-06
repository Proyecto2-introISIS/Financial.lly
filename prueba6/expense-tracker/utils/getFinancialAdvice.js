import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
})


const getFinancialAdvice = async (totalBudget, totalSpend) => {
    console.log(totalBudget, totalSpend)
    try {
        const userPrompt = `
        Based on the following financial data: 
        - Total Budget: ${totalBudget} COP
        - Expenses: ${totalSpend} COP
        Provide detailed financial advice in 2 sentences to help the user manage their finances more effectively
        `;

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4",
            messages:[{role: "user", content: userPrompt }],
        });

        const advice = chatCompletion.choices[0].message.content;

        console.log(advice);
        return advice;
    } catch (error) {
        console.error("Error fetching financial advice:", error);
        return "Lo siento, no puedo analizar la información financiera en este momento. Por favor intenta de nuevo más tarde.";
    }
};

export default getFinancialAdvice