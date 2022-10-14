var gl;
var points;

var theta = 0.0;
var thetaLoc;

var delay = 100;
var direction = true;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height);
    gl.clearColor( 0.1, 0.1, 0.3, 1.0 );     

    //  Load shaders and initialize 
   var program = initShaders( gl, "vertex-shader", "fragment-shader" );
   gl.useProgram( program );  
   
   var vertices = [
      vec2(  0,  0.5 ),
      vec2(  -0.5,  0 ),
      vec2( 0.5,  0 ),
      vec2(  0, -0.5 )
   ];

  var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

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

   thetaLoc = gl.getUniformLocation( program, "theta" );

   var myButton = document.getElementById("Direction");
    myButton.addEventListener("click", function() {
	    if (event.shiftKey == 0) { direction = !direction; }
    });


    document.getElementById("Controls" ).onclick = function(event) {
        //switch( event.srcElement.index ) {
        switch( event.target.index ) {
          case 0:
            direction = !direction;
            break;
         case 1:
            delay /= 2.0;
            break;
         case 2:
            delay *= 2.0;
            break;
       }
    };

	window.addEventListener("keydown", function() {
		console.log(event.keyCode)  
		switch (event.keyCode) {
			case 49: // ��1�� key
				direction = !direction;
				break;
			case 50: // ��2�� key
				delay /= 2.0;
				break;
			case 51: // ��3�� key
				delay *= 2.0;
				break;
		}	
	});



   
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
         -1,-1.2,-0.5,0.2,0.0,-1.3
      ])

   gl.bufferData(gl.ARRAY_BUFFER, mountain, gl.STATIC_DRAW );

   var first = 0 // the starting index in the array of vector points.
   var count = 3 // the number of indices to be rendered.

   gl.uniform4fv(colorLoc,[0,0.9,0,1]);
 
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

