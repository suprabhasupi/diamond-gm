global.startApp = function(container) {
  console.log("Here is the container:", container);
  let table = document.querySelector('.diamondsweeper-board');
  let rows = 8;
  let columns = 8;
  let index = 0;
  let diamondFound = 0;
  let openedCells = 0;
  let score = 0;

  for(let i = 0; i < rows; i++) {
    let tr = document.createElement('tr');
      table.appendChild(tr);
      for (let j = 0; j < columns; j++) {
        let td = document.createElement('td');
        td.setAttribute('id', 'cell' + i + '-' + j);
        td.setAttribute('class', 'cell unknown');
        tr.appendChild(td);
        index++;
        td.addEventListener('click', handleCell);
      }
  }

  let diamondIndexes = [];
  while (diamondIndexes.length < 8) {
      let randomRows = Math.random() * rows;
      let randomColumns = Math.random() * columns;
      let diamondIndex = 'cell' + Math.floor(randomRows) + '-' + Math.floor(randomColumns);
      if (diamondIndexes.indexOf(diamondIndex) == -1) {
          diamondIndexes.push(diamondIndex);
      }
  }

  console.log('diamondIndexes--->>', diamondIndexes)

  function handleCell() {
    let cellIndex = this.getAttribute('id');
    if (this.classList.contains('unknown')) {
      this.classList.remove('unknown');
      openedCells += 1;
    }

    if (diamondIndexes.indexOf(cellIndex) == -1) {
      this.classList.add('arrow');
      let nearestDimaondDirection = findNearestDiamond(cellIndex);
      if (nearestDimaondDirection === 'no-near-diamond'){
        this.classList.remove('arrow');
      }
      this.classList.add(nearestDimaondDirection);
    } else {
      let td = document.querySelectorAll('.diamondsweeper-board tr td');
      let allCells = td.length;
      this.classList.add('diamond');
      diamondFound += 1;
      score = allCells - openedCells;
      if (diamondFound === 8) {
        alert(`Game Over! Your score is ${score}`);
      }
    }
  }

  function findNearestDiamond(cellIndex) {
    let diamondsInSameRow = [];
    let diamondsInSameColumn = [];
    let cellX = cellIndex.substring(4, 5);
    let cellY = cellIndex.substring(6, 7);

    console.group('Clicked value');
    console.log('cellIndex = ', cellIndex)
    console.log('cellX     = ', cellX)
    console.log('cellY     = ', cellY)
    console.log('----------------------');
    console.groupEnd('Clicked value');

    for (var i = 0; i < diamondIndexes.length; i++) {
      let diamondX = diamondIndexes[i].substring(4, 5);
      let diamondY = diamondIndexes[i].substring(6, 7);
      console.group('diamonds');
      console.table({'diamondIndexs[i]': diamondIndexes[i], 'diamondX': diamondX, 'diamondY': diamondY});
      console.groupEnd('diamonds');
      if (cellY === diamondY) {
          if (cellX < diamondX) {
            let d = {
              direction: 'down',
              distances: diamondX -cellX,
            }
            diamondsInSameRow.push(d);
          } else if (cellX > diamondX) {
          let d = {
            direction: 'up',
            distances: cellX - diamondX,
          }
          diamondsInSameRow.push(d);
        }
      }
      if (cellX === diamondX) {
        if (cellY < diamondY) {
          let d = {
            direction: 'right',
            distances: diamondY - cellY
          }
          diamondsInSameColumn.push(d);
        } else if (cellY > diamondY) {
          let d = {
            direction: 'left',
            distances: cellY - diamondY
          }
          diamondsInSameColumn.push(d);
        }
      }
    }

    let diamondsInRowColumns = diamondsInSameColumn.concat(diamondsInSameRow);
    if (diamondsInRowColumns.length === 0) {
      return 'no-near-diamond'
    }
    let nearestDiamond = diamondsInRowColumns.reduce(function(prev, current) {
      return (prev.distances < current.distances) ? prev : current
    })

    return nearestDiamond.direction
  }
}
