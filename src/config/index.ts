/** Arrow keys codes:
*   37 - left arrow
*   38 - up arrow
*   39 - right arrow
*   40 - down arrow
*/
const ArrowCodes = [37, 38, 39, 40]

export default {
  miner: {
    easy: {
      size: 8,
      bombsCount: 10
    },
    medium: {
      size: 12,
      bombsCount: 30
    },
    hard: {
      size: 16,
      bombsCount: 55
    }
  },
  snake: {
    size: 20,
    arrowCodes: ArrowCodes
  },
  tetris: {
    size: [20, 10],
    totalModels: 7,
    arrowCodes: ArrowCodes
  },
  bubbles: {
    size: 16,
    colors: ['red', 'green', 'blue', 'yellow', 'purple', 'orange']
  },
  numbers: {
    size: 4,
    arrowCodes: ArrowCodes,
    startNumbersCount: 2
  }
}
