import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gradient-to-r  text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide flex items-center gap-2">
            <Image
              src="/football-icon.png"
              alt="Football Icon"
              width={40}
              height={40}
              className="w-10 h-10 md:w-12 md:h-12"
              priority
            />
              Fantasy Football
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
