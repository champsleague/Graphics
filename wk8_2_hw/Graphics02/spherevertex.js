
var canvas;
var gl;

var numTimesToSubdivide = 4;

var index=0;

var pointsArray = [];
var normalsArray = [];

var near = -10;
var far = 10;
var radius = 1.5;
var theta = 0.0;
var phi = 0.0;
var dr = 5.0*Math.PI/180.0;

var left=-3.0;
var right= 3.0;
var ytop = 3.0;
var bottom=-3.0;

var va = vec4(0.0,0.0,-1.0,1);
var vb = vec4(0.0,0.942809,0.333333,1);
var vc = vec4(-0.816497,-0.471405,0.333333,1);
var vd = vec4(0.816497,-0.471405,0.333333,1);



var lightPosition = vec4(10.0,10.0,10.0,0.0);
var lightAmbient = vec4(0.2,0.2,0.2,1.0);
var lightDiffuse = vec4(1.0,1.0,1.0,1.0);
var lightSpecular = vec4(1.0,1.0,1.0,1.0);

var materialAmbient = vec4(1.0,0.0,1.0,1.0);
var materialDiffuse = vec4(1.0,0.8,0.0,1.0);
var materialSpecular = vec4(1.0,0.8,0.0,1.0);
var materialShininess = 2.0;


var ctm;
var ambientColor, diffuseColor, specularColor;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

var eye;
var at = vec3(0.0,0.0,0.0);
var up = vec3(0.0,1.0,0.0);

function triangle(a,b,c){
    pointsArray.push(a);
    pointsArray.push(b);
    pointsArray.push(c);

    normalsArray.push(a[0],a[1],a[2],0.0);
    normalsArray.push(b[0],b[1],b[2],0.0);
    normalsArray.push(c[0],c[1],c[2],0.0);

    index += 3;
}


function divideTriangle(a,b,c, count)
{
   if(count>0){
    var ab = mix(a,b,0.5);
    var ac = mix(a,c,0.5);
    var bc = mix(b,c,0.5);

    ab = normalize(ab,true);
    ac = normalize(ac,true);
    bc = normalize(bc,true);

    divideTriangle(a,ab,ac,count-1);
    divideTriangle(ab,b,bc,count-1);
    divideTriangle(bc,c,ac,count-1);
    divideTriangle(ab,bc,ac,count-1);
   }
   else{
    triangle(a,b,c);
   }
}


function tetrahedron(a,b,c,d,n){
    divideTriangle(a,b,c,n);
    divideTriangle(d,c,b,n);
    divideTriangle(a,d,b,n);
    divideTriangle(a,c,d,n);
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
    gl.cullface(gl.FRONT);

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var ambientProduct = mult(lightAmbient,materialAmbient);
    var diffuseProduct = mult(lightDiffuse,materialDiffuse);
    var specularProduct = mult(lightSpecular,materialSpecular);

    tetrahedron(va,vb,vc,vd,numTimesToSubdivide);
    

    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
    

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelViewMatrixLoc = gl.getUniformLocation(program,"modelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program,"projectionMatrix");





    
    document.getElementById("ButtonX").onclick = function(){axis = xAxis; render();};
    document.getElementById("ButtonY").onclick = function(){axis = yAxis; render();};
    document.getElementById("ButtonZ").onclick = function(){axis = zAxis; render();};
    document.getElementById("ButtonT").onclick = function(){flag = !flag; render();};

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

    gl.uniformMatrix4fv(gl.getUniformLocation(program,"projectionMatrix"),
        false,flatten(projection));
        
    render();
}




var render=function()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    if(flag) theta[axis] += 2.0;

    modelView = mat4();
    modelView = mult(modelView,rotate(theta[xAxis],[1,0,0]));
    modelView = mult(modelView,rotate(theta[yAxis],[0,1,0]));
    modelView = mult(modelView,rotate(theta[zAxis],[0,0,1]));


    gl.uniformMatrix4fv(gl.getUniformLocation(program,
        "modelViewMatrix"), false,flatten(modelView));

    gl.drawArrays(gl.TRIANGLES,0,numVertices)
}

