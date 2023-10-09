
// Initialize the Object Detector module
let objectDetector;

// Holds the image we want to run object detection on
let img;
var canvas;
let canvasDiv;
let width;
let height;
let imgElement = document.getElementById('imageOriginal');
let inputElement = document.getElementById('imageInput');


document.getElementById('button').onclick = function() {
    this.href = document.getElementById("myCanvas").toDataURL();
    this.download = "image.png";
};


inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);

    
    img = loadImage(imgElement.src);
    imgoryginal = loadImage(imgElement.src);
    
}, false);

document.getElementById('detectButton').onclick = function() {
    
  
    canvasDiv = document.getElementById('imageOryginalDiv');
    width = canvasDiv.offsetWidth;
    height = canvasDiv.offsetHeight;
	this.disabled = true;
    objectDetector.detect(img, gotResult);
    resizeCanvas(width, height);
    img.resize(width, height);
    image(img, 0, 0);
    
    
	this.disabled = false;
	}
	
function preload() {
    objectDetector = ml5.objectDetector('cocossd');

}


function setup() {
  
    
        canvasDiv = document.getElementById('imageOryginalDiv');
        width = canvasDiv.offsetWidth;
        height = canvasDiv.offsetHeight;
        canvas = createCanvas(width, height);
        canvas.parent('imageCanvasDiv');
        canvas.id('myCanvas');
 
}



function draw() {
  //background(0, 100, 200);
 
}

function windowResized() {
    
    canvasDiv = document.getElementById('imageOryginalDiv');
    width = canvasDiv.offsetWidth;
    height = canvasDiv.offsetHeight;
    resizeCanvas(width, height);
    
    img.resize(width, height);
    image(img, 0, 0);
}

function gotResult(error, results) {

    if (error) {
        console.error(error);
    } else {
        console.log(results);

        drawResults(results);

    }
}


function drawResults(results) {
    results.forEach((result) => {

        // Generates a random color for each object
        const r = Math.random()*256|0;
        const g = Math.random()*256|0;
        const b = Math.random()*256|0;

        // Draw the text
        stroke(0, 0, 0);
        strokeWeight(2);
        textSize(16);
        fill(r, g, b);
        text(`${result.label} (${result.confidence.toFixed(2)}%)`, result.x, result.y - 10);

        // Draw the rectangle stroke
        noFill();
        strokeWeight(3);
        stroke(r, g, b);
        rect(result.x, result.y, result.width, result.height);
    });
};



