
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    //var vertices = new Float32Array([vec2(-1, -1), vec2(0, 1), vec2(1, -1)]);
	  // var vertices = [ vec2(-1,-1), vec2(0,1), vec2(1,-1)];
    //  Configure WebGL
    var vertices = new Float32Array([-0.55,0.5,   0.45,0.5,   -0.05,1,
                                     -0.55,0,     0.45,0,     -0.05,0.5,
                                     -0.55,-0.5,  0.45,-0.5,  -0.05,0,
                                    
                                    ]);

    var sqaurevertices = [
        vec2( -0.22, -0.5 ), // v0
        vec2( -0.22, -1 ), // v1
        vec2( 0.1, -0.5 ), // v2
        vec2( 0.1, -1) // v3
                    ];
    
    
    // Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU (triangle)
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW );

    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var color = gl.getUniformLocation(program, "color");
	gl.uniform4fv(color,[0.0,1.0,0.0,1.0]);
    render();



    // Load the data into the GPU (square)
    var squareBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, squareBufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(sqaurevertices), gl.STATIC_DRAW );

    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var color = gl.getUniformLocation(program, "color");
	gl.uniform4fv(color,[0.5,0.25,0.0,1.0]);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);


};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 9);

}
