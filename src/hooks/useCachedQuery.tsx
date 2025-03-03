// 'use client';

// import { useQuery, useQueryClient } from '@tanstack/react-query';

// // 🔹 Helper function to get cached data or fetch new data
// export const useCachedQuery = <T,>(
//   queryKey: string[],
//   queryFn: () => Promise<T>
// ) => {
//   const queryClient = useQueryClient();
//   const cachedData = queryClient.getQueryData<T>(queryKey);

//   return useQuery({
//     queryKey,
//     queryFn,
//     enabled: !cachedData, // ✅ Fetch only if no cache
//     initialData: cachedData, // ✅ Use cache if available
//     staleTime: 5 * 60 * 1000,
//   });
// };

'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

// 🔹 Custom hook that fetches or returns cached data while refetching stale data
export const useCachedQuery = <T,>(
  queryKey: string[],
  queryFn: () => Promise<T>
) => {
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<T>(queryKey);
  const cachedDataUpdatedAt =
    queryClient.getQueryState(queryKey)?.dataUpdatedAt || 0;

  return useQuery({
    queryKey,
    queryFn,
    enabled: true, // ✅ Always allow refetching in the background
    initialData: cachedData, // ✅ Use cached data initially
    initialDataUpdatedAt: cachedDataUpdatedAt, // ✅ Ensures proper refetch logic
    staleTime: 5 * 60 * 1000, // ✅ 5 min before data is considered stale
    // refetchOnMount: true, // ✅ Ensures data refresh when component mounts
    // refetchOnWindowFocus: true, // ✅ Refresh when user refocuses tab
  });
};
