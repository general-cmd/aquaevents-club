import fs from 'fs';

const pages = [
  'client/src/pages/GorrosGamuza.tsx',
  'client/src/pages/GorrosPeloLargo.tsx',
  'client/src/pages/GorrosTela.tsx',
  'client/src/pages/GorrosSilicona.tsx'
];

const dynamicFAQCode = `        {/* FAQ Section */}
        {translations.faqs && translations.faqs.length > 0 && (
          <section className="py-16">
            <div className="container max-w-4xl">
              <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
              <div className="space-y-6">
                {translations.faqs.map((faq: any, index: number) => (
                  <Card key={index}>
                    <CardHeader><CardTitle className="text-lg">{faq.question}</CardTitle></CardHeader>
                    <CardContent><p className="text-gray-600">{faq.answer}</p></CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}`;

for (const page of pages) {
  let content = fs.readFileSync(page, 'utf-8');
  
  // Find FAQ section start and end
  const faqStart = content.indexOf('        {/* FAQ Section */}');
  if (faqStart === -1) continue;
  
  const nextSectionStart = content.indexOf('        {/* Quote Form */', faqStart);
  if (nextSectionStart === -1) continue;
  
  // Replace hardcoded FAQs with dynamic rendering
  const before = content.substring(0, faqStart);
  const after = content.substring(nextSectionStart);
  
  content = before + dynamicFAQCode + '\n\n' + after;
  
  fs.writeFileSync(page, content, 'utf-8');
  console.log(`✓ Updated ${page}`);
}

console.log('✓ All pages updated!');
