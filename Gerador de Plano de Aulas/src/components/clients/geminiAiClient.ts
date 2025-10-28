import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});

export const useGeneratePlan = () => {
    const [aiResponse, setResponse] = useState<string | null>(null)
    const [error, setError] = useState<unknown | null>(null)

    const generatePlan = async(theme: string, schoolLevel:string, content:string) => {
        setError(null);
        setResponse(null);

        try{
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `Gere um plano de aulas sobre ${theme}, para uma turma que está cursando o ${schoolLevel}, e que deve conter os seguintes temas: ${content}`,
            })

            setResponse(response.text ?? null)
        }catch(e:unknown){
            if(e instanceof Error){
                console.log(e.message)
            }else{
                console.log(e)
            }
        }
    }

    return {aiResponse, error, generatePlan}
}