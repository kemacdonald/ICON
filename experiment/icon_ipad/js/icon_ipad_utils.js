//from http://www.quirksmode.org/js/detect.html
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

/*Shows slides. We're using jQuery here the $ is the jQuery selector function,
which takes as input either a DOM element or a CSS selector string. */
function showSlide(id) {

	$(".slide").hide();	//Hide all slides
	$("#"+id).show(); //Show just the slide we want to show
}

/*Get random integers. When called with no arguments, it returns either 0 or 1.
When called with one argument, a, it returns a number in [0,a-1].
When called with two arguments, a and b, returns a random value in [a,b]. */
function random(a,b) {
  if (typeof b == "undefined") {
    a = a || 2;
    return Math.floor(Math.random()*a);
  } else {
    return Math.floor(Math.random()*(b-a+1)) + a;
  }
}

function range(start, end)
{
    var foo = [];
    for (var i = start; i <= end; i++)
        foo.push(i);
    return foo;
}

//from
//http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function createDot(dotx, doty, i) {
	var dots = [1, 2, 3, 4, 5];

	var dot = document.createElement("img");
	dot.setAttribute("class", "dot");
	dot.id = "dot_" + dots[i];
	dot.src = "images/dots/dot_" + dots[i] + ".jpg";

    var x = Math.floor(Math.random()*950);
    var y = Math.floor(Math.random()*550);

    var invalid = "true";
    //make sure dots do not overlap
    while (true) {
    	invalid = "true";
	   	for (j = 0; j < dotx.length ; j++) {
    		if (Math.abs(dotx[j] - x) + Math.abs(doty[j] - y) < 200) {
    			var invalid = "false";
    			break;
    		}
		}
		if (invalid === "true") {
 			dotx.push(x);
  		  	doty.push(y);
  		  	break;
  	 	}
  	 	x = Math.floor(Math.random()*400);
   		y = Math.floor(Math.random()*400);
	}

    dot.setAttribute("style","position:absolute;left:"+x+"px;top:"+y+"px;");

    training.appendChild(dot);
}

/*Randomly return an element from an array. Useful for condition randomization.*/
Array.prototype.random = function() {
  return this[random(this.length)];
};

$.fn.preload = function() {
  this.each(function(){
        $('<img/>')[0].src = this;
    });
};

function trim(item) {
	var tmp = item;
	return tmp.slice(tmp.lastIndexOf("/")+1,tmp.lastIndexOf("."));
};


/* lets the participant select a picture and records which one was chosen */
function makeChoice(event) {
                var img = trim(event.target.src);                       // get the image the participant selected
                var endTime, i, tmpImg, trial_type, gaze_target;        // variable creation
                $(".xsit_pic").unbind("click");                         // unbind the click event handler
                endTime = (new Date()).getTime();                       // get the end time for computing RT
                event.target.style.border = '5px solid green';          // visually indicates the participant's choice
                $("#reward_player")[0].play();                          // play chime

                //check where we are in the experiment
                if(Math.floor(experiment.exampleItem) <= numExamples) {
                  trial_type = "example";
                } else if(Math.floor(experiment.exampleItem) > numExamples &
                    experiment.keepPic[experiment.item].length == 0) {
                  trial_type = "exposure";
                } else {
                  trial_type = "test";
                }

                // find the screen position of the clicked object
                for(i = 0; i < imgsPerSlide; i++) {
                  tmpImg = trim($(".xsit_pic")[i].children[0].src);
                  if(tmpImg == img){break;}
                }

                // store that image as new_image
                var new_i = i, new_img = img, correct;

                // get the kept images (previous and current)
                if(trial_type == "example") {
                        kept_prev = "NA";
                        kept_curr = "NA";
                        kept_idx = "NA";
                } else if (trial_type == "exposure") {
                        kept_prev = "NA";
                        experiment.keepPic[experiment.item] = new_img;
                        experiment.keepIdx[experiment.item] = new_i;
                } else {
                        kept_prev = experiment.keepPic[experiment.item];
                        kept_curr = "NA";
                }


                if(trial_type == "exposure") {
                    kept_curr = experiment.keepPic[experiment.item];
                }

                 // get gaze target
                if(face_vid == "down-left") {
                  gaze_target = trim($(".xsit_pic")[0].children[0].src);
                } else if (face_vid == "down-right") {
                  gaze_target = trim($(".xsit_pic")[1].children[0].src);
                } else {
                  gaze_target = "NA";
                }

                 // is response correct
                if(trial_type == "example" || trial_type == "exposure") {
                    correct = gaze_target == img;
                } else {
                  correct = kept_prev == img;
                }


                // keep picture from selection
                if(Math.floor(experiment.exampleItem) > numExamples &
                      experiment.trialTypes[experiment.item] != 1){
                    var all_pos = range(0,imgsPerSlide-1);
                    all_pos.splice(i,1);
                    all_pos = shuffle(all_pos);
                    new_i = all_pos[0];
                    new_img = trim($(".xsit_pic")[new_i].children[0].src);
                    experiment.keepPic[experiment.item] = new_img;
                    experiment.keepIdx[experiment.item] = new_i;
                  }


                //store everything we want about the trial
                data = {
                    itemNum: experiment.item,
                    trial_category: trial_type,
                    trialType: experiment.trialTypes[experiment.item],
                    samePos: experiment.samePos[experiment.item],
                    gaze_target: gaze_target,
                    chosen: img,
                    correct: correct,
                    chosen_idx: i,
                    kept_prev: kept_prev,
                    kept_curr: kept_curr,
                    kept_idx: experiment.keepIdx[experiment.item],
                    rt: endTime - startTime,
                    face_vid: face_vid,
                    face_idx: faceLook,
                };
                console.log(data);
                experiment.data.push(data);

                setTimeout(experiment.blank, 500);
};

// get the correct video files for a trial
// todo: make this general to handle the different kids of videos to load
function load_video(vid_element, vid_name) {
	vid_id = vid_element.id;
	//console.log(vid_id, vid_element)
	if (vid_element.canPlayType("video/mp4")) {
				 vid_element.src = "stimuli/videos/"+vid_name+".mov";
			} else if (vid_element.canPlayType("video/ogg")) {
					 vid_element.src = "stimuli/videos/"+vid_name+".ogv";
			}else {
					window.alert("Can't play anything");
			}
			vid_element.load();
};

// Play video after video has loaded completely
function play_video(vid_element) {
	      vid_element.oncanplaythrough = function() {
	            // Play video
	              setTimeout(function(){
	                vid_element.play();
	              }, 1300)
	        };

					//Start recording responses when video finishes (at end of longest eye gaze)
						setTimeout(function(){
							startTime = (new Date()).getTime();
							$(".xsit_pic").bind("click", makeChoice);
						}, 5) // should be 4000

};

function make_video_name(filler, stimulus) {
  return filler.concat(stimulus);
};

function shuffle(array) {
   for (var i = array.length - 1; i > 0; i--) {
       var j = Math.floor(Math.random() * (i + 1));
       var temp = array[i];
       array[i] = array[j];
       array[j] = temp;
   }
   return array;
};

// make a trial
// takes a pair of instruments
// returns a json object with all the video names needed for each trial
function make_trial(instruments, center_videos) {
  instruments_trial = shuffle(instruments)
  trial_dict = {
    center_videos: center_videos,
    left_video: make_video_name(instrument_filler, instruments_trial[0]),
    right_video: make_video_name(instrument_filler, instruments_trial[1]),
  };
  return trial_dict
}
