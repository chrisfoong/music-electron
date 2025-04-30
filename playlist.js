document.addEventListener("DOMContentLoaded", function () {
    let songs = [
      { title: "newjeans - eta", file: "./assets/music/newjeans-eta.mp3" },
      { title: "newjeans - omg", file: "./assets/music/newjeans-omg.mp3" },
    ];
    
    let currentSongIndex = 0;
    let currentSongTitle = document.getElementById("song-title");
    let currentSongAudio = document.getElementById("audio");
    currentSongAudio.src = songs[currentSongIndex].file;
    let playPausebtn = document.getElementById("play-pause");
  
    playPausebtn.addEventListener("click", () => {
      if (currentSongAudio.paused) {
        currentSongAudio.play();
        playPausebtn.textContent = "⏸️";
      } else {
        currentSongAudio.pause();
        playPausebtn.textContent = "▶️";
      }
    });
});