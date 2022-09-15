
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    // hexagon vertices
	var hexagonVertices = [
        vec2( -0.7, -0.5 ), // v0
        vec2( -0.7, -1 ), // v1
        vec2( -0.35, -0.5 ), // v2
        vec2( -0.35, -1) // v3
    ];


	// triangle vertices
    var triangleVertices = [
        vec2(-1,0.5), //v0
        vec2(0,0.5), //v1
        vec2(-0.5,1), //v2

        vec2(-1,0), //v0
        vec2(0,0), //v1
        vec2(-0.5,0.5), //v2

        vec2(-1,-0.5), //v0
        vec2(0,-0.5), //v1
        vec2(-0.5,0), //v2
    ];


	var colors = [
        vec4(0.0, 1.0, 0.0, 1.0), //v0
        vec4(0.0, 1.0, 0.0, 1.0), //v1
        vec4(0.0, 1.0, 0.0, 1.0)  //v2
    ];




    
    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation(program, "vPosition");
    var vColor = gl.getAttribLocation(program, "vColor");

    
    // Load the data into the GPU
	// hexagon vertex buffer 
    var hexagonBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, hexagonBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(hexagonVertices), gl.STATIC_DRAW );

	// Draw the hexagon
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    

    
	// triangle vertex buffer 
	var triangleBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, triangleBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(triangleVertices), gl.STATIC_DRAW );

	var triangleColorBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, triangleColorBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

	// Associate out shader variables with our data buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleBufferId);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBufferId);
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );

	// Draw the independent triangle
    gl.enableVertexAttribArray( vPosition );
	gl.enableVertexAttribArray( vColor );  // For the triangle we want to use per-vertex color so we enable the vertexColorAttribute again
	gl.drawArrays(gl.TRIANGLES, 0, 9);

	

	// Associate out shader variables with our data buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, stripBufferId);
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	gl.disableVertexAttribArray( vColor ); // We disable the vertex attribute array for the vertexColorAttribute and use a constant color again.
	gl.vertexAttrib4f(vColor, 1.0, 1.0, 0.0, 1.0);
    
	

};

