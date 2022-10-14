
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //vertex position
    var t_vertices = [
        vec2(0,0.5),  //v0
        vec2(-0.5,-0.5),  //v1
        vec2(0.5,-0.5),  //v2
    ];

    //vertex color (R,G,B,A)
    var t_colors = [
        vec4(1.0,0.0,0.0,1.0), //v0
        vec4(0.0,1.0,0.0,1.0), //v1
        vec4(0.0,0.0,1.0,1.0) //v2
    ];

    //configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    var vertexPositionBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(t_vertices),gl.STATIC_DRAW);

    var fPosition = gl.getAttribLocation( program, "fPosition" );
    gl.vertexAttribPointer( fPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( fPosition );


    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(t_colors),gl.STATIC_DRAW);

    var aColor = gl.getAttribLocation(program,"aColor");
    gl.vertexAttribPointer(aColor,4,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(aColor)

     //render
     gl.clear( gl.COLOR_BUFFER_BIT );
     gl.drawArrays( gl.TRIANGLES, 0, 3);
};


   

