
var chunks = [];


var recorder = null;


var audioElement = null;
var startButton = null;
var stopButton = null;


var saveChunkToRecording = function saveChunkToRecording(event) {
    chunks.push(event.data);
};


var saveRecording = function saveRecording() {
    var blob = new Blob(chunks, {
        type: 'audio/mp4; codecs=opus'
    });
    var url = URL.createObjectURL(blob);

    audioElement.setAttribute('src', url);
};


var startRecording = function startRecording() {
    recorder.start();
};


var stopRecording = function stopRecording() {
    recorder.stop();
};


(function () {
    audioElement = document.querySelector('.js-audio');
    startButton = document.querySelector('.js-start');
    stopButton = document.querySelector('.js-stop');


    navigator.mediaDevices.getUserMedia({
        audio: true // We are only interested in the audio
    }).then(function (stream) {

        recorder = new MediaRecorder(stream);


        recorder.ondataavailable = saveChunkToRecording;
        recorder.onstop = saveRecording;
    });




    startButton.addEventListener('mouseup', startRecording);
    stopButton.addEventListener('mouseup', stopRecording);
})();

function recorderOn() {
    document.getElementById("rec").style.color = "red"

}
 function recorderOff() {
    document.getElementById("rec").style.color = "black"

}
