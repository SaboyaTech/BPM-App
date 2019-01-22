
var youTube = {
  key: "AIzaSyD-D_v3VA2ZyoLiCLSSsCO7q81FaSnRLHA",
  url: 'http://www.googleapis.com/youtube/v3/search',

  player: "",

  // 2. This code loads the IFrame Player API code asynchronously.
  iFrameLoad: function () {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },


  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.

  getRequest: function (searchTerm) {
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
      part: 'snippet',
      key: key,
      q: searchTerm,
      maxResults: '1',
    };

    $.ajax({
      url: url,
      dataType: 'json',
      data: params,
      success: showResults
    }).then(function (response) {
      console.log(response);
    });
  },

};


function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

// ----------------------------------------------------------------
var lyricSearch = {

  artist: "",
  song: "",

  getInput: function (artistName, songTitle) {
    this.artist = encodeURIComponent(artistName);
    console.log(this.artist);
    this.song = encodeURIComponent(songTitle);
    console.log(this.song);
    return this.artist + "/" + this.song;
  },

  queryCall: function (inputSearchQuery) {
    var firstPartQuery = "https://api.lyrics.ovh/v1/";
    var queryURL = firstPartQuery + inputSearchQuery;
    console.log(queryURL);
    $.ajax({
      url: queryURL
    }).then(function (response) {
      console.log(response);
      $(".main").show();
      $(".lyrics").empty();
      $(".lyrics").append($("<pre>").text(response.lyrics));
      $(".artist").attr('placeholder', $(".artist").val() + " (Artist Name)");
      $(".song").attr('placeholder', $(".song").val() + " (Artist Song)");
      $(".artist").val('');
      $(".song").val('');
    });
  }
};

function captureInput(event) {
  event.preventDefault();
  artistName = $(".artist").val();
  songTitle = $(".song").val();
  console.log({
    artistName: artistName,
    songTitle: songTitle
  });
  var inputSearchQuery = lyricSearch.getInput(artistName, songTitle);
  console.log(inputSearchQuery);
  lyricSearch.queryCall(inputSearchQuery);
}

$(".searchBtn").on("click", captureInput);

$("#searchForm").on("submit", captureInput);
