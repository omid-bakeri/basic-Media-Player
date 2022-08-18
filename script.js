const videoPlay = document.querySelector("video");
const btnPlay = document.querySelector(".btn-paly");
const backwardBtn = document.querySelector(".backward-btn");
const forwardBtn = document.querySelector(".forward-btn");
const volumeBtn = document.querySelector(".valume-btn");
const btnFullScreen = document.querySelector(".btn-full-screen");
const progress = document.querySelector(".progress");
const controls = document.querySelector(".controls");
const container = document.querySelector(".container");
const faPlay = document.querySelector(".fa-play");
const vShowVolume = document.querySelector(".v-show");
const vShowVolume_Volume = document.querySelector(".v-show-volume");
const faVolume = document.querySelector(".fa-volume");

container.addEventListener("mouseover", function() {
    controls.style.opacity = 1;
});
container.addEventListener("mouseleave", function() {
    controls.style.opacity = 0;
});

function play() {
    if (!videoPlay.paused) {
        videoPlay.pause();
        faPlay.src = "icons/play-button.png";
    } else {
        videoPlay.play();
        faPlay.src = "icons/pause.png";
    }
}

videoPlay.addEventListener("timeupdate", function() {
    let timeProgress = (videoPlay.currentTime / videoPlay.duration) * 100;
    progress.style.width = timeProgress + "%";
});

forwardBtn.addEventListener("click", function() {
    videoPlay.currentTime += 5;
    progress.style.width += videoPlay.currentTime + 5;
});

backwardBtn.addEventListener("click", function() {
    videoPlay.currentTime -= 5;
    progress.style.width -= videoPlay.currentTime + 5;
});

btnFullScreen.addEventListener("click", () => {
    if (videoPlay.requestFullscreen) {
        videoPlay.requestFullscreen();
    }
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
});

function volume_control(n) {
    if (0 <= videoPlay.volume <= 1) {
        videoPlay.volume = (videoPlay.volume + n * 0.1).toFixed(1);

        vShowVolume_Volume.textContent = videoPlay.volume * 100 + "%";
        if (videoPlay.volume === 0) {
            videoPlay.muted = true;
            faVolume.src = "icons/volume-mute.png";
        } else {
            videoPlay.muted = false;
            faVolume.src = "icons/volume.png";
        }
    }
}

document.onkeydown = (e) => {
    switch (e.key) {
        case "ArrowUp":
            volume_control(1);
            break;
        case "ArrowDown":
            volume_control(-1);
            break;
        case " ":
            videoPlay();
    }
};

faVolume.addEventListener("click", () => {
    if (videoPlay.muted == false) {
        faVolume.src = "icons/volume-mute.png";
        videoPlay.volume = 0;
        vShowVolume_Volume.textContent = 0;
    } else {
        faVolume.src = "icons/volume.png";
        videoPlay.volume = 100;
        vShowVolume_Volume.textContent = 100;
    }
});