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

const repeat = document.querySelector(".repeat-track")

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
openPlaylistIcon.addEventListener("click", showPlaylist);
closePlaylistIcon.addEventListener("click", hidePlaylist);
repeat.addEventListener("click", repeatTrack);

// Load Tracks
function loadTrack(indexTrack) {
    clearInterval(timer);
    resetSlider();

    track.src = trackList[indexTrack].path;
    trackImage.src = trackList[indexTrack].img;
    title.innerHTML = trackList[indexTrack].name;
    artist.innerHTML = trackList[indexTrack].trackArtist;
    track.load();

    timer = setInterval(updateSlider, 1000);
    console.log(indexTrack);
    document.getElementById("track-num").innerHTML = indexTrack + 1;
    document.getElementById("track-total").innerHTML = trackList.length;
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
    songIsPlaying = true;
    play.innerHTML = '<i class="fas fa-pause"></i>';
}

// Pause Track
function pauseTrack() {
    track.pause();
    songIsPlaying = false;
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

// Repeat Track
function repeatTrack() {
    if (track.loop == false) {
        track.loop = true;
        repeat.style.background = "#4f4f4f";
        repeat.style.color = "#fff";
    } else {
        track.loop = false;
        repeat.style.background = "#e3e3e3";
        repeat.style.color = "#000";
    }
}

// Mute Volume
function muteSound() {
    if (track.muted == false) {
        track.muted = true;
        volumeIcon.innerHTML = '<i title="unmute" class="fas fa-volume-up" id="volume-icon"></i>';
    } else {
        track.muted = false;
        volumeIcon.innerHTML = '<i title="mute" class="fas fa-volume-mute" id="volume-icon"></i>';
    }
}

// Change Volume 
function changeVolume() {
    showVolume.value = currentVolume.value;
    track.volume = currentVolume.value / 100;
    console.log(track.volume);
    document.getElementById('show-volume').innerHTML = Math.floor(track.volume * 100) + "%";
}

// Change Duration
function changeDuration() {
    let sliderPosition = track.duration * (trackSlider.value / 100);
    track.currentTime = sliderPosition;
}

// Play All Tracks Autoplay
function playAllToggle() {
    if (autoplay == 0) {
        autoplay = 1;
        playAll.style.background = "#4f4f4f";
        playAll.style.color = "#fff";
    } else {
        autoplay = 0;
        playAll.style.background = "#e3e3e3";
        playAll.style.color = "#000";
    }
}

// Reset Slider
function resetSlider() {
    trackSlider.value = 0;
}

// Update Slider
function updateSlider() {
    let position = 0;

    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        trackSlider.value = position;
    }

    if (track.ended) {
        play.innerHTML = '<i class="fas fa-play"></i>';
        if (autoplay == 1 && indexTrack < trackList.length -1) {
            indexTrack++;
            loadTrack(indexTrack);
            playTrack();
        } else if (autoplay == 1 && indexTrack == trackList.length -1) {
            indexTrack = 0;
            loadTrack(indexTrack);
            playTrack();
        }
    }
}

// Update Current Track Time
function trackTimeUpdate() {
    if (track.duration) {
        let currentMins = Math.floor(track.currentTime / 60);
        let currentSecs = Math.floor(track.currentTime - currentMins * 60);
        let durationMins = Math.floor(track.duration / 60);
        let durationSecs = Math.floor(track.duration - durationMins *60);
        // append zero to times below if value is less than ten
        if (durationMins < 10 ) {
            durationMins = "0" + durationMins;
        }
        if (durationSecs < 10 ) {
            durationSecs = "0" + durationSecs;
        }
        if (currentMins < 10 ) {
            currentMins = "0" + currentMins;
        }
        if (currentSecs < 10 ) {
            currentSecs = "0" + currentSecs;
        }
        trackCurrentTime.innerHTML = currentMins + ":" + currentSecs;
        trackDuration.innerHTML = durationMins + ":" + durationSecs;
    } else {
        trackCurrentTime.innerHTML = "00" + ":" + "00";
        trackDuration.innerHTML = "00" + ":" + "00";
    }
}

// Show Tracklist
function showPlaylist() {
    trackPlaylist.style.transform = "translateX(0)";
}
// Hide Tracklist
function hidePlaylist() {
    trackPlaylist.style.transform = "translateX(-100%)";
}

// Display Tracks in the Playlist
let counter = 1;
function displayTracks() {
    for (let i=0; i < trackList.length; i++) {
        let div = document.createElement("div");
        div.classList.add("playlist");
        div.innerHTML = `
            <span class="track-index">${counter++}</span>
            <p class="single-track">${trackList[i].name}</p>
        `;
        playlistItems.appendChild(div);
    }
    playFromPlayList();
}

displayTracks();

// Play Track From Tracklist
function playFromPlayList() {
    playlistItems.addEventListener("click", (e) => {
        if (e.target.classList.contains("single-track")) {
            const indexNum = trackList.findIndex((item, index) => {
                if (item.name === e.target.innerHTML) {
                    return true;
                }
            });
            loadTrack(indexNum);
            playTrack();
            hidePlaylist();
        }
    });
}