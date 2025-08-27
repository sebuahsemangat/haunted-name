"use client";

import { useState } from 'react';
import type { AssignGhostOutput } from '@/ai/flows/assign-ghost';
import { getGhostForName } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Ghost, Loader2 } from 'lucide-react';

export default function GhostFinder() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssignGhostOutput | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const response = await getGhostForName(name);

    if (response.error) {
      toast({
        variant: 'destructive',
        title: 'Gagal Menemukan',
        description: response.error,
      });
    } else if (response.result) {
      setResult(response.result);
      setIsDialogOpen(true);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <Card className="bg-card/70 backdrop-blur-sm border-border/50 shadow-lg shadow-background/10">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline flex items-center justify-center gap-3 text-foreground">
            <Ghost className="text-primary h-7 w-7" />
            Masukkan Namamu!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="name" className="sr-only">Nama</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Siapa namamu?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                  className="text-center h-12 text-lg"
                  aria-label="Your Name"
                />
            </div>
            <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Mencari...
                </>
              ) : (
                'Temukan Hantu-ku'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-md bg-card/90 backdrop-blur-sm border-border/50">
              <DialogHeader>
                <DialogTitle className="text-center text-4xl font-headline text-primary">
                  {result.ghostName}
                </DialogTitle>
                <DialogDescription className="text-center text-lg text-muted-foreground leading-relaxed pt-4">
                  {result.description}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
