import fs from 'fs';
import { invokeLLM } from './server/_core/llm.js';

const esJson = JSON.parse(fs.readFileSync('client/src/lib/locales/es.json', 'utf-8'));
const enJson = JSON.parse(fs.readFileSync('client/src/lib/locales/en.json', 'utf-8'));

const pages = ['latex', 'gamuza', 'peloLargo', 'tela', 'silicona', 'main'];

console.log('Translating Spanish FAQs to English...');

for (const page of pages) {
  const spanishFAQs = esJson.gorros[page].faqs;
  
  const prompt = `Translate these swimming cap FAQs from Spanish to English. Maintain technical accuracy and SEO-friendly language.

Input (Spanish FAQs):
${JSON.stringify(spanishFAQs, null, 2)}

Output only valid JSON array with same structure: [{"question": "...", "answer": "..."}]`;

  const response = await invokeLLM({
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: "json_object" }
  });

  const translated = JSON.parse(response.choices[0].message.content);
  
  // Handle both direct array and wrapped object responses
  const faqsArray = Array.isArray(translated) ? translated : (translated.faqs || translated.result || []);
  
  enJson.gorros[page].faqs = faqsArray;
  console.log(`✓ Translated ${page}: ${faqsArray.length} FAQs`);
}

fs.writeFileSync('client/src/lib/locales/en.json', JSON.stringify(enJson, null, 2), 'utf-8');
console.log('✓ English FAQs added to en.json');
