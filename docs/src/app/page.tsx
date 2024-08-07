import ContentComponent from "./Content";

export default function Home() {
  return (
    <main className="w-2/3 flex flex-col justify-start p-10 items-center gap-10 bg-white border border-slate-300 rounded-md h-2/3">
      <h1 className="text-4xl font-bold">🎨 A11y-contrast-color 🎨</h1>
      <ContentComponent />
    </main>
  );
}
