
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 1);
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );

    gl.useProgram(program);

 
    // var program = webglUtils.createProgramFromScripts(gl, ["2d-vertex-shader", "2d-fragment-shader"]);

    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    var colorUniformLocation = gl.getUniformLocation(program, "u_color");

      
    var size = 2;           
    var type = gl.FLOAT;  
    var normalize = false;
    var stride = 0; 
    var offset = 0;
   

    
    // 50개의 무작위 크기, 위치, 색을 가진 사각형을 그린다.
    for(var ii = 0; ii < 50; ++ii) {

      var positionBuffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      setRectangle(gl,randomInt(300),randomInt(300),randomInt(300), randomInt(300));
      gl.vertexAttribPointer(
        positionAttributeLocation,size, type, normalize, stride, offset);
      gl.enableVertexAttribArray(positionAttributeLocation);

      
      gl.uniform4f(colorUniformLocation,Math.random(),Math.random(),Math.random(), 1);
      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    
      // gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Draw the rectangle.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 6;
        gl.drawArrays(primitiveType, offset, count);
    
    }
} 

    // render();
 
// 0 ~ range까지의 정수값을 무작위로 반환함 
function randomInt(range) {
    return Math.floor(Math.random() * range);
  }
  

  function setRectangle(gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
       x1, y1,
       x2, y1,
       x1, y2,
       x1, y2,
       x2, y1,
       x2, y2,]), gl.STATIC_DRAW);
  }


  function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 6); // 0, 1, 2, 2, 1, 3
    }

  