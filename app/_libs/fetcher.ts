import { redirect } from "next/navigation";

type FetchArgs = Parameters<typeof fetch>;

export async function fetcher<T>({
  url,
  args,
}: {
  url: FetchArgs[0];
  args: FetchArgs[1];
}): Promise<T> {
  const response = await fetch(url, args);

  if (!response.ok) {
    redirect("/");
  }

  const json: T = await response.json();

  return json;
}
