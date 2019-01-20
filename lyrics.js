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
