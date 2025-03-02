'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

// 🔹 Helper function to get cached data or fetch new data
export const useCachedQuery = <T,>(
  queryKey: string[],
  queryFn: () => Promise<T>
) => {
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<T>(queryKey);

  return useQuery({
    queryKey,
    queryFn,
    enabled: !cachedData, // ✅ Fetch only if no cache
    initialData: cachedData, // ✅ Use cache if available
    staleTime: 5 * 60 * 1000,
  });
};
