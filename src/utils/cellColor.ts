export default function cellColor(value: number | null): string {
  return (value !== null && value < 256) ? '#776E65' : '#ffffff'
}
