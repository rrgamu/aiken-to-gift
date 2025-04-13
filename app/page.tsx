import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AikenToGift() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertToGift = () => {
    const raw = input.trim();
    const blocks = raw.split(/(?=\d+\.\s)/);
    const giftQuestions = blocks.map((block) => {
      const lines = block.trim().split("\n");
      if (lines.length < 3) return "";

      let questionText = "";
      const answerLines = [];
      let correctAnswer = "";

      for (let line of lines) {
        if (line.startsWith("A.") || line.startsWith("B.") || line.startsWith("C.")) {
          answerLines.push(line);
        } else if (line.startsWith("ANSWER:")) {
          correctAnswer = line.split(":")[1].trim();
        } else {
          questionText += (questionText ? " " : "") + line.trim();
        }
      }

      const options = answerLines.map((line) => {
        const letter = line.trim().charAt(0);
        const text = line.slice(2).trim();
        if (letter === correctAnswer) return `=${text}`;
        else return `~%-33.33333%${text}`;
      });

      return `${questionText} {\n${options.join("\n")}\n}`;
    });

    setOutput(giftQuestions.filter(Boolean).join("\n\n"));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Conversor AIKEN a GIFT con Penalización</h1>
      <p className="mb-2 text-sm text-muted-foreground">
        Pega tus preguntas en formato AIKEN abajo y pulsa el botón para generar el formato GIFT listo para importar en Moodle.
      </p>
      <Textarea
        className="h-64 mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Pega aquí tus preguntas en formato AIKEN..."
      />
      <Button onClick={convertToGift}>Convertir a GIFT</Button>
      <h2 className="text-xl font-semibold mt-6 mb-2">Resultado:</h2>
      <Textarea
        className="h-64"
        value={output}
        readOnly
        placeholder="Aquí aparecerá el resultado en formato GIFT..."
      />
    </div>
  );
}
