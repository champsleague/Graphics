var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height);
    gl.clearColor( 0.6, 0.6, 0.6, 1.0 );     //Define background #gray

    //  Load shaders and initialize 
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );

   gl.useProgram( program );   

    // create a buffer on gpu and bind point    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId ); 

   var vertexColorBufferId = gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId );


    // Associate out shader variables with our data buffer      
   // attribute variable
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vPosition );
   
   var vColor = gl.getAttribLocation(program, "vColor" );   
   gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
   gl.enableVertexAttribArray( vColor );

   // uniform variable
   var offsetLoc = gl.getUniformLocation(program, "offset");
   var colorLoc = gl.getUniformLocation(program, "color");
   
   
   // clear buffer bit
    gl.clear( gl.COLOR_BUFFER_BIT );


   //mountain
   var mountain = new  Float32Array([
         -1,-1,-0.5,0.5,0.0,-1
      ])

   gl.bufferData(gl.ARRAY_BUFFER, mountain, gl.STATIC_DRAW );

    var first = 0 // the starting index in the array of vector points.
   var count = 3 // the number of indices to be rendered.

   gl.uniform4fv(colorLoc,[0,1,0,1]);
   render(first, count);

    gl.uniform4fv(offsetLoc,[0.5,0.0,0,0]);    
   render(first, count)

    gl.uniform4fv(offsetLoc,[1.0,0.0,0,0]);    
   render(first, count)

    //star
    var star = new Float32Array([
        -0.1,0.9,0.0,1,0.1,0.9,-0.1,0.95,0.0,0.85,0.1,0.95
        ])
    gl.bufferData(gl.ARRAY_BUFFER,star,gl.STATIC_DRAW);

    var first = 0 // the starting index in the array of vector points.
   var count = 6 // the number of indices to be rendered

    gl.uniform4fv(colorLoc,[1,1,0,1]);
   render(first, count);


    gl.uniform4fv(offsetLoc,[-0.5,0.0,0,0]);    
   render(first, count)

    gl.uniform4fv(offsetLoc,[0.0,0.0,0,0]);    
   render(first, count)
    
    gl.uniform4fv(offsetLoc,[0.1,-0.2,0,0]);    
   render(first, count)

    gl.uniform4fv(offsetLoc,[0.3,-0.1,0,0]);    
   render(first, count)
    
    gl.uniform4fv(offsetLoc,[0.5,-0.15,0,0]);    
   render(first, count)

    
    gl.uniform4fv(offsetLoc,[-0.3,-0.1,0,0]);    
   render(first, count)

    //house

    var house = new Float32Array([
            -0.15,-0.7,0.0,-0.6,0.15,-0.7,
            -0.1,-0.7,0.1,-0.7,-0.1,-0.9,
            0.1,-0.7,-0.1,-0.9,0.1,-0.9
    ])

    gl.bufferData(gl.ARRAY_BUFFER,house,gl.STATIC_DRAW);
       
    var first = 0 // the starting index in the array of vector points.
   var count = 9 // the number of indices to be rendered
    
    render(first,count)

   //moon

//    var vColor = gl.getAttribLocation(program, "vColor" );   
//    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
//     gl.enableVertexAttribArray( vColor );

   var moon = new Float32Array([
        -0.9,0.9, -1.0, 0.75, -1.0, 0.65,
      -0.9,0.9, -1.0, 0.65, -0.9, 0.50,
      -0.9,0.9, -0.9, 0.50, -0.80, 0.50,
      -0.9,0.9, -0.80, 0.50, -0.7, 0.65,
      -0.9,0.9, -0.7, 0.65, -0.7, 0.75,
      -0.9,0.9, -0.7, 0.75, -0.80, 0.9
    ])

    gl.bufferData(gl.ARRAY_BUFFER, moon, gl.STATIC_DRAW );
    gl.uniform4fv(colorLoc,[1,1,0,1]);
    gl.uniform4fv(offsetLoc, [-0.8, 0.9, 0.6, 1]);
    render(0,36);




};

function render(first, count) {
   gl.drawArrays( gl.TRIANGLES, first, count );
}