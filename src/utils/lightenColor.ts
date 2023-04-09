export default function lightenColor(color: string, opacity: number = 0.8): string {
  if(!color) {
    return ''
  }

  return `rgba(${color.slice(4, -1)}, ${opacity})`
}
