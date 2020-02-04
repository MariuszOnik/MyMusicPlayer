const STATUSES = {
    'STOPPED': 0,
    'PAUSED': 1,
    'PLAYING': 2
  };
  var app = new Vue({
    el: '#media-player',
    data: {
      tracks: [
        {
          'url': 'music/mariuszOnik_1.mp3',
          'title': 'mariuszOnik_1',
          'artist': 'Mariusz Onik'
        },
        {
          'url': 'music/mariuszOnik_2.mp3',
          'title': 'mariuszOnik_2',
          'artist': 'Mariusz Onik'
        },
        {
          'url': 'music/mariuszOnik_Marcin.WAV',
          'title': 'mariuszOnik_Marcin',
          'artist': 'Mariusz Onik i Marcin'
        }
        
      ],
      activeTrack: 0,
      audioElement: null,
      status: STATUSES.STOPPED,
      volume: 5
    },
    methods: {
      toggleStatus: function () {
        if ( !this.isTrackLoaded ) {
          this.loadTrack(this.activeTrack || 0);
        }
        if ( !this.isPlaying ) {
          this.play();
          return;
        }
        this.pause();
      },
      loadTrack: function (index, autoplay=false) {
        if ( this.audioElement ) this.audioElement.pause();
        if ( index >= this.tracks.length ) return false; // we should probably do something when the track doesn't exist
        this.activeTrack = index;
        this.audioElement = new Audio(this.tracks[index].url);
        this.updateVolume();
        this.status = STATUSES.STOPPED;
        this.audioElement.addEventListener('ended', this.loadNextTrack);
        if (autoplay) this.play();
      },
      loadNextTrack: function (autoplay=true) {
        this.activeTrack++;
        if (this.activeTrack >= this.tracks.length) {
          this.activeTrack = 0;
        }
        this.loadTrack(this.activeTrack, autoplay);
      },
      play: function () {
        this.status = STATUSES.PLAYING;
        this.audioElement.play();
      },
      pause: function () {
        this.status = STATUSES.PAUSED;
        this.audioElement.pause();
      },
      updateVolume: function () {
        this.audioElement ? this.audioElement.volume = (this.volume / 10) : null;
      }
    },
    computed: {
      isPaused: function () {
        return STATUSES.PAUSED === this.status;
      },
      isPlaying: function () {
        return STATUSES.PLAYING === this.status;
      },
      isTrackLoaded: function () {
        return (this.activeTrack !== null) && this.audioElement;
      }
    },
    watch: {
      volume: function (val) {
        this.updateVolume();
      }
    }
  });