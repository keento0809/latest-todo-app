import { InferResponseType } from "hono";
import { HomeContainer } from "./Home";
import { fetcher } from "./_libs/fetcher";
import { client } from "./_libs/hono";

const url = client.api.todos.$url();
type ResponseType = InferResponseType<typeof client.api.todos.$get>;

export default async function Home() {
  const res = await fetcher<ResponseType>({
    url: url.toString(),
    args: { next: { tags: ["todos"] } },
  });

  return (
    <div className="min-h-svh flex justify-center items-center">
      <HomeContainer todos={res.todos} />
    </div>
  );
}
