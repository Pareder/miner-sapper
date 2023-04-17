export default function getPositions(i: number, j: number): Array<Array<number>> {
  return [
    [i - 1, j],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j],
  ]
}
