export const generateChart = (price: number[]): string => {
  const b = Math.min.apply(null, price);
  const max = Math.max.apply(null, price);
  const k = (max - b) / 56;
  const points = price.map((point, x) => `${x},${56 - (point - b) / k}`);
  return points.join(" ");
};
