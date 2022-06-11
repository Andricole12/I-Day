$(function () {
  var playerTrack = $("#player-track"),
    bgArtwork = $("#bg-artwork"),
    bgArtworkUrl,
    albumName = $("#album-name"),
    trackName = $("#track-name"),
    albumArt = $("#album-art"),
    sArea = $("#s-area"),
    seekBar = $("#seek-bar"),
    trackTime = $("#track-time"),
    insTime = $("#ins-time"),
    sHover = $("#s-hover"),
    playPauseButton = $("#play-pause-button"),
    i = playPauseButton.find("i"),
    tProgress = $("#current-time"),
    tTime = $("#track-length"),
    seekT,
    seekLoc,
    seekBarPos,
    cM,
    ctMinutes,
    ctSeconds,
    curMinutes,
    curSeconds,
    durMinutes,
    durSeconds,
    playProgress,
    bTime,
    nTime = 0,
    buffInterval = null,
    tFlag = false,
    albums = [
      "Shadow",
      "Kidult",
      "Opening Sequence",
      "Fever",
      "Ginintuang Tanawin"
    ],
    trackNames = [
      "Shadow - Seventeen",
      "Kidult - Seventeen",
      "Opening Sequence - Tomorrow X Together",
      "Fever - Enhypen",
      "Ginintuang Tanawin - Marc. A ft. Gwy Saludes"
    ],
    albumArtworks = ["_1", "_2", "_3", "_4", "_5"],
    trackUrl = [
      "https://dl244.edeebbcdc.xyz/?file=M3R4SUNiN3JsOHJ6WVo3MXN2Mlg5WVM5RkYrNHVyaHAwK1l5eGhRc0Z1VkJ0dDVwMGUyc0p2WmZMN01Ia00vd044ZGI0Q3JOYzlYT1lpbUVwc3RqRUZXRnNvUWJzQkxLd1pRRVNjRnpReFcybHZidzBEUnVtUTduZTh6RUdMMExQQ0V1OXhreWluYkRucmZIcjBqOHNTcz0%3D",
      "https://dl72.bdbfbbddebec.xyz/?file=M3R4SUNiN3JsOHJ6WVo3MXN2Mlg5WVM5RkYrNHVyaHAwNUFmNUZWNlYrNXU4c2dLOWFHQmRveHRkdXhLNktublNJc1JyV3FkVlBQT2FTdk1sTXhvVDJQU3NkQTB0VHJ3NDQ4MFVaUTBCRERobFBPM2d6Tnp6RlhUYzhpZVVPcHdPaklwaFZreDNpZUh5Yi9YdGhpei9qYVN0Qm1KUkJVeXRuWmNPdktlL0k4YmsyelRmLzcyMW9RTW9DUENzOHdjanFuTTdWR2hsL1F0cm9GeFhCVWs%3D",
      "https://dl178.fecbedaeeffd.xyz/?file=M3R4SUNiN3JsOHJ6WVo3MXN2Mlg5WVM5RkYrNHVyaHAwK0VDODF0bUpJOEovdFZxOXNmbEJ1c0tENFpLN05Mbk5Qd1IxRytkS1BQT0ZTek03N2xqWUNQRTB2UjRtMitLcXRwbGZPbzBEeks5dWJMbXN4VXowVit3WC91SU1Ka1RUeVUrKzJNbTlnVFdsTldSNEVHeitGS2RnbU9xUWdOQmdSNDZDTkQrMHJvRCtYRFpadlQzbUxNS29TbU5xYmxHM3ZXWm5BRDQ4YjB6bmRKeUVFbGtJTlpiMEpidzRPRE5zVTlFeGNzNncwS3h2ZmVrQTl0bk9xaU9LbklpR0NGTXU4blpUQmNUbGk5R29FdWY5ZUVvL2pOUGRMaGw0WEN4N2Z2a1kyTEpLSmVpRnNEZGVMdnI0TmJ2di8xajdoQT0%3D",
      "https://dl240.dlmate43.xyz/?file=M3R4SUNiN3JsOHJ6WVo3MXN2Mlg5WVM5RkYrNHVyaHAwL0FVN3lrVEpJVUg0NmdNa3IzM1pwQWJhNElyaU5QM1ZJY01zQnY3TkltdmRTM2Q4NzBDQnlyVnNvNWw4aG5xeGFzU0V1WjNVQi83a3VldjNSeEF4d3JsTFo3TEhMUlRVbWQ2dDBnK2xuUzExZjdCclFENnRqai9nVUNUUDJGWWxEbE9iOVBKbzVKSndXeUZiUGpwbU4xT3FDaVgrNHBNMU0rYnNSZnowWTB4dnRwOFhVMTFmNjlRejZYTmlQU2FnVk5JMTRBMDBRT3B1YkhnQTRZbEZiZWJiVDU5TzM5WXY3cTdCVXBIblgxSHZuK29xNnNudnpFPQ%3D%3D",
      "https://dl217.bbbfecebafbeedc.xyz/?file=M3R4SUNiN3JsOHJ6WVo3MXN2Mlg5WVM5RkYrNHVyaHAwL0l6eVJrdEZiNU5xSXBrNCtXdUl0NUdJT3hFd3BpckZ0ZGE5REtUY3QrR0lBQ2F2NHd2VFgzSzhka3Y4Z3JCK3BnbFM5cDRRZyt6cU9PeG56Umx3bEsrTmZYTUI3c2RURHg5cGtGM21BR0UxYnJudUJudHQzaSs2VUNUUDJJTXV6Y09BdVhSNVpjVmtEdnRkdmp4eDRVSHFHUE54SmRaaWJYUGtnU3prWlJ0Z3ZwalcwSldlOGwwOU5UNHo2T0tvRjhKaVlzWnprU3ByTC8zVU10aFJmVEhLbUFwZURFZnRPdnREUT09"
    ],
    playPreviousTrackButton = $("#play-previous"),
    playNextTrackButton = $("#play-next"),
    currIndex = -1;

  function playPause() {
    setTimeout(function () {
      if (audio.paused) {
        playerTrack.addClass("active");
        albumArt.addClass("active");
        checkBuffering();
        i.attr("class", "fas fa-pause");
        audio.play();
      } else {
        playerTrack.removeClass("active");
        albumArt.removeClass("active");
        clearInterval(buffInterval);
        albumArt.removeClass("buffering");
        i.attr("class", "fas fa-play");
        audio.pause();
      }
    }, 300);
  }

  function showHover(event) {
    seekBarPos = sArea.offset();
    seekT = event.clientX - seekBarPos.left;
    seekLoc = audio.duration * (seekT / sArea.outerWidth());

    sHover.width(seekT);

    cM = seekLoc / 60;

    ctMinutes = Math.floor(cM);
    ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
    if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

    if (isNaN(ctMinutes) || isNaN(ctSeconds)) insTime.text("--:--");
    else insTime.text(ctMinutes + ":" + ctSeconds);

    insTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);
  }

  function hideHover() {
    sHover.width(0);
    insTime.text("00:00").css({ left: "0px", "margin-left": "0px" }).fadeOut(0);
  }

  function playFromClickedPos() {
    audio.currentTime = seekLoc;
    seekBar.width(seekT);
    hideHover();
  }

  function updateCurrTime() {
    nTime = new Date();
    nTime = nTime.getTime();

    if (!tFlag) {
      tFlag = true;
      trackTime.addClass("active");
    }

    curMinutes = Math.floor(audio.currentTime / 60);
    curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

    durMinutes = Math.floor(audio.duration / 60);
    durSeconds = Math.floor(audio.duration - durMinutes * 60);

    playProgress = (audio.currentTime / audio.duration) * 100;

    if (curMinutes < 10) curMinutes = "0" + curMinutes;
    if (curSeconds < 10) curSeconds = "0" + curSeconds;

    if (durMinutes < 10) durMinutes = "0" + durMinutes;
    if (durSeconds < 10) durSeconds = "0" + durSeconds;

    if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
    else tProgress.text(curMinutes + ":" + curSeconds);

    if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
    else tTime.text(durMinutes + ":" + durSeconds);

    if (
      isNaN(curMinutes) ||
      isNaN(curSeconds) ||
      isNaN(durMinutes) ||
      isNaN(durSeconds)
    )
      trackTime.removeClass("active");
    else trackTime.addClass("active");

    seekBar.width(playProgress + "%");

    if (playProgress == 100) {
      i.attr("class", "fa fa-play");
      seekBar.width(0);
      tProgress.text("00:00");
      albumArt.removeClass("buffering").removeClass("active");
      clearInterval(buffInterval);
    }
  }

  function checkBuffering() {
    clearInterval(buffInterval);
    buffInterval = setInterval(function () {
      if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");
      else albumArt.removeClass("buffering");

      bTime = new Date();
      bTime = bTime.getTime();
    }, 100);
  }

  function selectTrack(flag) {
    if (flag == 0 || flag == 1) ++currIndex;
    else --currIndex;

    if (currIndex > -1 && currIndex < albumArtworks.length) {
      if (flag == 0) i.attr("class", "fa fa-play");
      else {
        albumArt.removeClass("buffering");
        i.attr("class", "fa fa-pause");
      }

      seekBar.width(0);
      trackTime.removeClass("active");
      tProgress.text("00:00");
      tTime.text("00:00");

      currAlbum = albums[currIndex];
      currTrackName = trackNames[currIndex];
      currArtwork = albumArtworks[currIndex];

      audio.src = trackUrl[currIndex];

      nTime = 0;
      bTime = new Date();
      bTime = bTime.getTime();

      if (flag != 0) {
        audio.play();
        playerTrack.addClass("active");
        albumArt.addClass("active");

        clearInterval(buffInterval);
        checkBuffering();
      }

      albumName.text(currAlbum);
      trackName.text(currTrackName);
      albumArt.find("img.active").removeClass("active");
      $("#" + currArtwork).addClass("active");

      bgArtworkUrl = $("#" + currArtwork).attr("src");

      bgArtwork.css({ "background-image": "url(" + bgArtworkUrl + ")" });
    } else {
      if (flag == 0 || flag == 1) --currIndex;
      else ++currIndex;
    }
  }

  function initPlayer() {
    audio = new Audio();

    selectTrack(0);

    audio.loop = false;

    playPauseButton.on("click", playPause);

    sArea.mousemove(function (event) {
      showHover(event);
    });

    sArea.mouseout(hideHover);

    sArea.on("click", playFromClickedPos);

    $(audio).on("timeupdate", updateCurrTime);

    playPreviousTrackButton.on("click", function () {
      selectTrack(-1);
    });
    playNextTrackButton.on("click", function () {
      selectTrack(1);
    });
  }

  initPlayer();
});