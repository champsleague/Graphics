var gl;
var points;

var theta = 0.0;
var thetaLoc;

var delay = 100;
var direction = true;

var maxNumTriangles = 200;  
var maxNumVertices  = 3 * maxNumTriangles;
var index = 0;


window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height);
    gl.clearColor( 0.1, 0.1, 0.4, 1.0 );     //Define background

    //  Load shaders and initialize 
    program = initShaders( gl, "vertex-shader", "fragment-shader" );

   gl.useProgram( program );   

   // clear buffer bit
    gl.clear( gl.COLOR_BUFFER_BIT );

    //change direction button
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

    // uniform variable
    
   offsetLoc = gl.getUniformLocation(program, "offset");
   colorLoc = gl.getUniformLocation(program, "color");

    //click, save star location
    canvas.addEventListener("mousedown", function(event){

        var t = vec2(2*event.clientX/canvas.width-1, 
        2*(canvas.height-event.clientY)/canvas.height-1);
        gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));
        

        starlist.push(t);

    });
    
   
    render1();
    
};

function render1()
{

    function drawMountain(){

        mountain = [
            vec2(-1,-1),
            vec2(-0.5,0.5),
            vec2(0.0,-1)
        ]
    
        mountainColor=[
            vec4(0,1,0.7,0.5),
            vec4(0.3,0.5,0,1),
            vec4(0.2,0.6,0,1),
           ];
    
         // Load the data into the GPU
        var bufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
        gl.bufferData( gl.ARRAY_BUFFER,flatten(mountain), gl.STATIC_DRAW );
    
        // Associate out shader variables with our data buffer
        var vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );
    
        var vertexColorBufferId = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId)
        gl.bufferData(gl.ARRAY_BUFFER, flatten(mountainColor), gl.STATIC_DRAW)
    
        
        var vColor = gl.getAttribLocation( program, "vColor" );
        gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vColor );
    
        gl.drawArrays( gl.TRIANGLES, 0, 3 );
    
    }

    function starlist(){
        gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
        gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));
        gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));
        
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        t = vec4(colors[(index)%7]);
        gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));
        index++;

    }



    function drawHouse(){

        var house = new Float32Array([
            -0.35,-0.7,-0.05,-0.4,0.25,-0.7,
            -0.2,-0.7,0.1,-0.7,-0.2,-0.95,
             0.1,-0.7,-0.2,-0.95,0.1,-0.95
    ])
    
        houseColor=[
            vec4(0,0.5,1),
            vec4(1.1,0.6,1),
            vec4(0,0.8,1),
           ];
    
         // Load the data into the GPU
        var bufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
        gl.bufferData( gl.ARRAY_BUFFER,flatten(house), gl.STATIC_DRAW );
    
        // Associate out shader variables with our data buffer
        var vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );
    
        var vertexColorBufferId = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId)
        gl.bufferData(gl.ARRAY_BUFFER, flatten(houseColor), gl.STATIC_DRAW)
    
        
        var vColor = gl.getAttribLocation( program, "vColor" );
        gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vColor );
    
        gl.drawArrays( gl.TRIANGLES, 0, 9 );
    
    }


    function drawStar(){

        var starlist = new Float32Array([
            -0.35,-0.7,-0.05,-0.4,0.25,-0.7,
            -0.2,-0.7,0.1,-0.7,-0.2,-0.95,
             0.1,-0.7,-0.2,-0.95,0.1,-0.95
    ])
    
        var starcolors = [
            vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
            vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
            vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
            vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
            vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
            vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
            vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
            vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
            vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        ];
    
         // Load the data into the GPU
        var bufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
        gl.bufferData( gl.ARRAY_BUFFER,flatten(starlist), gl.STATIC_DRAW );
    
        // Associate out shader variables with our data buffer
        var vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );
    
        var vertexColorBufferId = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId)
        gl.bufferData(gl.ARRAY_BUFFER, flatten(starcolors), gl.STATIC_DRAW)
    
        
        var vColor = gl.getAttribLocation( program, "vColor" );
        gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vColor );
    
        gl.drawArrays( gl.TRIANGLES, 0, 9 );
    
    }



    // theta initialization
    gl.uniform1f(thetaLoc, 0);

    gl.clear( gl.COLOR_BUFFER_BIT );

    gl.uniform4fv(colorLoc,[0,0,0,1]);
    gl.uniform4fv(offsetLoc,[0.0,0.0,0,0]); 
    drawMountain();
   

    gl.uniform4fv(offsetLoc,[0.4,0.0,0,0]);    
    drawMountain();
   

    gl.uniform4fv(offsetLoc,[0.9,0.0,0,0]); 
    drawMountain();   

    gl.uniform4fv(colorLoc,[1,1,0,1]);


    gl.uniform4fv(offsetLoc,[-0.7,0.0,0,0]); 
    for(var i = 0; i<starlist.length; i++){
        drawStar(starlist[i][0],starlist[i][1]);
    }
    
   

    gl.uniform4fv(offsetLoc,[0.7,0.0,0,0]); 
    gl.uniform4fv(colorLoc,[1,1,0,1]);
    drawHouse();



    var moon = new Float32Array([
        -0.9,0.9, -1.0, 0.75, -1.0, 0.65,
        -0.9,0.9, -1.0, 0.65, -0.9, 0.50,
        -0.9,0.9, -0.9, 0.50, -0.80, 0.50,
        -0.9,0.9, -0.80, 0.50, -0.7, 0.65,
        -0.9,0.9, -0.7, 0.65, -0.7, 0.75,
        -0.9,0.9, -0.7, 0.75, -0.80, 0.9
        ])
    
        moonColor=[
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
            vec4(1,1,0,1),
          
        ];
    
        // Load the data into the GPU
        var bufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
        gl.bufferData( gl.ARRAY_BUFFER,moon, gl.STATIC_DRAW );
    
        // Associate out shader variables with our data buffer
        
        var vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );
    
        var vertexColorBufferId = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId)
        gl.bufferData(gl.ARRAY_BUFFER, flatten(moonColor), gl.STATIC_DRAW)
    
        var vColor = gl.getAttribLocation( program, "vColor" );
        gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vColor );
        thetaLoc = gl.getUniformLocation( program, "theta" );
        
        gl.uniform4fv(colorLoc,[1,1,0,1]);
        gl.uniform4f(offsetLoc, -0.8, 0.9, 0.0, 1);
        // rotation moon
        theta += (direction ? 0.1 : -0.1);
        gl.uniform1f(thetaLoc, theta);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 18);
    

   

    //gl.drawArrays(gl.TRIANGLES, 0, 18);

    setTimeout(
        function (){requestAnimFrame(render1);}, delay
    );
}
