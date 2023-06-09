import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const useBeerFilter = () => {
  return useSearchParams().get("filter");
};

export const useResolveBeerFilter = () => {
  const filter = useSearchParams().get("filter");
  const router = useRouter();

  useEffect(() => {
    if (!filter) {
      router.replace("/beer-gallery?filter=all");
    }
  }, [filter, router]);

  return filter;
};
