window.addEventListener("load", function (e) {
  e.preventDefault();
  const song = document.querySelector("#song");
  const imageArt = document.querySelector(".image-art");
  const trackName = document.querySelector(".track-name");
  const single = document.querySelector(".track-artist");
  const current_Time = document.querySelector(".current-time");
  const totalTime = document.querySelector(".total-duration");
  const seekSlider = document.querySelector(".seek_slider");
  const volumeSlider = document.querySelector(".volume_slider");
  const playBtn = document.querySelector(".icon-play ");
  const prev = document.querySelector(".prev-track");
  const next = document.querySelector(".next-track");
  const repeat = document.querySelector(".repeat-track");
  const wave = document.querySelector("#wave");
  const listMusic = document.querySelector(".list-music");
  const listApp = document.querySelector(".list-music-app ");
  const btnCheckout = document.querySelector(".checkout");
  const playlist_song = document.querySelector(".playlist_song");

  let isPlaying = true;
  let songIndex = 0;
  let isrepeat = false;
  let currentIndex = 0;
  const songs = [
    {
      img: "https://lh3.googleusercontent.com/LBZbzy9NXoY_0vQQOkDQnVSzu27am8yxvcsxOk0CPhfnr7uraTv-9ONUje1b7zcK0bTqTbI1_pY2hVzXu4aGbSQ9",
      name: "Buông Đôi Tay Nhau Ra",
      artist: "Sơn Tùng MTP",
      music: "buong.mp3",
    },
    {
      img: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2016/10/20/e/7/1/3/1476945863040_600.jpg",
      name: "Đã biết sẽ có ngày hôm qua",
      artist: "Trịnh Thăng Bình",
      music: "dabietsecongayhomqua.mp3",
    },
    {
      img: "https://cafefcdn.com/203337114487263232/2021/5/8/photo-1-16204789556741997908876.png",
      name: "Hãy trao cho anh",
      artist: "Sơn Tùng MTP",
      music: "haytraochoanh.mp3",
    },
    {
      img: "https://yt3.ggpht.com/ytc/AKedOLTFdGsqBwrlCFNi2AX9DNcwq0xsfbbAu_L-z7a-zQ=s900-c-k-c0x00ffffff-no-rj",
      name: "Có Khi",
      artist: "Hoài Lâm",
      music: "cokhi.mp3",
    },
    {
      img: "https://event.mediacdn.vn/257767050295742464/image/hot14/2021/2/4/chau-dang-khoa-12-16123736695001712280846.png",
      name: "Giả vờ nhưng anh yêu em",
      artist: "Chi Dân",
      music: "giavoaye.mp3",
    },
    {
      img: "https://i1.sndcdn.com/artworks-yojC4Fyr0MoNyfNl-YkghHA-t500x500.jpg",
      name: "Cao ỐC 20",
      artist: "Đạt G",
      music: "caooc20.mp3",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIFmHjEdy0YXUy7jsECWYo4v-kS0aERBtVcw&usqp=CAU",
      name: "hẹn một mai",
      artist: "bùi anh tuấn",
      music: "henmotmai.mp3",
    },
    {
      img: "https://voicefun.vn/media/ugc_storage/avatar/2017/07/19/09/596ebfbe6b14f.jpg",
      name: "Anh đã quen với cô đơn",
      artist: "soobin hoàng sơn",
      music: "soobin.mp3",
    },
    {
      img: "https://doanhnhanonline.com.vn/wp-content/uploads/2021/11/dat-g-la-ai.jpeg",
      name: "buồn không em",
      artist: "Đạt g",
      music: "buonkhongem.mp3",
    },
    {
      img: "https://ss-images.saostar.vn/w800/pc/1608343199368/chag9639.jpg",
      name: "Chẳng ai yêu mãi một người",
      artist: "nb3 hoài bảo",
      music: "nd3.mp3",
    },
    {
      img: "https://vtv1.mediacdn.vn/thumb_w/650/2017/14452430623531445243062315-1500353205850-crop-1500353233069.jpg",
      name: "Em đã quên anh",
      artist: "trịnh thăng bình",
      music: "emdaquenanh.mp3",
    },
  ];

  //click vào play để mở chương trình nhạc
  playBtn.addEventListener("click", playMusicEvent);
  function playMusicEvent() {
    if (isPlaying) {
      song.play();
      isPlaying = false;
      imageArt.classList.add("rotate");
      playBtn.classList.add("fa-pause");
      wave.classList.add("loader");
      //nếu là true thì cho nhạc play
    } else {
      // nếu nhạc false thì cho nhạc pause
      song.pause();
      isPlaying = true;
      imageArt.classList.remove("rotate");
      playBtn.classList.remove("fa-pause");
      wave.classList.remove("loader");
    }
  }

  //click vào next và prev
  next.addEventListener("click", function () {
    handleChangeMusic(1);
  });
  prev.addEventListener("click", function () {
    handleChangeMusic(-1);
  });

  //repeat bài hát

  repeat.addEventListener("click", function () {
    if (isrepeat) {
      isrepeat = false;
    } else {
      isrepeat = true;
    }
    repeat.classList.toggle("focus");
  });

  song.addEventListener("ended", changeSong); //sự kiện nhạc kết thúc sẽ tự động chày tiếp
  function changeSong() {
    if (isrepeat) {
      isPlaying = false;
      song.play();
    } else {
      handleChangeMusic(1);
    }
  }

  //tạo một function xử lý 2 nút next và prev
  function handleChangeMusic(dir) {
    if (dir === 1) {
      songIndex++;
      if (songIndex > songs.length - 1) {
        songIndex = 0;
      }
      isPlaying = true;
      replace(songIndex);
      playMusicEvent();
      random_bg_color();
    } else if (dir === -1) {
      songIndex--;
      if (songIndex < 0) {
        songIndex = songs.length - 1;
      }

      isPlaying = true;
      replace(songIndex);
      playMusicEvent();
      random_bg_color();
    }
  }

  //xử lý thời gian bài hát

  function displayTimer() {
    const { duration, currentTime } = song;
    //xử lý  thanh progress
    seekSlider.max = duration;
    seekSlider.value = currentTime;
    // const minutes = Math.floor(Math.ceil(duration) / 60);
    // const seconds = Math.floor(duration - minutes * 60);
    current_Time.innerHTML = formatTimer(duration);

    //nếu là NaN thì in ra 0:00
    // if (!duration) {
    //   current_Time.innerHTML = "0:00";
    // } else {
    //   currentTime.innerHTML = formatTimer(duration);
    // }
    // console.log(duration);

    totalTime.innerHTML = formatTimer(currentTime); //in ra thời gian còn lại cửa bài hát
  }

  //xử lý thời gian còn lại của bài hát

  function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);

    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`; //điều kiện thêm số 0 vào trc thời gian còn lại
  }
  displayTimer();
  const timer = setInterval(displayTimer, 500);

  //xử lý sự kiện tua nhạc
  seekSlider.addEventListener("change", handleChangeSlider);
  function handleChangeSlider() {
    song.currentTime = seekSlider.value;
  }

  // tạo 1 hàm chứa thay đổi ảnh và tên bài hát
  function replace(songIndex) {
    song.setAttribute("src", `./music/${songs[songIndex].music}`); // lấy nhạc trong mảng object
    imageArt.setAttribute("src", songs[songIndex].img); // lấy ra ảnh trong mảng
    trackName.innerHTML = songs[songIndex].name; //lấy ra ten bài hát
    single.innerHTML = songs[songIndex].artist; // lấy ra tên ca sĩ
  }
  replace(songIndex);

  // xử lý volume bài hát
  volumeSlider.addEventListener("change", setVolume);
  function setVolume() {
    song.volume = volumeSlider.value / 100;
  }
  setVolume();

  // ========================================================
  //xử lý danh sách bài hát
  listMusic.addEventListener("click", function (e) {
    listApp.classList.add("is-show");
  });
  btnCheckout.addEventListener("click", function (e) {
    listApp.classList.remove("is-show");
  });

  //tạo danh sách nhạc trong list music
  function list_song() {
    const htmls = songs.map((item, index) => {
      return `   <div class="playlist_song_item ${
        index === this.currentIndex ? "active" : ""
      }" data-index = "${index}">
    <div class="item_music">
        <img src="${item.img}"
            alt="" class="song_img">
        <div class="body">
            <h3 class="title">${item.name}</h3>
            <p class="author">${item.artist}</p>
        </div>
    </div>
    <div class="option">
        <i class="fa-solid fa-heart heart"></i>
        <i class="fas fa-ellipsis-h"></i>
    </div>
</div>`;
    });
    playlist_song.innerHTML = htmls.join("");
  }
  list_song();

  //click vào bài hát trong list nhạc
  const songItem = document.querySelectorAll(".playlist_song_item ");
  [...songItem].forEach((item) => {
    item.addEventListener("click", function (e) {
      const index = e.currentTarget.dataset.index;
      song.setAttribute("src", `/music/${songs[index].music}`);
      if ((isPlaying = true)) {
        replace(index);
        playMusicEvent();
      }
      //click vào thì active cho background
      [...songItem].forEach((items) => {
        items.classList.remove("active");
        e.currentTarget.classList.add("active");
      });
    });
  });

  //random color background
  function random_bg_color() {
    let hex = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
    ];
    let a;

    function populate(a) {
      for (let i = 0; i < 6; i++) {
        let x = Math.round(Math.random() * 14);
        let y = hex[x];
        a += y;
      }
      return a;
    }
    let Color1 = populate("#");
    let Color2 = populate("#");
    var angle = "to right";

    let gradient =
      "linear-gradient(" + angle + "," + Color1 + ", " + Color2 + ")";
    document.body.style.background = gradient;
  }
});
