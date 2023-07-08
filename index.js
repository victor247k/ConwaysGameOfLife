const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
// only works as a square for now
const width = 800;
const height = 800;
const rows = 100;
const columns = 100;

canvas.width = width;
canvas.height = height;

let gen = [];

randomFirstGen(gen, columns, rows)

drawGen(gen, width, height, columns, rows)

let frameCount = 0;
const frameRate = 40;

function animate() {
   setTimeout(requestAnimationFrame(animate), 1000);
   
   frameCount++; 
   if (frameCount % frameRate === 0) {
      expand(gen, columns, rows)
      gen = nextGen(gen);

      drawGen(gen, width, height, columns, rows)
      // drawLines(width, height, rows, columns)
   }
}
animate()
