export default function cellBackgroundColor(value?: number | null): string {
  switch (value) {
    case 2:
      return '#e2efe5'
    case 4:
      return '#d4e7d8'
    case 8:
      return '#c6e0cc'
    case 16:
      return '#b8d8bf'
    case 32:
      return '#a9d0b2'
    case 64:
      return '#9bc9a6'
    case 128:
      return '#8dc199'
    case 256:
      return '#7fb98c'
    case 512:
      return '#134e5e'
    case 1024:
      return '#114654'
    case 2048:
      return '#0f3e4b'
    case 4096:
      return '#0d3641'
    default:
      return '#a0b8be'
  }
}
