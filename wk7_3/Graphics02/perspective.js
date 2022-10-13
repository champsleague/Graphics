
var canvas;
var gl;

var numVertices  = 84;

var points = [];
var colors = [];

var near = 0.3;
var far = 3.0;
var radius = 4.0;
var theta = 0.0;
var phi = 0.0;
var dr = 5.0 * Math.PI/180.0;

var fovy = 45.0;
var aspect = 1.0;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;

const at = vec3(0.0,0.0,0.0); //at point
const up = vec3(0.0,1.0,0.0); //up direction


window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    colorCube();

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
    

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix"); 
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix"); 
    
    //buttons to change viewing parameters
    document.getElementById("depthSlider").onchange = function(event){
        far = event.target.value/2;
        near = -event.target.value/2;
    };

    document.getElementById("radiusSlider").onchange = function(event){
        radius = event.target.value;
    }

    document.getElementById("thetaSlider").onchange = function(event){
        theta = event.target.value*Math.PI/180.0;
    }

    document.getElementById("phiSlider").onchange = function(event){
        phi = event.target.value*Math.PI/180.0;
    }

    document.getElementById("heightSlider").onchange = function(event){
        ytop = event.target.value/2;
        bottom = -event.target.value/2;    
    }

    document.getElementById("widthSlider").onchange = function(event){
        right = event.target.value/2;
        left = -event.target.value/2;    
    }
    
        
    render();
}



// quad uses first index to set color for face
function quad(a,b,c,d){
    var vertices = [
        vec4( -0.5, -0.5,  0.5, 1.0 ), // 0
        vec4( -0.5,  0.5,  0.5, 1.0 ), // 1
        vec4(  0.5,  0.5,  0.5, 1.0 ), // 2
        vec4(  0.5, -0.5,  0.5, 1.0 ), // 3
        vec4( -0.5, -0.5, -0.5, 1.0 ), // 4 
        vec4( -0.5,  0.5, -0.5, 1.0 ), // 5
        vec4(  0.5,  0.5, -0.5, 1.0 ), // 6
        vec4(  0.5, -0.5, -0.5, 1.0 ),  // 7
    
        // bottom
        vec4( -0.5, -0.5-1.0,  0.5, 1.0 ), // 0
        vec4( -0.5,  0.5-1.0,  0.5, 1.0 ), // 1
        vec4(  0.5,  0.5-1.0,  0.5, 1.0 ), // 2
        vec4(  0.5, -0.5-1.0,  0.5, 1.0 ), // 3
        vec4( -0.5, -0.5-1.0, -0.5, 1.0 ), // 4 
        vec4( -0.5,  0.5-1.0, -0.5, 1.0 ), // 5
        vec4(  0.5,  0.5-1.0, -0.5, 1.0 ), // 6
        vec4(  0.5, -0.5-1.0, -0.5, 1.0 ),  // 7
    
        // right
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
}

var indices = [a,b,c,a,c,d]; //1 0 3, 1 3 2 // 4 5 6, 4 6 7

console.log(indices)
    for (var i = 0; i<indices.length; ++i){
        points.push(verices[indices[i]]);
        // colors.push(vertexColors[indices[i]]);

        // for solid colored faces use
        colors.push(vertexColors[a%8]);
    }

// // Each face determines two triangles
// function colorCube()
// {
//     quad( 1, 0, 3, 2 ); // blue
//     quad( 2, 3, 7, 6 ); // yellow
//     quad( 3, 0, 4, 7 ); // green
//     quad( 6, 5, 1, 2 ); // cyan
//     quad( 4, 5, 6, 7 ); // red       
//     quad( 5, 4, 0, 1 ); // magenta
// }






var render=function()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    eye=vec3(radius*Math.cos(theta)*Math.sin(phi), radius*Math.sin(theta),
            radius*Math.cos(theta)*Math.cos(phi)); // eye point
    modelViewMatrix = lookAt(eye, at , up); 
    projectionMatrix = perspective(left,right,bottom,ytop,near,far);

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );
    requestAnimFrame(render);
}

