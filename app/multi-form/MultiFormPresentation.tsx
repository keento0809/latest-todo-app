import Link from "next/link";
import { MultiForm } from "./_components/multiForm/MultiForm";

export const MultiFormPresentation = () => {
  return (
    <>
      <div className="py-8">
        <Link
          href="/load"
          className="block py-2 px-8 rounded-lg border border-purple-500 text-md hover:scale-105 transition-all"
        >
          To Load
        </Link>
      </div>
      <MultiForm />
    </>
  );
};
