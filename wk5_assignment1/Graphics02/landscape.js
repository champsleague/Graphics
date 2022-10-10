
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    //var vertices = new Float32Array([vec2(-1, -1), vec2(0, 1), vec2(1, -1)]);
	  // var vertices = [ vec2(-1,-1), vec2(0,1), vec2(1,-1)];
    //  Configure WebGL
    var vertices1 = new Float32Array([-0.95,-0.7,   -0.75,-0.5,    -0.55,  -0.7,
                                     -0.95,-0.3,     -0.75,-0.1,     -0.55,-0.3,
                                     -0.95,-0.5,  -0.75,-0.3,       -0.55,-0.5,                                    
                                    ]);
         
    var starone = [
        vec2( 0.2, 0.75 ), 
        vec2( 0.3, 0.95 ), 
        vec2( 0.4, 0.75),

        vec2( 0.2, 0.9 ), 
        vec2( 0.3, 0.7 ), 
        vec2( 0.4, 0.9),
    ]


    var startwo = [
        vec2( -0.7, 0.6 ), 
        vec2( -0.8, 0.8 ), 
        vec2( -0.9, 0.6),

        vec2( -0.7, 0.75 ), 
        vec2( -0.8, 0.55 ), 
        vec2( -0.9, 0.75),
    ]

    
    var mount1 = [
        vec2( -0.05, -0.1 ), 
        vec2( -0.45, 0.95 ), 
        vec2( -0.85, -0.1)
    ]  
    
    var mount2 = [
        vec2(  0.2, -0.1 ), 
        vec2( -0.2, 0.85 ), 
        vec2( -0.6, -0.1)
    ] 

    var homeroof = [
        vec2( 0.4, 0.35 ), 
        vec2( 0.7, 0.65 ), 
        vec2( 1.0, 0.35),
    ] 

    var home = [
        vec2( 0.5, -0.1 ), 
        vec2( 0.5, 0.35 ), 
        vec2( 0.9, -0.1),
        vec2( 0.9, 0.35),
    ] 

    var homedoor = [
        vec2( 0.75, -0.1 ), 
        vec2( 0.75, 0.05 ), 
        vec2( 0.85, -0.1),
        vec2( 0.85, 0.05),
    ] 

    var homewindow = [
        vec2( 0.55, 0.25 ), 
        vec2( 0.55, 0.1 ), 
        vec2( 0.75, 0.25),
        vec2( 0.75, 0.1),
    ] 


    var vertices2 = [
        vec2( -0.15, -0.6 ), 
        vec2( -0.35, -0.4 ), 
        vec2( -0.55, -0.6), 
        vec2( -0.15, -0.4 ), 
        vec2( -0.35, -0.2 ), 
        vec2( -0.55, -0.4), 
        vec2( -0.15, -0.2 ), 
        vec2( -0.35,  0.0 ), 
        vec2( -0.55, -0.2), 
                    ];


    var vertices3 = [
        vec2( -0.15, -0.7 ), 
        vec2( 0.05, -0.5 ), 
        vec2( 0.25, -0.7),     
        vec2( -0.15, -0.5 ), 
        vec2( 0.05, -0.3 ), 
        vec2( 0.25, -0.5),  
        vec2( -0.15, -0.3 ), 
        vec2(  0.05, -0.1 ), 
        vec2(  0.25, -0.3), 
                    ];


    var sqaurevertices1 = [
        vec2( -0.85, -0.7 ), // v0
        vec2( -0.85, -1 ), // v1
        vec2( -0.65, -0.7 ), // v2
        vec2( -0.65, -1) // v3
                    ];

    var sqaurevertices2 = [
        vec2( -0.45, -0.9 ), // v0
        vec2( -0.45, -0.6 ), // v1
        vec2( -0.25, -0.9 ), // v2
        vec2( -0.25, -0.6) // v3
                    ];

     var sqaurevertices3 = [
        vec2( -0.05, -0.7 ), // v0
        vec2( -0.05, -1 ), // v1
        vec2( 0.15, -0.7 ), // v2
        vec2( 0.15, -1) // v3
                    ];                
    
    
    // Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    // background color
    gl.clearColor( 0.0, 0.1, 0.3, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU (triangle)
    var buffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices1), gl.STATIC_DRAW );

    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var color = gl.getUniformLocation(program, "color");
	gl.uniform4fv(color,[0.0,1.0,0.0,1.0]);
    render();


    // Load the data into the GPU (star1)
    var star1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, star1);
    gl.bufferData( gl.ARRAY_BUFFER,flatten(starone), gl.STATIC_DRAW );  
    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    var color = gl.getUniformLocation(program, "color");
    gl.uniform4fv(color,[1,1,1,1.0]);
    gl.drawArrays(gl.TRIANGLES,0,6);


    // Load the data into the GPU (star2)
    var star2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, star2);
    gl.bufferData( gl.ARRAY_BUFFER,flatten(startwo), gl.STATIC_DRAW );  
    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    var color = gl.getUniformLocation(program, "color");
    gl.uniform4fv(color,[1,1,1,1.0]);
    gl.drawArrays(gl.TRIANGLES,0,6);


    // Load the data into the GPU (mountain1)
    var mountain1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, mountain1 );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(mount1), gl.STATIC_DRAW );  
    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    var color = gl.getUniformLocation(program, "color");
	gl.uniform4fv(color,[0,0.9,0,1.0]);
    gl.drawArrays(gl.TRIANGLES,0,3);


    // Load the data into the GPU (mountain2)
    var mountain2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, mountain2 );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(mount2), gl.STATIC_DRAW );  
    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    var color = gl.getUniformLocation(program, "color");
	gl.uniform4fv(color,[0,0.5,0,1.0]);
    gl.drawArrays(gl.TRIANGLES,0,3);


    // Load the data into the GPU (house1)
    var house1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, house1 );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(home), gl.STATIC_DRAW );  
    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    var vcolor = gl.getUniformLocation(program, "color");
	gl.uniform4fv(vcolor,[1,1,0,1.0]);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);


    // Load the data into the GPU (house2) homedoor
    var house2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, house2 );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(homedoor), gl.STATIC_DRAW );  
    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    var vcolor = gl.getUniformLocation(program, "color");
	gl.uniform4fv(vcolor,[1,0.7,0,1.0]);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);


    // Load the data into the GPU (house3) homewindow
    var house3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, house3 );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(homewindow), gl.STATIC_DRAW );  
    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    var vcolor = gl.getUniformLocation(program, "color");
	gl.uniform4fv(vcolor,[0,0.7,0.8,1.0]);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);


    // Load the data into the GPU (house4) homeroof
    var house4 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, house4 );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(homeroof), gl.STATIC_DRAW );  
    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    var vcolor = gl.getUniformLocation(program, "color");
	gl.uniform4fv(vcolor,[0,0,1,1.0]);
    gl.drawArrays(gl.TRIANGLES,0,3);


    // Load the data into the GPU (triangle2) tree
    var triangle2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, triangle2 );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices2), gl.STATIC_DRAW );  
    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    var color = gl.getUniformLocation(program, "color");
	gl.uniform4fv(color,[0,1,0,1.0]);
    gl.drawArrays(gl.TRIANGLES,0,9);


    // Load the data into the GPU (triangle3) tree
    var triangle3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, triangle3 );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices3), gl.STATIC_DRAW );  
    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    var color = gl.getUniformLocation(program, "color");
	gl.uniform4fv(color,[0,1,0,1.0]);
    gl.drawArrays(gl.TRIANGLES,0,9);


    // Load the data into the GPU (square1) tree
    var squareBuffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, squareBuffer1 );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(sqaurevertices1), gl.STATIC_DRAW );  
    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    var color = gl.getUniformLocation(program, "color");
	gl.uniform4fv(color,[0.5,0.25,0.0,1.0]);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);


    // Load the data into the GPU (square2) tree
    var squareBuffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, squareBuffer2 );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(sqaurevertices2), gl.STATIC_DRAW );
    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    var color = gl.getUniformLocation(program, "color");
    gl.uniform4fv(color,[0.5,0.25,0.0,1.0]);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);


    // Load the data into the GPU (square3) tree
    var squareBuffer3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, squareBuffer3 );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(sqaurevertices3), gl.STATIC_DRAW );   
    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    var color = gl.getUniformLocation(program, "color");
	gl.uniform4fv(color,[0.5,0.25,0.0,1.0]);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);


};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 9);

}
