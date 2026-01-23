const musicContainer = document.querySelector("#musicContainer");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

const musicContainer1 = document.querySelector("#musicContainer1");
const leftBtn1 = document.getElementById("leftBtn1");
const rightBtn1 = document.getElementById("rightBtn1");

const current_time = document.querySelector("#current-time");
const total_time = document.querySelector("#total-time");
const play_pause = document.querySelector(".play-btn");
const song_time = document.querySelector("#progress-bar");
const song_name = document.querySelector("#song-name");
const song_volume = document.querySelector("#volume-slider");

const previous = document.querySelector("#previous-song");
const next_song = document.querySelector("#next-song");

let audio_playing = false;
let mp3 = [];
let currentAudio = null;
let currentAudioIndex = -1;
let allAudios = [];

const song_names = {
  0: "Do I Wanna Know",
  1: "Breaking through the ceiling",
  2: "Everyday Normal Guy 2",
  3: "Sailor",
  4: "I Wanna Be Yours",
  5: "It was a Good Day",
  6: "Summertime Sadness",
  7: "Mohani Lagla hai",
  8: "Mortals- Warrior",
  9: "TESTOSTERONE FUNK",
  10: "Blue"
};

async function fetchData(container) {
  try {
    const songsResponse = await fetch("http://127.0.0.1:5500/My%20projects/Spotify/songs/");
    const musicsResponse = await fetch("http://127.0.0.1:5500/My%20projects/Spotify/musics/");

    const songsText = await songsResponse.text();
    const musicText = await musicsResponse.text();

    const div = document.createElement("div");
    div.innerHTML = songsText;
    const lists = div.getElementsByClassName("name");

    const div1 = document.createElement("div");
    div1.innerHTML = musicText;
    const musics = div1.getElementsByClassName("icon icon icon-mp3 icon-default");

    for (let i = 0; i < musics.length; i++) {
      mp3.push(musics[i].href);
    }

    for (let i = 1; i < lists.length; i++) {
      const songName = lists[i].innerText;
      const infoResponse = await fetch(`http://127.0.0.1:5500/My%20projects/Spotify/songs/${songName}/info.json`);
      const info = await infoResponse.json();

      const musicDiv = document.createElement("div");
      musicDiv.className = "music";
      container.append(musicDiv);

      const cover = document.createElement("img");
      cover.className = "music-cover";
      cover.src = `http://127.0.0.1:5500/My%20projects/Spotify/songs/${songName}/cover.jpg`;
      musicDiv.append(cover);

      const title = document.createElement("p");
      title.id = "song-name";
      title.innerHTML = song_names[i - 1];
      musicDiv.append(title);

      const desc = document.createElement("p");
      desc.id = "artist-name";
      desc.className = "bg-grey";
      desc.innerHTML = info.description;
      musicDiv.append(desc);

      const pressplay = document.createElement("button");
      pressplay.className = "press-play";
      pressplay.innerHTML = "<i class='fas fa-play'></i>";
      musicDiv.append(pressplay);

      const audio = document.createElement("audio");
      audio.src = mp3[i - 1];
      musicDiv.append(audio);

      allAudios.push(audio);


      pressplay.addEventListener("click", () => {
        currentAudioIndex = allAudios.indexOf(audio);
        playAudio(audio);
      });
    }
  } catch (err) {
    console.log("Error fetching songs:", err);
  }
}

function playAudio(audio) {
  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  if (audio.paused) {
    audio.play();
    currentAudio = audio;
    audio_playing = true;
    play_pause.innerHTML = "<i class='fas fa-pause'></i>";
  } else {
    audio.pause();
    audio_playing = false;
    play_pause.innerHTML = "<i class='fas fa-play'></i>";
  }

  song_name.innerHTML = audio.parentElement.querySelector("#song-name").innerHTML;

  setupAudioListeners(audio);
}

function setupAudioListeners(audio) {
  audio.addEventListener("loadedmetadata", () => {
    total_time.innerHTML = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    current_time.innerHTML = formatTime(audio.currentTime);
    total_time.innerHTML = formatTime(audio.duration);

    const percentage = (audio.currentTime / audio.duration) * 100;
    song_time.value = percentage;

  });
}
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

song_time.addEventListener("input", () => {
  if (!currentAudio || !currentAudio.duration) return;
  currentAudio.currentTime = (song_time.value / 100) * currentAudio.duration;
});

play_pause.addEventListener("click", () => {
  if (!currentAudio) return;
  if (currentAudio.paused) {
    currentAudio.play();
    audio_playing = true;
    play_pause.innerHTML = "<i class='fas fa-pause'></i>";
  } else {
    currentAudio.pause();
    audio_playing = false;
    play_pause.innerHTML = "<i class='fas fa-play'></i>";
  }
});

song_volume.addEventListener("input", () => {
  if (currentAudio) currentAudio.volume = song_volume.value / 100;
});

next_song.addEventListener("click", () => {
  if (currentAudioIndex === -1) return;
  let nextIndex = currentAudioIndex + 2;
  if (nextIndex >= allAudios.length) nextIndex = 0;
  currentAudioIndex = nextIndex;
  playAudio(allAudios[nextIndex]);
});

previous.addEventListener("click", () => {
  if (currentAudioIndex === -1) return;
  let prevIndex = currentAudioIndex - 2;
  if (prevIndex < 0) prevIndex = allAudios.length - 1;
  currentAudioIndex = prevIndex;
  playAudio(allAudios[prevIndex]);
});


fetchData(musicContainer);
fetchData(musicContainer1);

const scrollAmount = 220;
leftBtn.addEventListener("click", () => musicContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" }));
rightBtn.addEventListener("click", () => musicContainer.scrollBy({ left: scrollAmount, behavior: "smooth" }));
leftBtn1.addEventListener("click", () => musicContainer1.scrollBy({ left: -scrollAmount, behavior: "smooth" }));
rightBtn1.addEventListener("click", () => musicContainer1.scrollBy({ left: scrollAmount, behavior: "smooth" }));
