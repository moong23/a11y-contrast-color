import ContentComponent from "./Content";

export default function Home() {
  return (
    <main className="max-w-[60rem] h-fit flex flex-col justify-between items-center gap-10 p-10 bg-white border border-slate-300 rounded-md relative">
      <span className="absolute flex flex-row gap-1 right-1 top-1">
        <a
          href="https://www.npmjs.com/package/a11y-contrast-color"
          target="_blank"
        >
          <img
            src="https://img.shields.io/npm/v/a11y-contrast-color.svg?style=flat-square"
            alt="version"
          />
        </a>
        <a
          href="https://npmtrends.com/a11y-contrast-color"
          target="_blank"
        >
          <img
            src="https://img.shields.io/npm/dt/a11y-contrast-color"
            alt="downloads"
          />
        </a>
        <a
          href="https://github.com/moong23/a11y-contrast-color"
          target="_blank"
        >
          <img
            height="20px"
            src="https://img.shields.io/badge/Github Repository-181717?style=flat-square&logo=Github&logoColor=white"
          />
        </a>
      </span>
      <ContentComponent />
    </main>
  );
}
