import GhostFinder from '@/components/ghost-finder';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(hsl(var(--accent))_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <div className="z-10 flex flex-col items-center text-center space-y-6 mb-12">
        <Image
          src="/logo.png"
          alt="Haunted Name"
          width={400}
          height={291}
          priority
        />
        <p className="text-lg text-muted-foreground max-w-2xl">
          Setiap nama menyimpan cerita, setiap cerita memiliki penunggunya.
        </p>
      </div>

      <GhostFinder />
    </main>
  );
}
