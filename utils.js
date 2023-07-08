function drawLines(width, heaight, rows, columns) {
   c.strokeStyle = "black";
   for (let i = 0; i < rows + 1; i++) {
      c.beginPath()
      c.moveTo(0, i / rows * height)
      c.lineTo(width, i / rows * height) 
      c.stroke()
   }
   for (let i = 0; i < columns + 1; i++) {
      c.beginPath()
      c.moveTo(i / columns * width, 0)
      c.lineTo(i / columns * width, width) 
      c.stroke()
   }
}
function randomFirstGen(gen, columns, rows) {
   for (let i = 0; i < columns; i++) {
      const row = []
      for (let j = 0; j < rows; j++) {
         row.push(Math.round(Math.random()))
      }
      gen.push(row)
   }
}
function drawGen(arr, width, height, columns, rows) {
   const blockWidth = width / columns;
   const blockHeight = height / rows;
   for (let x = 0; x < arr.length; x++) {
      for (let y = 0; y < arr[x].length; y++) {
      if (arr[x][y] === 1) c.fillStyle = "black"
      else c.fillStyle = "white"
      c.fillRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight)
      }
   }
}
function expand(arr, columns, rows) {
   for (let i = 0; i < rows; i ++) {
      arr[i].unshift(0);
      arr[i].push(0);
   }
   const horizontal = []
   for (let i = 0; i < columns + 2; i++) {
      horizontal.push(0)
   }
   arr.unshift(horizontal)
   arr.push(horizontal)
}
function count(arr, x, y) {
   let neighbors = 0;
   for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
         if (i === x && j === y) continue
	 if (arr[i][j] === 1) neighbors ++;
      }
   }
   return neighbors;
}
function nextGen(gen) {
   const previousGen = gen;
   const newGen = [];
   for (let x = 1; x < gen.length - 1; x++) {
      const row = []
      for (let y = 1; y < gen.length - 1; y++) {
	 if (previousGen[x][y] === 1 && 
              count(previousGen, x, y) < 2 ||
	      count(previousGen, x, y) > 3) {
             row.push(0)
	 } else if (previousGen[x][y] === 0 &&
		    count(previousGen, x, y) === 3) {
	      row.push(1)
	 } else {
	      row.push(previousGen[x][y])
	 }
      }
      newGen.push(row)
   }
   return newGen;
}
