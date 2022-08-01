export default function dateFormat(date) {
  const dateObj = new Date(date);
  const result = dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return result.split(",");
}
