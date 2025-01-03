export function generateRandomDigits() {
  return Number(
    Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join("")
  );
}

export function formatISOToCustomString(isoDateString: string): string {
  const date = new Date(isoDateString);

  // Extract date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Extract time components
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
