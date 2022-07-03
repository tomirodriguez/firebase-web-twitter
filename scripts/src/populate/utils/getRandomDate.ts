export function randomDate(
  start: Date = new Date(2019, 1, 1),
  end: Date = new Date()
) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
