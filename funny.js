user_name = localStorage.getItem("user_name");
console.log(user_name);

nose_x=null;
nose_y=null;
selectedImage = null;
function checkActiveImage() {
    var activeItem = document.querySelector(".carousel-inner .item.active img");


    if (activeItem && activeItem.getAttribute("src") === "m.png") {
       selectedImage=musta;
    } 
    else if(activeItem && activeItem.getAttribute("src") === "l.png") {
       selectedImage=lipa;
    
    }
    else{
      selectedImage=null;
    }
}


setInterval(checkActiveImage, 500);
function logs(){
    window.location="index.html";
}
function setup(){
    canvas=createCanvas(300,300);
 
    video=createCapture(VIDEO);
    video.size(300,300);
    video.hide();
   
    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("Pose Net is intilized");

}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        console.log("nose x = " + nose_x);
        console.log("nose y = " + nose_y);
        nose_x=results[0].pose.nose.x;
        nose_y=results[0].pose.nose.y;
        if (selectedImage == lipa) {
            nose_x= nose_x-20; 
            nose_y=nose_y+15;
        } else if (selectedImage == musta) {
            nose_x= nose_x-10; 
            nose_y;
            
           
        }


    }

}
function draw(){
    image(video, 0, 0, 300, 300); 
    if (selectedImage) {
        image(selectedImage, nose_x, nose_y, 30, 30);
    }
}


function preload(){
    musta=loadImage('m.png');
    lipa=loadImage('l.png');
}
     var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = false;

        function startRecognition() {
            recognition.start();
        }

        recognition.onresult = function(event) {
            console.log(event);
            var Content = event.results[event.results.length - 1][0].transcript;
            console.log(Content);
            

            if (Content==("selfie")) {
                console.log("Taking selfie in 5 seconds");
                speak();
            }
        };

        function speak() {
            var synth = window.speechSynthesis;
            var speak_data = "Taking selfie in 5 seconds";
            var utter = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utter);

            setTimeout(function() {
                take_snapshot(); 
            }, 5000);
        }

        function take_snapshot() {
            save('selfie.png'); 
            console.log("Selfie Saved!");
        }

        recognition.onend = function() {
            console.log("Restarting Speech Recognition...");
            recognition.start();
        }
        console.log();
       