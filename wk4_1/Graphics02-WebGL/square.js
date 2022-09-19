var gl;
var points;

window.onload = function init(){
var canvas = document.getElementById( "gl-canvas" );
gl = WebGLUtils.setupWebGL( canvas );
if ( !gl ) { alert( "WebGL isn't available" );
}
// Four Vertices
// var vertices = [
// vec2( -0.5, 0.5 ), // v0
// vec2( -0.5, -0.5 ), // v1
// vec2( 0.5, 0.5 ), // v2
// vec2( 0.5, -0.5) // v3
// ];

// Configure WebGL
gl.viewport( 0, 0, canvas.width, canvas.height );
gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

// Load shaders and initialize attribute buffers
var program = initShaders( gl, "vertex-shader", "fragment-shader" );
gl.useProgram( program );

// Load the data into the GPU
var bufferId = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

// Associate out shader variables with our data buffer
var vPosition = gl.getAttribLocation( program, "vPosition" );
gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPosition ); 





//draw 50 random rectangles in random colors
for (var ii=0; ii < 50; ++ii){
    setRectangle(
        gl,randomInt(300), randomInt(300), randomInt(300), randomInt(300));

    //set a random color
    gl.uniform4f(fColor,Math.random(),Math.random(),Math.random(),1);

    //Draw the rectangle
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType,offset,count)
}

// returns random int from 0 to range -1
function randomInt(range){
    return Math.floor(Math.random()*range);
}

// fills the buffer with the values that define a rect
function setRectangle(gl,x,y,width,height){
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;


    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array({
        x1,y1,
        x2,y1,
        x1,y2,
        x1,y2,
        x2,y1,
        x2,y2,}), gl.STATIC_DRAW)
}




render();
};
function render() {
gl.clear( gl.COLOR_BUFFER_BIT );
gl.drawArrays( gl.TRIANGLES, 0, 6); // 0, 1, 2, 2, 1, 3
}
