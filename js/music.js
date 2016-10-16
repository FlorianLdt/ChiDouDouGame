// --------------
// Music handler for streamed music
// --------------
var mh = new MusicHandler();


function MusicHandler() {
  var musics = [];
  var current;
  var initialized = false;

  var add = function(name, url) {
    var audio = document.createElement("audio");
    audio.src = url;
    audio.loop = true;
    musics[name] = audio;
    document.body.appendChild(audio);
  };
  
  var play = function(name) {
    if(current) current.pause();
    musics[name].play();
    current = musics[name];
  };

  var stop = function(name) {
    musics[name].pause();
    musics[name].currentTime = 0;
  };
  
  return {
    initialized: initialized,
    add: add,
    play:play,
    stop:stop
  };
  
}