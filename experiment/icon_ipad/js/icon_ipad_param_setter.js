// ---------------- 2. STIMULUS SETUP ------------------
// Global variable assignment for the experiment

var instruments = ["xylophone", "clarinet"] // TODO: add all of the instruments
var instrument_filler = "icon_stimuli_"
var narrator_vid_names = ["intro", "left", "right", "postinstrument"]
var narrator_filler = "icon_narrator_"
var num_videos = 3
var num_trials = 1

// make an array of the various center videos
var center_videos = []
var vid;
for (vid in narrator_vid_names) {
  center_videos.push(make_video_name(narrator_filler, narrator_vid_names[vid]))
}

// build the trials array of trial objects (dicts)
trials = []
for (i = 0; i < num_trials; i++) {
  // TODO: sample from the instruments vector
  trials.push(make_trial(instruments, center_videos))
}
