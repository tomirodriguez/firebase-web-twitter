export const randomNumber = (max: number) => Math.floor(Math.random() * max);

export const randomArrayOfNumbers = (amount: number, max: number) => {
  const setOfNumbers: Set<number> = new Set();
  while (setOfNumbers.size < amount) {
    setOfNumbers.add(randomNumber(max));
  }

  return Array.from(setOfNumbers);
};
