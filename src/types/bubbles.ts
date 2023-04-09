export type Cell = {
  id: string,
  color: string,
  highlight: boolean,
}

export type Cells = Array<Array<Cell | null>>
