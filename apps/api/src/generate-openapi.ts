import { mkdir, writeFile } from 'node:fs/promises';
import { createPrivateApp } from './private.ts';
import { createPublicApp } from './public.ts';

const directory = new URL('../openapi/', import.meta.url);
const documents = [
  ['public', createPublicApp()],
  ['private', createPrivateApp(() => Promise.resolve(false))],
] as const;

await mkdir(directory, { recursive: true });

for (const [visibility, app] of documents) {
  const document = app.getOpenAPI31Document({
    openapi: '3.1.0',
    info: { title: `cfla.tech ${visibility} API`, version: '1.0.0' },
  });

  await writeFile(new URL(`${visibility}.json`, directory), `${JSON.stringify(document, null, 2)}\n`);
}
