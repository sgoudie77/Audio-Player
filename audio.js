// Set Audio Player Button Variables
const play = document.querySelector(".play");
const previous = document.querySelector(".prev");
const next = document.querySelector(".next");

// Set Track Detail Variables
const trackImage = document.querySelector(".track-image");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");

// Set Current Track Variables
const trackCurrentTime = document.querySelector(".current-time");
const trackDuration = document.querySelector(".duration-time");
const trackSlider = document.querySelector(".duration-slider");

// Set Track Volume Variables 
const showVolume = document.querySelector("#show-volume");
const volumeIcon = document.querySelector("#volume-icon");
const currentVolume = document.querySelector("#volume");

// Set Play All Tracks Autoplay Variable
const playAll = document.querySelector(".play-all");

// Set Playlist Hide and Show Variables 
const openPlaylistIcon = document.querySelector(".fa-bars"); 
const closePlaylistIcon = document.querySelector(".fa-times");

// Set Music Playlist Variables
const trackPlaylist = document.querySelector(".track-playlist");
const playlistItems = document.querySelector(".playlist-items");
const playlist = document.querySelector(".playlist");

// Set Track Playing Variables 
let timer;
let autoplay = 0;
let indexTrack = 0;
let songIsPlaying = false;
let track = document.createElement("audio");

// Event Listeners
play.addEventListener("click", trackPlay);
next.addEventListener("click", nextTrack);
previous.addEventListener("click", prevTrack);
playAll.addEventListener("click", playAllToggle);
volumeIcon.addEventListener("click", muteSound);
currentVolume.addEventListener("change", changeVolume);
trackSlider.addEventListener("change", changeDuration);
track.addEventListener("timeupdate", trackTimeUpdate);
openPlaylistIcon.addEventListener("click", showPlayist);
closePlaylistIcon.addEventListener("click", hidePlayist);

// Load Tracks
function loadTrack(indexTrack) {
    clearInterval(timer);
    resetSlider();

    track.src = trackList[indexTrack].path;
    trackImage.src = trackList[indexTrack].img;
    title.innerHTML = trackList[indexTrack].name;
    artist.innerHTML = trackList[indexTrack].tradckArtist;
    track.load();

    timer = setInterval(updateSlider, 1000);
}
loadTrack(indexTrack);

// Play or Pause Track
function trackPlay() {
    if (songIsPlaying == false) {
        playTrack();
    } else {
        pauseTrack();
    }
}

// Play Track
function playTrack() {
    track.play();
    songIsPlaying == true;
    play.innerHTML = '<i class="fas fa-pause"></i>';
}

// Pause Track
function pauseTrack() {
    track.pause();
    songIsPlaying == false;
    play.innerHTML = '<i class="fas fa-play"></i>';
}

// Next Track
function nextTrack() {
    if (indexTrack < trackList.length - 1) {
        indexTrack++;
        loadTrack(indexTrack);
        playTrack();
    } else {
        indexTrack = 0; 
        loadTrack(indexTrack);
        playTrack();
    }
}

// Previous Track
function prevTrack() {
    if (indexTrack > 0) {
        indexTrack--;
        loadTrack(indexTrack);
        playTrack();
    } else {
        indexTrack = trackList.length - 1;
        loadTrack(indexTrack);
        playTrack();
    }
}

// Mute Volume
function muteSound() {
    if (track.muted == false) {
        track.muted == true;
        volumeIcon.innerHTML = '<i class="fas fa-volume-mute" id="volume-icon"></i>';
    } else {
        track.muted == false;
        volumeIcon.innerHTML = '<i class="fas fa-volume-up" id="volume-icon"></i>';
    }
}

// Change Volume 
function changeVolume() {
    showVolume.value = currentVolume.value;
    track.volume = currentVolume.value / 100;
    console.log(track.volume);
    document.getElementById('show-volume').innerHTML = track.volume * 100 + "%";
}

// Change Duration
function changeDuration() {
    let sliderPosition = track.duration * (slider.value / 100);
    track.currentTime = sliderPosition;
}

// Play All Tracks Autoplay
function playAllToggle() {
    if (autoplay == 0) {
        autoplay == 1;
        playAll.style.background = "#db6400";
    } else {
        autoplay = 0;
        playAll.style.background = "#ccc";
    }
}

// Reset Slider
function resetSlider() {
    slider.value = 0;
}

// Update Slider

