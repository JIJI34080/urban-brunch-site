'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { loadFile, saveFile } from '@/app/admin/actions';
import { editableFiles } from '@/lib/editable-files';
import { toast } from 'sonner';

export default function AdminPanel() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [filePath, setFilePath] = useState(editableFiles[0]);
  const [content, setContent] = useState('');
  const [loading, startTransition] = useTransition();
  const adminKey = process.env.NEXT_PUBLIC_ADMIN_KEY;

  const handleLogin = () => {
    if (password === adminKey) {
      setAuthenticated(true);
      toast.success('Bienvenue !');
      startTransition(async () => {
        const data = await loadFile(filePath);
        setContent(data);
      });
    } else {
      toast.error('Invalid password');
    }
  };

  const handleLoad = (path: string) => {
    startTransition(async () => {
      const data = await loadFile(path);
      setContent(data);
    });
  };

  const handleSave = () => {
    startTransition(async () => {
      try {
        await saveFile(filePath, content);
        toast.success('Saved');
      } catch (error) {
        toast.error('Error while saving');
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-sm space-y-4 rounded-3xl border border-beige bg-white/90 p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <Button onClick={handleLogin}>Entrer</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-beige bg-white/90 p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Label>Fichier</Label>
            <Select
              value={filePath}
              onValueChange={(value) => {
                setFilePath(value);
                handleLoad(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select file" />
              </SelectTrigger>
              <SelectContent>
                {editableFiles.map((file) => (
                  <SelectItem key={file} value={file}>
                    {file}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={() => handleLoad(filePath)} disabled={loading}>
            Recharger
          </Button>
        </div>
        <Textarea value={content} onChange={(event) => setContent(event.target.value)} className="min-h-[400px] font-mono text-xs" />
        <Button onClick={handleSave} disabled={loading}>
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
