'use client';
import { useState } from "react";

export default function AikenToGift() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertToGift = () => {
    const questions = input.trim().split(/\n(?=\d+\.\s)/);
    const giftQuestions = questions.map((q) => {
      const lines = q.trim().split("\n");
      const questionText = lines[0].replace(/^\d+\.\s*/, "").trim();
      const answers = lines.slice(1, -1);
      const correct = lines[lines.length - 1].split(":")[1].trim();
      const options = answers.map((line) => {
        const letter = line.trim().charAt(0);
        const text = line.slice(2).trim();
        if (letter === correct) return `=${text}`;
        else return `~%-33.33333%${text}`;
      });
      return `${questionText} {\n${options.join("\n")}\n}`;
    });
    setOutput(giftQuestions.join("\n\n"));
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Conversor AIKEN a GIFT con Penalización</h1>
      <textarea
        className="w-full h-64 border border-gray-300 rounded p-2 mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Pega aquí tus preguntas en formato AIKEN..."
      />
      <button
        onClick={convertToGift}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Convertir a GIFT
      </button>
      <h2 className="text-xl font-semibold mt-6 mb-2">Resultado:</h2>
      <textarea
        className="w-full h-64 border border-gray-300 rounded p-2"
        value={output}
        readOnly
        placeholder="Aquí aparecerá el resultado en formato GIFT..."
      />
    </main>
  );
}
