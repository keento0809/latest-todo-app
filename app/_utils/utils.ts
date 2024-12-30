export function generateRandomDigits() {
  return Number(
    Array.from({ length: 36 }, () => Math.floor(Math.random() * 10)).join("")
  );
}
