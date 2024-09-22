// 랜덤 RGB 색상을 생성하는 함수
export const generateRandomNumbers = (min: number, max: number, number: number): number[] => {
  const result: number[] = [];

  for (let i = 0; i < number; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      result.push(randomNumber);
  }

  return result;
};

export const getLogScale = (value: number) => {
    return Math.log10(value + 2);
};

export const distance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};