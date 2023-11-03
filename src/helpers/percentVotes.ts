export const percentVotes = (num1: number, num2: number) => {
  const total = num1 + num2;

  const percentNum1 = Math.floor((num1 / total) * 100);
  if (percentNum1 === 50) return 51;
  return percentNum1;
};
