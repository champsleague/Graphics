var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height);
    gl.clearColor( 0.1, 0.1, 0.3, 1.0 );     //Define background #gray

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


   //mountains
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




   //house
   var house = new Float32Array([
            -0.35,-0.7,-0.05,-0.5,0.25,-0.7,
            -0.2,-0.7,0.1,-0.7,-0.2,-0.9,
             0.1,-0.7,-0.2,-0.9,0.1,-0.9
    ])

   gl.bufferData(gl.ARRAY_BUFFER,house,gl.STATIC_DRAW);
   
   // starting index in the array of vector points.
   var first = 0 
   // number of indices to render
   var count = 9 

   gl.uniform4fv(colorLoc,[1,0.8,0,1]);
   gl.uniform4fv(offsetLoc,[0.1,-0.1,0,0]);    

   render(first,count)

};

function render(first, count) {
   gl.drawArrays( gl.TRIANGLES, first, count );
}