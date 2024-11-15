const Prompt = (data) => {
  const prompt = `I have a JSON containing the details of a resume. I need you to process this data and enhance it so that the resume looks more professional and is grammatically correct. You should improve the wording, adjust the tone, and organize the content while preserving the structure and data categories.

Here is the resume data in JSON format:

${data}
Please process the JSON and return the improved version with a more professional and polished presentation while keeping the structure intact and also keep in mind there should be no extra text except the resultant json
`;
  return prompt;
};

export default Prompt;
