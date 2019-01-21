








// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    player.setPlaybackRate(2);
    event.target.playVideo();
}





























$(document).ready(function () {
    //-------------------- This is the variable Key ---------------\\
    var key = "AIzaSyD-D_v3VA2ZyoLiCLSSsCO7q81FaSnRLHA";
    var url = 'http://www.googleapis.com/youtube/v3/search';

        function showResults(results) {
            var html = "";
            var entries = results.items;
    
            $.each(entries, function (index, value) {
                var title = value.snippet.title;
                var thumbnail = value.snippet.thumbnails.default.url;
                html += '<p>' + title + '</p>';
                html += '<img src="' + thumbnail + '">';
            });
    
            $('#search-results').html(html);
    
        }
  
        $('#search-term').submit(function (event) {
            event.preventDefault();
            var searchTerm = $('.ytBox').val();
            getRequest(searchTerm);
        });
    
        function getRequest(searchTerm) {
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
           
        
        }
        
});
