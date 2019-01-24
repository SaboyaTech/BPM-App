var artistName;
var songTitle;
var youtubeSearch;
var youtubeVideoId;

$("#Carousel").show();

$(".main").hide();

console.log("its working, now make the button work")

// Captures Input When Search Now is clicked or Enter is pressed
function captureInput(event) {

  $("#Carousel").hide();

  $(".main").show();
  
  event.preventDefault();

  artistName = $(".artist").val();
  songTitle = $(".song").val();
  youtubeSearch = artistName + " " + songTitle;
  console.log({
    artistName: artistName,
    songTitle: songTitle,
    youtubeSearch: youtubeSearch
  });

  YouTube.getRequest(youtubeSearch);
  console.log(youtubeVideoId);

  // it obtains the values and formats the query part for the search
  var inputSearchQuery = lyricSearch.getInput(artistName, songTitle);
  console.log(inputSearchQuery);
  lyricSearch.queryCall(inputSearchQuery);
}

// YouTube -----------------------------------------------------
// YouTube Object to Obtain Video Id
var YouTube = {
  key: "AIzaSyD-D_v3VA2ZyoLiCLSSsCO7q81FaSnRLHA",
  firstPart: "https://www.youtube.com/embed/",

  getRequest: function (youtubeSearch) {
    var url = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
        part: 'snippet',
        key: this.key,
        q: youtubeSearch,
        maxResults: '1',
    };

    $.ajax({
        url: url,
        dataType: 'json',
        data: params,
        // success: showResults
    }).then(function (response) {
        youtubeVideoId = response.items[0].id.videoId;
        console.log(youtubeVideoId);
        $("#player").attr("src", YouTube.firstPart + youtubeVideoId); 
    });
  }
}

// Lyrics---------------------------------------------------------
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

//BIO ---------------------------------
// click ajax call


// enter


// click ajax call
// $("#search").on("click", function() {
//   var searchTerm = $(".artist").val();
//   var url = "https://en.wikipedia.org/w/action=templatedata&search="+ searchTerm + "(singer)" +"&imit=0&format=json&callback=?"; 
//   $.ajax({
//     url: url,
//     type: 'GET',
//     contentType: "application/json; charset=utf-8",
//     async: false,
//     dataType: "json",

//     // plop data
//     success: function(data) {
//       console.log(data);
//       $("#output").html();

//       for(var i = 0; i < 0; i++){
//         $("#output").prepend("<div><div class='well'><a href="+data[3]+"><h2>" + data[1]+ "</h2>" + "<p>" + data[2] + "</p></a></div></div>");
//       }
//       // $("#output").prepend("<div><div class='well'><a href="+ data[3] +"><h2>" + data[1] + "</h2>" + "<p>" + data[2] + "</p></a></div></div>");


//     }
//   })

//   .done(function() {
//     console.log("success");
//   })
//   .fail(function() {
//     console.log("error");
//   })
//   .always(function() {
//     console.log("complete");
//   });
    
    
// });

$("#searchForm").on("click", captureInput);




