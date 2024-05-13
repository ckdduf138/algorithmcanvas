// 랜덤 RGB 색상을 생성하는 함수
export const getRandomColor = (): string => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

export const getLogScale = (value: number) => {
    return Math.log10(value + 2);
};