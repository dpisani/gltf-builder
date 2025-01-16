export const getMinMaxVectors = (
  points: (number[] | Float32Array)[],
  dimensions: number
): { min: number[]; max: number[] } => {
  // get min and max component values
  const min: number[] = [];
  const max: number[] = [];
  points.forEach(v => {
    for (let i = 0; i < dimensions; i++) {
      min[i] = min[i] === undefined || v[i] < min[i] ? v[i] : min[i];
      max[i] = max[i] === undefined || v[i] > max[i] ? v[i] : max[i];
    }
  });

  return { min, max };
};
