var gl;
var points;

var MaxNumTriangles = 200;
var maxNumVertices = 3 * MaxNumTriangles;
var index = 0;

var colors = [
    vec4(1.0,1.0,0.0,1.0) //yellow
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
    gl.clearColor(0.5,0.5,0.5,1.0);

    // Load shaders an initialize attribute buffers
    var program = initShaders(gl,"vertext-shader","fragment-shader");
    gl.useProgram(program);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW);

    var vPosition
}