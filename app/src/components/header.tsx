import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gradient-to-r  text-white shadow-lg">
      <div className=" mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/football-icon.png"
              alt="Football Icon"
              width={40}
              height={20}
              className="w-10 h-8 md:w-12 md:h-10 mr-2"
              priority
            />
            <span className='ml-2'>
              Fantasy Football
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
