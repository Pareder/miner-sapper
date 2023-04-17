// TODO: Add specific length to type
type RGB = Array<number>

function luminanace(rgb: RGB): number {
  const a = rgb.map(color => {
    color /= 255
    return color <= 0.03928 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2.4)
  })

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

function contrast(rgb1: RGB, rgb2: RGB): number {
  const luminanceFirst = luminanace(rgb1) + 0.05
  const luminanceSecond = luminanace(rgb2) + 0.05

  if (luminanceFirst > luminanceSecond) {
    return luminanceFirst / luminanceSecond
  }

  return luminanceSecond / luminanceFirst
}

export default function getRandomColor(): string {
  const bgColor = [113, 178, 128]
  const randomColor = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ]

  if (contrast(randomColor, bgColor) < 3) {
    return getRandomColor()
  }

  return `rgb(${randomColor[0]},${randomColor[1]},${randomColor[2]})`
}
