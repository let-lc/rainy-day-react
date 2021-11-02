import { Layout, RainingBackground, YTPlayer } from "@rd/components";

const HomePage = () => {
  return (
    <Layout>
      <main className="relative z-10 flex flex-col items-center justify-center flex-grow">
        <div className="flex flex-col items-start max-w-5xl w-full animate-float hover:animate-none">
          <div className="flex items-start select-none">
            <img
              src="/img/logo.svg"
              className="w-12 h-12"
              alt="Logo"
              draggable={false}
            />
            <h1 className="text-white/75 text-3xl font-mono">Rainy Day</h1>
          </div>
          <YTPlayer />
        </div>
      </main>
      <footer className="w-full h-full flex justify-center z-10 text-center">
        <p className="text-xs text-white/50 pt-1 select-none">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline hover:text-white"
            href="https://github.com/let-lc/rainy-day"
          >{`<source_code/>`}</a>
          <span>This is a personal project for study purpose only.</span>
        </p>
      </footer>
      {/* raining background */}
      <RainingBackground />
    </Layout>
  );
};

export default HomePage;
