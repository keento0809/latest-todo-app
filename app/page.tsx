import { getTodos } from "./_actions/todoActions";
import { HomeContainer } from "./Home";

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="min-h-svh flex justify-center items-center">
      <HomeContainer todos={todos} />
    </div>
  );
}
