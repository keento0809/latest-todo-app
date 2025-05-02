import { Suspense } from "react";
import { LoadComp } from "../_components/loadComp/LoadComp";

export default async function Page() {
  const response = await fetch("http://localhost:3000/api/load");
  const data = (await response.json()) as { text: string };
  const text = data.text;

  return (
    <Suspense fallback={<div>Loading with Suspense...</div>}>
      <LoadComp text={text} />
    </Suspense>
  );
}
