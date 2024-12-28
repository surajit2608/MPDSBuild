import React, { useEffect } from 'react'

const DynamicFavicon = ({ letter, bgcolor = '#000', fontcolor = '#fff' }) => {
  const faviconLetter = (bgcolor, fontcolor, letter) => {
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      size = 32,
      roundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke == "undefined") {
          stroke = true;
        }
        if (typeof radius === "undefined") {
          radius = 6;
        }
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (stroke) {
          ctx.stroke();
        }
        if (fill) {
          ctx.fill();
        }
      };

    // Set canvas size
    canvas.width = canvas.height = size;

    // Draw the favicon
    ctx.save();
    ctx.fillStyle = bgcolor;
    roundRect(ctx, 0, 0, size, size, 8, true, false);  // Background with rounded corners
    ctx.font = "16px Calibri";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = fontcolor;
    ctx.fillText(letter.toUpperCase(), size / 2, (size / 2) + 2); // Draw the letter
    ctx.restore();

    // Set the generated image as the favicon
    document.querySelector("link[rel='shortcut icon']").setAttribute('href', canvas.toDataURL("image/png"));
  };

  useEffect(() => {
    // Call faviconLetter whenever the props change
    faviconLetter(bgcolor, fontcolor, letter);
  }, [bgcolor, fontcolor, letter]); // Re-run when bgcolor, fontcolor, or letter change

  return null
}

export default DynamicFavicon
