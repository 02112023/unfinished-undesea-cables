var canvas = document.getElementById('sinewave');

    canvas.width = document.body.offsetWidth;
    canvas.height = document.body.offsetHeight;

    var ctx = canvas.getContext('2d');

    // canvas
    var w = 100;
    var width = document.body.offsetWidth;
    var wDelta = width / w;

    // drawing params
    var color1 = "#DD1E2F",
        color2 = "#EBB035",
        color3 = "#06A2CB",
        color4 = "#218559",
        size = 8;
    var timeScale = -0.005;
    var yOffset = 100;
    var tOffset = 3;
    // sine wave 1
    //a * sin (t * i + phi) + off
    var a_1   = 30,
        i_1   = 3,
        phi_1 = 0,
        off_1 = 50, 
        xi_1 = 60;

    var sineWave1 = function (t, x) {
      return ( a_1 + 100 * mouse ) * Math.sin(t * i_1 + phi_1 + x / (xi_1 + mouse * 50) ) + off_1;
    };

    var a_2   = 20,
        i_2   = 1.5,
        phi_2 = 0,
        off_2 = 100, 
        xi_2 = 80;

    var sineWave2 = function (t, x) {
      return (a_2 + 100 * mouse) * Math.sin(t * i_2 + phi_2 + x / (xi_2 - mouse * 10) ) + off_2;
    };

    var mui_1 = 0.01,
        c     = 1;
    var damper = function (t, x) {
      return Math.abs(Math.sin(x*Math.PI)); 
    };

    var step = function (t) {

      t = t * timeScale;
      // resets canvas
      canvas.width = canvas.width;
      var norm;

      for (var i = 0; i < width; i += wDelta) {
        norm = i / width;
        drawSquare( i,  1   * mouse * damper(t, norm) * (sineWave1( t + tOffset, i) + sineWave2( t + tOffset, i)) + 500 + yOffset , color1);
        drawSquare( i,  0.7 * mouse * damper(t, norm) * (sineWave1( t + tOffset, i) + sineWave2( t + tOffset, i)) + 450 + yOffset , color2);
        drawSquare( i,  0.4 * mouse * damper(t, norm) * (sineWave1( t + tOffset, i) + sineWave2( t + tOffset, i)) + 400 + yOffset , color3);
        drawSquare( i,  0.2 * mouse * damper(t, norm) * (sineWave1( t + tOffset, i) + sineWave2( t + tOffset, i)) + 350 + yOffset , color4);
        drawSquare( i, -0.2 * mouse * damper(t, norm) * (sineWave1( t, i) + sineWave2( t, i)) + 300 + yOffset, color4 );
        drawSquare( i, -0.4 * mouse * damper(t, norm) * (sineWave1( t, i) + sineWave2( t, i)) + 250 + yOffset, color3 );
        drawSquare( i, -0.7 * mouse * damper(t, norm) * (sineWave1( t, i) + sineWave2( t, i)) + 200 + yOffset, color2 );
        drawSquare( i, -1   * mouse * damper(t, norm) * (sineWave1( t, i) + sineWave2( t, i)) + 150 + yOffset, color1 );

        //drawSquare( i, 100 * damper(t, norm) );
      }

      if (trigger == true) {
        if (mouse >= 1) {
          trigger = false;
        } else if (mouse < 1) {
          mouse += up;
        }
      } else {
        if (mouse > 0.2) {
          mouse -= down;
        }
      }

      requestAnimationFrame(step);
    };

    var up = 0.03, down = 0.008;
    var mouse = 0.2;
    var trigger = false;

    canvas.onmousedown = function() {
      trigger = true;
    };

    var drawSquare = function (x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect (x, y , size, size);
    };

    requestAnimationFrame(step);