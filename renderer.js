document.addEventListener("DOMContentLoaded", () => {
    const songs = [
      { title: "Newjeans - ETA", file: "../assets/music/newjeans-eta.mp3" },
      { title: "Newjeans - OMG", file: "../assets/music/newjeans-omg.mp3" }
    ];
  
    let currentSongIndex = 0;
    let currentSongTitle = document.getElementById("song-title");
    let currentSongAudio = document.getElementById("audio");
    let currentTime = document.getElementById("current-time");
    let currentDuration = document.getElementById("duration");
    let playPausebtn = document.getElementById("play-pause");
    let nextBtn = document.getElementById("next");
    let prevBtn = document.getElementById("prev");
    let seekBar = document.getElementById("seek-bar");

    // แปลงวินาทีเป็น mm:ss
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // ตั้งค่าเพลง
    function changeAT() {
        currentSongAudio.src = songs[currentSongIndex].file;
        currentSongTitle.textContent = songs[currentSongIndex].title;
        playPausebtn.textContent = "▶️";
        currentSongAudio.load(); // reset เพลงใหม่

        currentSongAudio.addEventListener("loadedmetadata", () => {
            currentDuration.textContent = formatTime(currentSongAudio.duration);
        });
    }

    changeAT();
    
    // ปุ่มเล่น/หยุด
    playPausebtn.addEventListener("click", () => {
        if (currentSongAudio.paused) {
            currentSongAudio.play();
            playPausebtn.textContent = "⏸️";
        } else {
            currentSongAudio.pause();
            playPausebtn.textContent = "▶️";
        }
    });

    // ปุ่ม next/prev
    nextBtn.addEventListener("click", () => {
        if (currentSongIndex < songs.length - 1) {
            currentSongIndex++;
            changeAT();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentSongIndex > 0) {
            currentSongIndex--;
            changeAT();
        }
    });

    // เมื่อเล่นเพลง -> อัปเดตเวลาและ seek bar
    currentSongAudio.addEventListener("timeupdate", () => {
        const curr = currentSongAudio.currentTime;
        const dur = currentSongAudio.duration;

        if (!isNaN(dur)) {
            seekBar.value = (curr / dur) * 100;
            currentTime.textContent = formatTime(curr);
            currentDuration.textContent = formatTime(dur);
        }
    });

    // ควบคุม seek bar ด้วยมือ
    seekBar.addEventListener("input", () => {
        const dur = currentSongAudio.duration;
        if (!isNaN(dur)) {
            currentSongAudio.currentTime = (seekBar.value / 100) * dur;
        }
    });
});
