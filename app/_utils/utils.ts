export function generateRandomDigits() {
  return Number(
    Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join("")
  );
}
