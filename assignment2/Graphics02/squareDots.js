

var canvas;
var gl;
var points;


var maxNumTriangles = 200;  
var maxNumVertices  = 3 * maxNumTriangles;
var index = 0;

var colors = [
    // vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    // vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    // vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    // vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    // vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    // vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];


window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    //vertex position
    var t_vertices = [
        vec2(0,0.5),  //v0
        vec2(-0.5,-0.5),  //v1
        vec2(0.5,-0.5),  //v2
    ];

    //vertex color (R,G,B,A)
    var t_colors = [
        vec4(1.0,0.0,0.0,1.0), //v0
        vec4(0.0,1.0,0.0,1.0), //v1
        vec4(0.0,0.0,1.0,1.0) //v2
    ];



    //canvas.addEventListener("mousedown", function(){
    canvas.addEventListener("mousedown", function(event){
        gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
        var t = vec2(2*event.clientX/canvas.width-1, 
           2*(canvas.height-event.clientY)/canvas.height-1);
        gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));
        
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        t = vec4(colors[(index)%7]);
        gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));
        index++;
    } );


    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.3, 0.5, 0.5, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    var vertexPositionBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(t_vertices),gl.STATIC_DRAW);

    var fPosition = gl.getAttribLocation( program, "fPosition" );
    gl.vertexAttribPointer( fPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( fPosition );


    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(t_colors),gl.STATIC_DRAW);

    var aColor = gl.getAttribLocation(program,"aColor");
    gl.vertexAttribPointer(aColor,4,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(aColor)

     //render
     gl.clear( gl.COLOR_BUFFER_BIT );
     gl.drawArrays( gl.TRIANGLES, 0, 3);
    
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    render();

}


function render() {
    
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.POINTS, 0, index );

    window.requestAnimFrame(render);

}
