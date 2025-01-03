import { fetcher } from "@/app/_libs/fetcher";
import { client } from "@/app/_libs/hono";
import { formatISOToCustomString } from "@/app/_utils/utils";
import { InferResponseType } from "hono";

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

  return (
    <div className="flex flex-col gap-4">
      <p>{res.todo?.title}</p>
      <p>
        {res.todo?.updatedAt
          ? formatISOToCustomString(res.todo?.updatedAt)
          : ""}
      </p>
    </div>
  );
}
