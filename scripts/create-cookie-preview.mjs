// Temporary layout-only fixture. Rebuilding removes it from dist.
// Does not clear or modify the user's stored consent.
import {writeFile} from 'node:fs/promises';
import {cookieShell} from '../components/cookies.mjs';
const en=JSON.parse(await (await import('node:fs/promises')).readFile('assets/locales/en.json','utf8')).translations;
for(const lang of ['pt','en']){
  let html=cookieShell.replace('class="cookie-banner"','class="cookie-banner show"');
  if(lang==='en')html=html.replace(/>([^<>]+)</g,(match,text)=>en[text.trim()]?`>${text.replace(text.trim(),en[text.trim()])}<`:match);
  await writeFile(`dist/__cookie-qa-${lang}.html`,`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/assets/styles.css"><title>Cookie banner layout QA</title></head><body style="background:#062c3a">${html}</body></html>`);
}
