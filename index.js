const canvas = document.querySelector("#root");
let gradient,
  hue = 0;
const ctx = canvas.getContext("2d", { alpha: false });
let width = parseInt(getComputedStyle(canvas).width);
let height = parseInt(getComputedStyle(canvas).height);

/*
****************************************** Hearth animation lore ****************************************************
*   Note: For some reason, clearRect, fillRect etc. under "heavy loads" are low performant                          *
*   - At the very beginning I rendered the hearth pattern every frame, but it performed really bad                  *
*   - First, I tried to avoid using the methods mentioned aboved and performance improved just a little bit         *
*   - Later on, I discovered that the gradient by itself (without the hearth pattern) performed nicely.             *
*   - Finally the most coherent thing to do was to only render the                                                  *
*     hearth pattern once (because it doesn't change, why render it every frame then?)                              *
*********************************************************************************************************************
*/

const render = () => {
  ctx.imageSmoothingEnabled = true;

  //draw the background
  ctx.clearRect(0,0,width,height)
  
  //draw the hearth pattern once
  drawPath();
};

const drawPath = () => {
  let hearthWidth = 20;
  let hearthHeight = 10;
  let gap = 10;
  let initialX = hearthWidth;
  let initialY = hearthHeight;
  let numColumns = width / (initialX + gap + hearthWidth);
  let numRows = height / (initialY + gap + hearthHeight);
  let currentX = initialX;
  let currentY = initialY;
  ctx.strokeStyle = "#0000";

  //it's important to define it as path, otherwise it won't be filled correctly with the gradient after clip()
  ctx.beginPath();
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numColumns; x++) {
      drawHearth(ctx, currentX, currentY);
      currentX += initialX + gap + hearthWidth;
    }
    currentX = initialX;
    currentY += initialY + gap + hearthHeight + 10;
  }
  ctx.closePath();
  ctx.clip();
};

const drawHearth = (ctx, x, y) => {
  // Define the points as {x, y}
  let start = { x: x, y: y };
  let cp1 = { x: x, y: y - 15 };
  let cp2 = { x: x - 40, y: y - 5 };
  let end = { x: x, y: y + 30 };

  let startMirror = { x: x, y: y };
  let cp1Mirror = { x: x, y: y - 15 };
  let cp2Mirror = { x: x + 40, y: y - 5 };
  let endMirror = { x: x, y: y + 30 };
  // Cubic Bézier curve

  ctx.moveTo(startMirror.x, startMirror.y);
  ctx.bezierCurveTo(
    cp1Mirror.x,
    cp1Mirror.y,
    cp2Mirror.x,
    cp2Mirror.y,
    endMirror.x,
    endMirror.y
  );
  ctx.moveTo(start.x, start.y);
  ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
  ctx.stroke();
};

const animateGradient = () => {
  ctx.clearRect(0,0,width,height)
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  hue += 1;
  if (!gradient) gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, `hsl(${hue}, 60%, 50%)`);
  gradient.addColorStop(1, `hsl(${hue + 20}, 60%, 50%)`);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
  //recursively call every frame
  requestAnimationFrame(animateGradient);
};

const run = () => {
  if (canvas.getContext) {
    render();
    animateGradient()
  } else {
    console.log("Canvas not supported");
  }
};

run();
