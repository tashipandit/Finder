objects = [];
status = "";

function preload(){
  
}


function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video=createCapture(VIDEO)
  video.size (480,380)
  video.hide();
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  object_name=document.getElementById ("object-name").value
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 480, 380);
      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Objects Detected";
    
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x-60, objects[i].y+30, objects[i].width, objects[i].height);
        }
      }
}
