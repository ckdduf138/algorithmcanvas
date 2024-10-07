// 랜덤 RGB 색상을 생성하는 함수
export const generateRandomNumbers = (min: number, max: number, number: number): number[] => {
  const result: number[] = [];

  for (let i = 0; i < number; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      result.push(randomNumber);
  }

  return result;
};

// n -> log10(n) 변환
export const getLogScale = (value: number) => {
    return Math.log10(value + 2);
};

// 거리 계산
export const distance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};

// generate UUID
export function generateUUID(): string {
  let d = new Date().getTime();
  let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16;
      if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
      } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
  });
}

// get random int
export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};