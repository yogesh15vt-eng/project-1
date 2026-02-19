
import { GoogleGenAI, Type } from "@google/genai";
import { Student } from "../types";

export const generateAttendanceReport = async (students: Student[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const studentDataString = students.map(s => 
    `${s.name}: ${s.attendancePercent}%`
  ).join(', ');

  const prompt = `Analyze the following student attendance data: ${studentDataString}. 
  1. Identify students with less than 75% attendance.
  2. Provide a brief overall summary of the class performance.
  3. Offer 3 actionable recommendations for the instructor to improve attendance.
  Keep the response structured and professional. Use markdown formatting.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text || "Failed to generate report.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Could not generate AI report. Please check your connection or API key.");
  }
};
