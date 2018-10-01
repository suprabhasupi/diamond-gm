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
}
