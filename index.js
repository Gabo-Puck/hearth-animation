const canvas = document.querySelector("#root");

const render = () => {
  const ctx = canvas.getContext("2d");

  let width = parseInt(getComputedStyle(canvas).width);
  let height = parseInt(getComputedStyle(canvas).height);
  console.log({ width });
  // Define the points as {x, y}
  let gap = 10;
  let hearthWidth = 20;
  let hearthHeight = 10;
  let initialX = hearthWidth;
  let initialY = hearthHeight;
  let numColumns = width / (initialX + gap + hearthWidth);
  let numRows = height / (initialY + gap + hearthHeight);
  let currentX = initialX;
  let currentY = initialY;
  console.log({ numColumns, numRows });
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(width, 0);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.fill();
  ctx.clip()
  ctx.beginPath();

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numColumns; x++) {
      drawHearth(ctx, currentX, currentY);
      currentX += initialX + gap + hearthWidth;
    }
    currentX = initialX;
    currentY += initialY + gap + hearthHeight + 10;
    console.log({ currentY });
  }
  ctx.clip();
  ctx.fillStyle = "#7cff01";
  ctx.fillRect(0, 0, width, height);
};

const drawHearth = (ctx, x, y) => {
  // Define the points as {x, y}
  // y->90
  let start = { x: x, y: y };
  let cp1 = { x: x, y: y - 15 };
  let cp2 = { x: x - 40, y: y - 5 };
  let end = { x: x, y: y + 30 };

  let startMirror = { x: x, y: y };
  let cp1Mirror = { x: x, y: y - 15 };
  let cp2Mirror = { x: x + 40, y: y - 5 };
  let endMirror = { x: x, y: y + 30 };
  // ctx.fillStyle = "purple";
  // Cubic Bézier curve

  ctx.clearRect(0, 0, 500, 500);
  ctx.moveTo(start.x, start.y);
  ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
  ctx.stroke();

  // ctx.clearRect(0,0,500,500)

  ctx.moveTo(startMirror.x, startMirror.y);
  ctx.bezierCurveTo(
    cp1Mirror.x,
    cp1Mirror.y,
    cp2Mirror.x,
    cp2Mirror.y,
    endMirror.x,
    endMirror.y
  );
  ctx.stroke();

  // ctx.clearRect(0,0,500,500)

  // ctx.clip()
};

const run = () => {
  if (canvas.getContext) render();
  else console.log("Canvas not supported");
};

window.addEventListener("load", run);
