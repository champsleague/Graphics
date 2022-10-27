
var canvas;
var gl;

var numVertices = 36;

var texSize = 64;

var program;

var pointsArray = [];
var colorsArray = [];
var texCoordsArray = [];

var texture;

var texCoord = [
    vec2(0,0),
    vec2(0,1),
    vec2(1,1),
    vec2(1,0)
]

var vertices = [
    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5, -0.5, -0.5, 1.0 )
];

var vertexColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),
    vec4( 1.0, 0.0, 0.0, 1.0 ),
    vec4( 1.0, 1.0, 0.0, 1.0 ),
    vec4( 0.0, 1.0, 0.0, 1.0 ),
    vec4( 0.0, 0.0, 1.0, 1.0 ),
    vec4( 1.0, 0.0, 1.0, 1.0 ),
    vec4( 0.0, 1.0, 1.0, 1.0 ),
    vec4( 0.0, 1.0, 1.0, 1.0 ),
  
];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = xAxis;
var theta =[0, 0, 0];

var modelViewMatrixLoc;

function configureTexture(image){
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);

    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);

    gl.uniformli(gl.getUniformLocation(program,"texture"),0);
}

function quad(a,b,c,d){
    pointsArray.push(vertices[a]);
    colorsArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[0]);

    pointsArray.push(vertices[b]);
    colorsArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[1]);

    pointsArray.push(vertices[c]);
    colorsArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[2]);

    pointsArray.push(vertices[a]);
    colorsArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[0]);

    pointsArray.push(vertices[c]);
    colorsArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[2]);

    pointsArray.push(vertices[d]);
    colorsArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[3]);
    
}

function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}



window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.FRONT);

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

    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW );

    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );

    var url = "https://c1.staticflickr.com/9/8873/18598400202_3af67ef38f_q.jpg"


    modelViewMatrixLoc = gl.getUniformLocation(program,"modelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program,"projectionMatrix");

    
    document.getElementById("Button0").onclick = function(){radius *= 2.0};
    document.getElementById("Button1").onclick = function(){radius *= 0.5};
    document.getElementById("Button2").onclick = function(){phi += dr;};
    document.getElementById("Button3").onclick = function(){phi -= dr};
    document.getElementById("Button4").onclick = function(){
        numTimesToSubdivide++;
        index = 0;
        pointsArray = [];
        normalsArray = [];
        init();
    };
    document.getElementById("Button5").onclick = function(){
        if(numTimesToSubdivide) numTimesToSubdivide--;
        index = 0;
        pointsArray = [];
        normalsArray = [];
        init();
    };


    gl.uniform4fv(gl.getUniformLocation(program,"ambientProduct"),
        flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program,"diffuseProduct"),
        flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program,"specularProduct"),
        flatten(specularProduct));
    gl.uniform4fv(gl.getUniformLocation(program,"lightPosition"),
        flatten(lightPosition));
    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"),materialShininess);
        
    render();
}




function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    eye=vec3(radius*Math.cos(theta)*Math.sin(phi), 
    radius*Math.sin(theta),radius*Math.cos(theta)*Math.cos(phi)); // eye point

    modelViewMatrix = lookAt(eye,at,up);
    projectionMatrix = ortho(left,right,bottom,ytop,near,far);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false,flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false,flatten(projectionMatrix));

    for(var i = 0; i<index; i+=3)
    gl.drawArrays(gl.TRIANGLES,i,3);

    window.requestAnimFrame(render)
}

