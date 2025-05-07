import { fetcher } from "@/app/_libs/fetcher";
import { client } from "@/app/_libs/hono";
import { InferResponseType } from "hono";
import { TodosIdContainer } from "./TodosIdContainer";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const url = client.api.todos[":id"].$url({
    param: { id },
  });
  type ResponseType = InferResponseType<
    (typeof client.api.todos)[":id"]["$get"]
  >;

  const res = await fetcher<ResponseType>({
    url,
    args: { next: { tags: [`todos/${id}`] } },
  });

  const todoData = res.todo;

  if (!todoData) {
    return <div>Todo not found</div>;
  }

  return <TodosIdContainer todo={todoData} />;
}
