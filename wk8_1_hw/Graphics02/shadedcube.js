
var canvas;
var gl;

var numVertices  = 36;

var pointsArray = [];
var normalsArray = [];


var vertices = [
    vec4( -0.5, -0.5,  0.5, 1.0 ), // 0
    vec4( -0.5,  0.5,  0.5, 1.0 ), // 1
    vec4(  0.5,  0.5,  0.5, 1.0 ), // 2
    vec4(  0.5, -0.5,  0.5, 1.0 ), // 3
    vec4( -0.5, -0.5, -0.5, 1.0 ), // 4 
    vec4( -0.5,  0.5, -0.5, 1.0 ), // 5
    vec4(  0.5,  0.5, -0.5, 1.0 ), // 6
    vec4(  0.5, -0.5, -0.5, 1.0 ),  // 7
]

var lightPosition = vec4(1.0,1.0,1.0,0.0);
var lightAmbient = vec4(0.2,0.2,0.2,1.0);
var lightDiffuse = vec4(1.0,1.0,1.0,1.0);
var lightSpecular = vec4(1.0,1.0,1.0,1.0);

var materialAmbient = vec4(1.0,0.0,1.0,1.0);
var materialDiffuse = vec4(1.0,0.8,0.0,1.0);
var materialSpecular = vec4(1.0,0.8,0.0,1.0);
var materialShininess = 100.0;


var ctm;
var ambientColor, diffuseColor, specularColor;
var modelView, projection;
var viewerPos;
var program

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var aAxis = 0;
var theta = [0,0,0];

var thetaLoc;

var flag = true;


function quad(a,b,c,d)
{
    var t1 = subtract(vertices[b],vertices[a]);
    var t2 = subtract(vertices[c],vertices[a]);
    var normal = cross(t1,t2);
    var normal = vec3(normal);

    pointsArray.push(vertices[a]);
    normalsArray.push(normal);
    pointsArray.push(vertices[b]);
    normalsArray.push(normal);
    pointsArray.push(vertices[c]);
    normalsArray.push(normal);
    pointsArray.push(vertices[a]);
    normalsArray.push(normal);
    pointsArray.push(vertices[c]);
    normalsArray.push(normal);
    pointsArray.push(vertices[d]);
    normalsArray.push(normal);
}




// Each face determines two triangles
function colorCube()
{
    quad( 1, 0, 3, 2 ); // blue
    // quad( 2, 3, 7, 6 ); // yellow
    // quad( 3, 0, 4, 7 ); // green
    quad( 6, 5, 1, 2 ); // cyan
    quad( 4, 5, 6, 7 ); // red       
    quad( 5, 4, 0, 1 ); // magenta

    // bottom
    quad( 8+1, 8+0, 8+3, 8+2 ); // blue
    quad( 8+2, 8+3, 8+7, 8+6 ); // yellow
    quad( 8+3, 8+0, 8+4, 8+7 ); // green
    // quad( 8+6, 8+5, 8+1, 8+2 ); // cyan
    quad( 8+4, 8+5, 8+6, 8+7 ); // red       
    quad( 8+5, 8+4, 8+0, 8+1 ); // magenta

    quad( 16+1, 16+0, 16+3, 16+2 ); // blue
    quad( 16+2, 16+3, 16+7, 16+6 ); // yellow
    quad( 16+3,16+0, 16+4, 16+7 ); // green
    quad( 16+6, 16+5, 16+1, 16+2 ); // cyan
    quad( 16+4, 16+5, 16+6, 16+7 ); // red       
    // quad( 16+5, 16+4, 16+0, 16+1 ); // magenta

}



window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    
    aspect = canvas.width/canvas.height;
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    colorCube();

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

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix"); 
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix"); 
    
    //sliders for viewing parameters
    document.getElementById("zFarSlider").onchange = function(event){
        far = event.target.value;
    render();
    };

    document.getElementById("zNearSlider").onchange = function(event){
        near = event.target.value;
    render();
    };

    document.getElementById("radiusSlider").onchange = function(event){
        radius = event.target.value;
    render();
    };

    document.getElementById("thetaSlider").onchange = function(event){
        theta = event.target.value*Math.PI/180.0;
    render();
    };

    document.getElementById("phiSlider").onchange = function(event){
        phi = event.target.value*Math.PI/180.0;
    render();
    };

    document.getElementById("aspectSlider").onchange = function(event){
        aspect = event.target.value;    
    render();
    };

    document.getElementById("fovSlider").onchange = function(event){
        fovy = event.target.value;
    render();
    };
    
        
    render();
}




var render=function()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    eye=vec3(radius*Math.sin(theta)*Math.cos(phi), 
    radius*Math.sin(theta)*Math.sin(phi),radius*Math.cos(theta)); // eye point
    modelViewMatrix = lookAt(eye, at , up); 
    projectionMatrix = perspective(fovy,aspect,near,far);

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
    requestAnimFrame(render);
}

