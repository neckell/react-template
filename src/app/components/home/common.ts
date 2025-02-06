
export const normalizeTime = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number)
  // If it's early morning (before 6 AM), add 24 hours to sort after night times
  return hours < 6 ? (hours + 24) * 60 + minutes : hours * 60 + minutes
}