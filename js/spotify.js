var ruta = 'https://api.spotify.com/v1/search?';

function execQuery(uri, callback_function){
  $.ajax({
    url: ruta + uri,
    success: function(response){
      callback_function(response);
    },
    fail: function(error){
      console.error("Error loading the songs: " + error);
    }
  });
}

function handleResponse(response)
{
  var song = response.tracks.items[0];

  $('.title').text(song.name);
  $('.author').text(song.artists[0].name);
  $('.cover').find('img').prop('src',song.album.images[0].url);
  $('audio').prop('src',song.preview_url);
}

function playSong()
{
  $('.btn-play').toggle('disabled');
  $('.btn-play').toggle('playing');
}

$(document).on("ready", function(){
  
  $('.js-form').on('submit', function(event){
    event.preventDefault();
    var key_words = $('#js-artist').val().split(' ').join('%20');
    
    execQuery("q=" + key_words + "&type=track", handleResponse);
  });

  $('.btn-play').on('click', function(event){
    event.preventDefault();
    playSong();
  });

});