import ContentComponent from "./Content";

export default function Home() {
  return (
    <main className="max-w-[60rem] h-fit flex flex-col justify-between items-center gap-10 p-10 bg-white border border-slate-300 rounded-md">
      <ContentComponent />
    </main>
  );
}
