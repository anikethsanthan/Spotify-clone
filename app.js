//Here we called all the clasess and Id's we needed and stored it in a variable.
let seekbar= document.querySelector(".progress-bar");
let totaltime =document.querySelector(".Tot-time");
let currTime = document.querySelector(".curr-time");
let songValue=document.querySelector("#song-name");
let volumeSeekbar =document.querySelector("#volumeSeekbar");
let artistName=document.querySelector("#singer");
let playbutton=document.querySelector(".playbutton");




playbutton.addEventListener("click",function(){
    console.log("Play button was clicked");
})

let songs=[
     { title:"O Maahi", file:"./assets/OMaahi.mp3",subtitle: "Arijit Singh"},
     { title:"Mahiye Jinha Sona", file:"./assets/MahiyeJinhaSona.mp3",subtitle:"Darshan Raval"},
     { title:"Mere Pass Tum ho", file:"./assets/MerePaasTum.mp3" ,subtitle:"Rahat Fateh Ali Khan"},
     { title:"Ishq", file:"./assets/Ishq.mp3" ,subtitle:"Band"},
     { title:"Khoobsurat", file:"./assets/Khoobsurat.mp3",subtitle:"Vishal Mishra"},
     { title:"Sajni Re", file:"./assets/SajniRe.mp3",subtitle:"Arijit Singh"},

];
let songButton=document.querySelectorAll(".card");
let audio=null;
let currentSongIndex=-1;

for (let i = 0; i < songs.length; i++) {
    songButton[i].addEventListener("click", function() {
         playOrPauseSong(i); // Pass the song index to play or pause
    });
}
// Play button toggle for the currently selected song
playbutton.addEventListener("click", function() {
    if (currentSongIndex !== -1) {
         playOrPauseSong(currentSongIndex); // Play or pause the currently selected song
    } else {
         console.log("No song selected yet");
    }
});

 function playOrPauseSong(i){
     if (currentSongIndex===i){
        if (audio.paused){
             playbutton.src="./assets/Pause-icons.jpg";
             audio.play();
             console.log("Song is playing");
        }else{
             playbutton.src="./assets/player_icon3.png";
             audio.pause();
             console.log(" Song is Paused");
        }  return; 
     } if(audio){
         audio.pause();
         audio.currentTime=0;
    
    }
     audio= new Audio(songs[i].file);
     currentSongIndex=i;
     audio.load();

     playbutton.src = "./assets/Pause-icons.jpg";
     songValue.innerText=songs[i].title;
     artistName.innerText=songs[i].subtitle;

     audio.preload = "auto";
     audio.play();
     trackProgress();
 }




 //All the tracking and extra functions are here....
 function trackProgress(){
    volumeSeekbar.addEventListener("input",function(){
         audio.volume=volumeSeekbar.value /100;
    })
    audio.volume =volumeSeekbar.value/100;
    //Tracks the progess bar according to the song
    audio.addEventListener("timeupdate",function(){
         let progress= (audio.currentTime/audio.duration)*100;
             seekbar.value=progress;
             seekbar.style.background = `linear-gradient(to right, #1bd760 ${progress}%, #ddd ${progress}%)`;

    //lets user scrub through the seekbar
    seekbar.addEventListener("input",function(){
         let seekTo=(seekbar.value/100)*audio.duration;
             audio.currentTime=seekTo;
             seekbar.style.background = `linear-gradient(to right, #1bd760 ${seekbar.value}%, #ddd ${seekbar.value}%)`;
    })
    function formatTime(seconds){
         let minutes=Math.floor(seconds/60);
         let secs=Math.floor(seconds%60);
             if (secs<10) secs ="0"+secs;
             return minutes +":"+secs;
    }

    //changes the total and initial value of time in seekbar's sides.
    audio.addEventListener("loadedmetadata",function(){
         totaltime.innerText=formatTime(audio.duration);  
    })
    audio.addEventListener("timeupdate",function(){
         currTime.innerText=formatTime(audio.currentTime);
    })         
    })
 }
