 // var APIKey = "&apikey=8f0d802d5865da8ad5507e82a2bf4aa4";
    // var artist = "Drake";
    // var track = "In My Feelings"

    // var artist;
    // var song;
    // var songTitle = [];

    // $("#search").on("click", function (event) {
    //   event.preventDefault();
    //   artist = $("input[name=artist]").val();
    //   song = $("input[name=song]").val();
    //   title = song.split(" ");
    //   console.log(title);
    //   for (var i; i < title.length; i++) {
    //     songTitle.push(title[i] + "%20");
    //   }

    //   console.log({
    //     artist: artist,
    //     songTitle: songTitle
    //   });


    // });

    // var partOne = "https://private-anon-a6df0518aa-lyricsovh.apiary-proxy.com/v1/";
    
    // var songTitle = "/lyrics";

    $.ajax({
      // url: partOne + youTubeId + partEnd,
      url: "https://private-anon-a6df0518aa-lyricsovh.apiary-proxy.com/v1/fetty%20wap/again",
      method: "GET",
      timeOut: 0,
      headers: {
        with: "lyrics"
      },
    }).then(function (response) {
      console.log(response.lyrics);
      $(".lyric").text(response.lyrics);
    });