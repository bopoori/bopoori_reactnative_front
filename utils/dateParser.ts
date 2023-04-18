export default function dateParser(date: Date) {
  return date
    .toLocaleDateString("kr-ko", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll(". ", "-")
    .split(".")[0];
}
