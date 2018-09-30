global.startApp = function(container) {
  console.log("Here is the container:", container);
  let table = document.querySelector('.diamondsweeper-board');
  let rows = 8;
  let columns = 8;
  let index = 0;
  let getDiamond = 0;
  let remainingBoxes = 0;

  for(let i = 0; i < rows; i++) {
    let tr = document.createElement('tr');
      table.appendChild(tr);
      for (let j = 0; j < columns; j++) {
        let td = document.createElement('td');
        td.setAttribute('id', 'cell' + i + '-' + j);
        td.setAttribute('class', 'cell unknown');
        tr.appendChild(td);
        index++;
      }
  }
}
