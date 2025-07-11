import { useParams } from "react-router-dom";
export default function DummyPage() {
  const { dummy } = useParams();
  return (
    <div className="size-full min-h-screen flex items-center justify-center">
      <div className="bg-amber-400 text-center h-32 p-5 rounded-md flex items-center justify-center flex-col">
        <h1 className="text-3xl uppercase">Ini path {dummy}</h1>
        <p>Page ini hanya untuk testing navbar</p>
      </div>
    </div>
  );
}
