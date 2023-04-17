export type Bomb = 'bomb'

export type Cell = {
  value: Bomb | number,
  clicked: boolean,
  rightClicked: boolean,
}

export type Cells = Array<Array<Cell>>
