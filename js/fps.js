// vars for counting frames/s, used by the measureFPS function
var frameCount = 0;
var lastTime;
var fpsContainer;
var fps="--"; 

var initCounter = function() {
	// adds a div for displaying the fps value
	fpsContainer = document.createElement('div');
    fpsContainer.className = "fps";
    document.body.appendChild(fpsContainer);	
}

var measureFPS = function(newTime){
	// test for the very first invocation
	if(lastTime === undefined) {
		lastTime = newTime; 
		return;
	}

	//calculate the difference between last & current frame
	var diffTime = newTime - lastTime;
	if (diffTime >= 1000) {
		fps = frameCount;    
		frameCount = 0;
		lastTime = newTime;
	 }

	
	
	fpsContainer.innerHTML = 'FPS: ' + fps; 
	frameCount++;
};