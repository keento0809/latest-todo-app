import { useRouter } from "next/navigation";

export const useFooter = () => {
  const router = useRouter();

  function handleNavigateToHome() {
    router.push("/");
    router.refresh();
  }

  return {
    handleNavigateToHome,
  };
};
