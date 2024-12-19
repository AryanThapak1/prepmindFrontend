const Prompt = (data) => {
  const prompt = `I have a JSON containing resume details. Please enhance and refine the content to make the resume more professional, grammatically accurate, and impactful. Focus on improving the wording, adjusting the tone to be formal yet engaging, and ensuring that the structure and content flow logically. 

- Correct any grammatical errors and typos.
- Refine the language to reflect professionalism.
- Organize the content effectively (e.g., grouping related experiences or skills).
- Ensure the resume remains clear, concise, and easy to read.
- Keep the structure, formatting, and categories intact.

Here is the resume data in JSON format:

${data}

Please process this JSON and return only the improved version in JSON format, without any additional text or explanation. The result should reflect a polished and professional presentation of the original content.`;
  return prompt;
};

export default Prompt;
