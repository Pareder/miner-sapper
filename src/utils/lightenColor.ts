export default function lightenColor(color: string, opacity: number = 0.8): string {
  return `rgba(${color.slice(4, -1)}, ${opacity})`
}
