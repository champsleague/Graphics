var gl;
var points;

var MaxNumTriangles = 200;
var maxNumVertices = 3 * MaxNumTriangles;
var index = 0;

var theta = 0.0;
var thetaLoc;
var delay = 100;
var direction = true;
var intervalId;

var colors = [
    vec4(1.0,1.0,0.0,1.0), //yellow
    vec4(1.0,1.0,0.0,1.0), //yellow
    vec4(1.0,1.0,0.0,1.0), //yellow
    vec4(1.0,1.0,0.0,1.0), //yellow
    vec4(1.0,1.0,0.0,1.0), //yellow
    vec4(1.0,1.0,0.0,1.0), //yellow
    vec4(1.0,1.0,0.0,1.0), //yellow
];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    
    // canvas.addEventListener("mousedown",function())
    canvas.addEventListener("mousedown",function(event){
        gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer);
        var t = vec2(2*event.clientX/canvas.width-1,
        2*(canvas.height-event.clientY)/canvas.height-1);
        gl.bufferSubData(gl.ARRAY_BUFFER,8*index,flatten(t));

        gl.bindBuffer(gl.ARRAY_BUFFER,cBuffer);
        t = vec4(colors[(index)%7]);
        gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));
        index++;
    });

    gl.viewport(0,0,canvas.width,canvas.height);
    gl.clearColor(0.1,0.1,0.3,1.0);

    var vertices = [vec2(0,1), vec2(-1,0), vec2(1,0), vec2(0,-1)]

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,bufferId);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(vertices),gl.STATIC_DRAW)

    // Load shaders an initialize attribute buffers
    var program = initShaders(gl,"vertex-shader","fragment-shader");
    gl.useProgram(program);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    render();
}

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS,0,index);

    window.requestAnimationFrame(render);
}