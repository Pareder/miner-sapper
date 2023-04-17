function zeroTime(val: number): string {
  return val > 10 ? `${val}` : '0' + val
}

export default function formatTime(val: number): string {
  const minutes = Math.floor(val / 60)
  const seconds = Number((val % 60).toFixed(3))

  return `${zeroTime(minutes)}:${zeroTime(seconds)}`
}
