import React from 'react'
import PropTypes from 'prop-types'
import NoScript from './components/NoScript'
export default function HTML(props) {

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

    canvas.width = canvas.height = size;
    ctx.save();
    ctx.fillStyle = bgcolor;
    roundRect(ctx, 0, 0, size, size, 8, true, false);
    ctx.font = "16px Calibri";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = fontcolor;
    ctx.fillText(letter.toUpperCase(), size / 2, (size / 2) + 2);
    ctx.restore();

    document.querySelector("link[rel='shortcut icon']").setAttribute('href', canvas.toDataURL("img/png"));
  }

  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        <NoScript />
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
