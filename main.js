status = ""
inputValue = ""
objects = [];
function preload(){

}
function setup(){
    canvas = createCanvas(400, 380)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
}

function draw(){
image(video, 0, 0, 400, 380)
if(status != ""){
    objectDetector.detect(video, gotResult)
    for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status: Objects detected. Showing in a red box."
    console.log(i)
    fill('#80000D')
    percentage = floor(objects[i].confidence * 100)
    console.log(percentage)
    text(objects[i].label + " | " + percentage + "%", objects[i].x + 20, objects[i].y + 20)
    noFill()
    stroke('#80000D')
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

if(objects[i].label == inputValue){
    video.stop()
    objectDetector.detect(gotResult)
    document.getElementById("objectDetected").innerHTML = inputValue + " has been found."
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(inputValue + " has been found")
    synth.speak(utterThis)
}
else{
    document.getElementById("objectDetected").innerHTML = inputValue + " has not been found."
}
}
}
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Objects are being detected..."
  inputValue = document.getElementById("objectInput").value
}

function modelLoaded(){
    console.log("Model(s) have been loaded.")
status = true;

}

function gotResult(error, results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
objects = results;
    }
}

