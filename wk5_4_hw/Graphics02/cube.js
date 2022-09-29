
var canvas;
var gl;

var NumVertices  = 36;

var pointsArray = [];
var colorsArray = [];

var vertices = [
    vec4( -0.5, -0.5,  0.5, 1.0 ), // 0
    vec4( -0.5,  0.5,  0.5, 1.0 ), // 1
    vec4(  0.5,  0.5,  0.5, 1.0 ), // 2
    vec4(  0.5, -0.5,  0.5, 1.0 ), // 3
    vec4( -0.5, -0.5, -0.5, 1.0 ), // 4 
    vec4( -0.5,  0.5, -0.5, 1.0 ), // 5
    vec4(  0.5,  0.5, -0.5, 1.0 ), // 6
    vec4(  0.5, -0.5, -0.5, 1.0 ),  // 7

    //bottom
    vec4( -0.5, -0.5-1.0,  0.5, 1.0 ), // 0
    vec4( -0.5,  0.5-1.0,  0.5, 1.0 ), // 1
    vec4(  0.5,  0.5-1.0,  0.5, 1.0 ), // 2
    vec4(  0.5, -0.5-1.0,  0.5, 1.0 ), // 3
    vec4( -0.5, -0.5-1.0, -0.5, 1.0 ), // 4 
    vec4( -0.5,  0.5-1.0, -0.5, 1.0 ), // 5
    vec4(  0.5,  0.5-1.0, -0.5, 1.0 ), // 6
    vec4(  0.5, -0.5-1.0, -0.5, 1.0 ), // 7

    //right
    vec4( -0.5+1.0, -0.5,  0.5, 1.0 ), // 0
    vec4( -0.5+1.0,  0.5,  0.5, 1.0 ), // 1
    vec4(  0.5+1.0,  0.5,  0.5, 1.0 ), // 2
    vec4(  0.5+1.0, -0.5,  0.5, 1.0 ), // 3
    vec4( -0.5+1.0, -0.5, -0.5, 1.0 ), // 4 
    vec4( -0.5+1.0,  0.5, -0.5, 1.0 ), // 5
    vec4(  0.5+1.0,  0.5, -0.5, 1.0 ), // 6
    vec4(  0.5+1.0, -0.5, -0.5, 1.0 )  // 7
]; 

    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 1.0, 1.0, 1.0, 1.0 ]   // white
    ];


var radius = 1.0;
var theta = 0.0;
var phi = 0.0;
var dr = 5.0 * Math.PI/180.0;

var mvMatrix;
var modelView;
var eye;

const at = vec3(0.0,0.0,0.0);
const up = vec3(0.0,1.0,0.0);


function quad(a,b,c,d){
    pointsArray.push(vertices[a]);
    colorsArray.push(vertextColors[a]);
    pointsArray.push(vertices[b]);
    colorsArray.push(vertextColors[a]);
    pointsArray.push(vertices[c]);
    colorsArray.push(vertextColors[a]);
    pointsArray.push(vertices[a]);
    colorsArray.push(vertextColors[a]);
    pointsArray.push(vertices[c]);
    colorsArray.push(vertextColors[a]);
    pointsArray.push(vertices[d]);
    colorsArray.push(vertextColors[a]);
}



window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCube();

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta"); 
    
    //event listeners for buttons
    
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
		render();
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
		render();
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
		render();
    };
        
    render();
}

function colorCube()
{
    quad( 1, 0, 3, 2 ); // blue
    // quad( 2, 3, 7, 6 ); // yellow
    // quad( 3, 0, 4, 7 ); // green
    quad( 6, 5, 1, 2 ); // cyan
    quad( 4, 5, 6, 7 ); // red       
    quad( 5, 4, 0, 1 ); // magenta

    //bottom
    quad(8+1,8+0,8+3,8+2);
    quad(8+2,8+3,8+7,8+6);
    quad(8+3,8+0,8+4,8+7);
    // quad(8+6,8+5,8+1,8+2);
    quad(8+4,8+5,8+6,8+7);
    quad(8+5,8+4,8+0,8+1);

    quad(16+1,16+0,16+3,16+2);
    quad(16+2,16+3,16+7,16+6);
    quad(16+3,16+0,16+4,16+7);
    quad(16+6,16+5,16+1,16+2);
    quad(16+4,16+5,16+6,16+7);
    // quad(16+5,16+4,16+0,16+1);
}

function quad(a, b, c, d) 
{
    var vertices = [
        vec4( -0.5, -0.5,  0.5, 1.0 ), // 0
        vec4( -0.5,  0.5,  0.5, 1.0 ), // 1
        vec4(  0.5,  0.5,  0.5, 1.0 ), // 2
        vec4(  0.5, -0.5,  0.5, 1.0 ), // 3
        vec4( -0.5, -0.5, -0.5, 1.0 ), // 4 
        vec4( -0.5,  0.5, -0.5, 1.0 ), // 5
        vec4(  0.5,  0.5, -0.5, 1.0 ), // 6
        vec4(  0.5, -0.5, -0.5, 1.0 ),  // 7

        //bottom
        vec4( -0.5, -0.5-1.0,  0.5, 1.0 ), // 0
        vec4( -0.5,  0.5-1.0,  0.5, 1.0 ), // 1
        vec4(  0.5,  0.5-1.0,  0.5, 1.0 ), // 2
        vec4(  0.5, -0.5-1.0,  0.5, 1.0 ), // 3
        vec4( -0.5, -0.5-1.0, -0.5, 1.0 ), // 4 
        vec4( -0.5,  0.5-1.0, -0.5, 1.0 ), // 5
        vec4(  0.5,  0.5-1.0, -0.5, 1.0 ), // 6
        vec4(  0.5, -0.5-1.0, -0.5, 1.0 ), // 7

        //right
        vec4( -0.5+1.0, -0.5,  0.5, 1.0 ), // 0
        vec4( -0.5+1.0,  0.5,  0.5, 1.0 ), // 1
        vec4(  0.5+1.0,  0.5,  0.5, 1.0 ), // 2
        vec4(  0.5+1.0, -0.5,  0.5, 1.0 ), // 3
        vec4( -0.5+1.0, -0.5, -0.5, 1.0 ), // 4 
        vec4( -0.5+1.0,  0.5, -0.5, 1.0 ), // 5
        vec4(  0.5+1.0,  0.5, -0.5, 1.0 ), // 6
        vec4(  0.5+1.0, -0.5, -0.5, 1.0 )  // 7

    ];

    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 1.0, 1.0, 1.0, 1.0 ]   // white
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices
    
    //vertex color assigned by the index of the vertex
    
    var indices = [ a, b, c, a, c, d ]; // 1 0 3, 1 3 2 // 4 5 6, 4 6 7 // ...

	console.log(indices)

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        //colors.push( vertexColors[indices[i]] );
    
        // for solid colored faces use 
        colors.push(vertexColors[a]);
        
    }
}

var render=function()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    eye=vec3(radius*Math.cos(theta)*Math.sin(phi), radius*Math.sin(theta),
            radius*Math.cos(theta)*Math.cos(phi)); // eye point
    mvMatrix = lookAt(eye, at , up); 

    gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) )
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );
    requestAnimFrame(render);
}

