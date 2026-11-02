import { globSync } from 'node:fs';
import { resolve } from 'node:path';
import { HtmlValidate } from 'html-validate';

const root = resolve(process.env.SITE_DIR || '_site');
const files = globSync(`${root}/**/*.html`);
if (!files.length) throw new Error(`No built HTML found in ${root}`);
const validator = new HtmlValidate({ extends: ['html-validate:standard'] });
let errors = 0;
for (const file of files) {
  const report = await validator.validateFile(file);
  for (const result of report.results) {
    for (const message of result.messages) {
      console.error(`${file}:${message.line}:${message.column} ${message.ruleId}: ${message.message}`);
      errors++;
    }
  }
}
if (errors) process.exitCode = 1;
else console.log(`HTML validation passed for ${files.length} files`);
