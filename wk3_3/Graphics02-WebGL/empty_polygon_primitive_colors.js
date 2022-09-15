
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    // hexagon vertices
	var hexagonVertices = [
        vec2(-0.3,  0.6), //v0
        vec2(-0.4,  0.8), //v1
        vec2(-0.6,  0.8), //v2
        vec2(-0.7,  0.6), //v3
        vec2(-0.6,  0.4), //v4
        vec2(-0.4,  0.4), //v5
        vec2(-0.3,  0.6), //v6
    ];


	// triangle vertices
    var triangleVertices = [
        vec2(0.3,  0.4), //v0
        vec2(0.7,  0.4), //v1
        vec2(0.5,  0.8), //v2
    ];


	var colors = [
        vec4(1.0, 0.0, 0.0, 1.0), //v0
        vec4(0.0, 1.0, 0.0, 1.0), //v1
        vec4(0.0, 0.0, 1.0, 1.0)  //v2
    ];



	// strip vertices
	var stripVertices = [
        vec2(-0.5,  0.2), //v0
        vec2(-0.4,  0.0), //v1
        vec2(-0.3,  0.2), //v2
        vec2(-0.2,  0.0), //v3
        vec2(-0.1,  0.2), //v4
        vec2(0.0,  0.0), //v5
        vec2(0.1,  0.2), //v6
        vec2(0.2,  0.0), //v7
        vec2(0.3,  0.2), //v8
        vec2(0.4,  0.0), //v9
        vec2(0.5,  0.2), //v10
        // start second strip
        vec2(-0.5, -0.3), //v11
        vec2(-0.4, -0.5), //v12
        vec2(-0.3, -0.3), //v13
        vec2(-0.2, -0.5), //v14
        vec2(-0.1, -0.3), //v15
        vec2(0.0, -0.5), //v16
        vec2(0.1, -0.3), //v17
        vec2(0.2, -0.5), //v18
        vec2(0.3, -0.3), //v19
        vec2(0.4, -0.5), //v20
        vec2(0.5, -0.3)  //v21
    ];


    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
};

