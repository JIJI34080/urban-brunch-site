'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { editableFiles } from '@/lib/editable-files';

export { editableFiles };

export async function loadFile(filePath: string) {
  if (!editableFiles.includes(filePath)) {
    throw new Error('Forbidden file');
  }
  const absolutePath = path.join(process.cwd(), filePath);
  const content = await fs.readFile(absolutePath, 'utf-8');
  return content;
}

export async function saveFile(filePath: string, content: string) {
  if (!editableFiles.includes(filePath)) {
    throw new Error('Forbidden file');
  }
  JSON.parse(content);
  const absolutePath = path.join(process.cwd(), filePath);
  await fs.writeFile(absolutePath, content);
  return { success: true };
}
