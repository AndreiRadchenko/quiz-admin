type SortDirection = 'asc' | 'desc';

export function sortItemsByField<T>(
  array: T[],
  field: keyof T,
  direction: SortDirection = 'asc'
): T[] {
  return array.sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    // Handle undefined or null values
    if (valueA == null || valueB == null) {
      return direction === 'asc'
        ? valueA == null
          ? 1
          : -1
        : valueA == null
          ? -1
          : 1;
    }

    // Handle specific types
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return direction === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (valueA instanceof Date && valueB instanceof Date) {
      return direction === 'asc'
        ? valueA.getTime() - valueB.getTime()
        : valueB.getTime() - valueA.getTime();
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return direction === 'asc' ? valueA - valueB : valueB - valueA;
    }

    // Default case (unsupported types)
    throw new Error(`Unsupported field type for sorting: ${typeof valueA}`);
  });
}

type GenericObject = { [key: string]: any };

export function isArrayOrderSame(
  array1: GenericObject[],
  array2: GenericObject[]
): boolean {
  // Check if both arrays have the same length
  if (array1.length !== array2.length) return false;

  return array1.every((obj1, index) => {
    const obj2 = array2[index];

    // Convert objects to JSON strings for comparison
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  });
}
