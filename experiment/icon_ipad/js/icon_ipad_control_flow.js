// ---------------- CONTROL FLOW ------------------
// Global variable assignment is in the icon_ipad_param_setter.js
// Helper functions are stored in in icon_ipad_utils.js


/*This is where we define the experiment variable,
which tracks all the information we want to know about
the experiment.
*/

//Show instruction slide to start experiment
showSlide("instructions");

// Get browser information
var browser = BrowserDetect.browser;

var experiment = {
  experiment: 'icon_ipad',
  subId: '',
  browser: browser,
  data: [],

/*The function that gets called when the sequence is finished. */
  end: function() {
    // grab variables and store in experiment object
    experiment.subId=subjectID;
    experiment.comments = $('#comments')[0].value;
    //Show the finish slide
    showSlide("finished");
    // submit to turk
    setTimeout(function() { turk.submit(experiment);}, 1500);
    },

/*shows a blank screen for 1500 ms*/
  blank: function() {
    showSlide("blankSlide");
  },

  conditionClick: function() {
    // check if subject id is numeric
    if($.isNumeric($("#subjectID").val())){
        subjectID = $("#subjectID").val()
        showSlide("condition")
        $(".conditionButton").click(function() {
          testCondition = this.id;
        });
    } else {
      alert("Enter numeric for Subject ID");
      showSlide("instructions");
    }
  },

  conditionTouch: function() {
    subjectID = $("#subjectID").val()
    showSlide("condition")
    $(".conditionButton").one("touchstart", function(event) {
          testCondition = $(this).attr('id')
    })
  },


  training: function() {
    //variable creation
    var xcounter = 0;
    var dotCount = 5;
    var dotx = [];
    var doty = [];

    //start and pause audio player
    audioSprite.play();
    audioSprite.pause();

    // put dots on the screen
    for (i = 0; i < dotCount; i++) {
      createDot(dotx, doty, i);
    }

    showSlide("training");

    $('.dot').bind('click', function(event) {
        var dotID = $(event.currentTarget).attr('id');
        document.getElementById(dotID).src = "images/dots/x.jpg";
        xcounter++
        if (xcounter === dotCount) {
              setTimeout(function () {
                  training.removeChild(dot_1)
                  training.removeChild(dot_2)
                  training.removeChild(dot_3)
                  training.removeChild(dot_4)
                  training.removeChild(dot_5)
                  $("#reward_player")[0].play();
                }, 1000);
          setTimeout(function () {
            $("#training").hide();
          //  document.body.style.background = "black";
            setTimeout(function() {
            showSlide("instructions2");
          }, 1500);
        }, 1500);
      }
    });
  },

/*The work horse of the sequence: what to do on every trial.*/
  next: function() {
    // TODO: check if trial array is empty to see if we are done

    // get current trial from trials array
    curr_trial = trials.shift()

    // get video elements
    var videoElements = document.getElementsByTagName("video");
    var center_vid_element = videoElements[0]
    var left_vid_element = videoElements[1]
    var right_vid_element = videoElements[2]

    // load and play first center video
    var curr_center_video = curr_trial["center_videos"].shift()
    load_video(center_vid_element, curr_center_video)

    // load right/left videos
    load_video(left_vid_element, curr_trial["left_video"]) // left_video
    load_video(right_vid_element, curr_trial["right_video"]) // right_video

    // play videos (TODO: make this general to handle different sequences of videos)
    play_video(center_vid_element)

    // play right video after center ends
    center_vid_element.onended = function(e) {
      var next_center_vid = curr_trial["center_videos"].shift()
      load_video(center_vid_element, next_center_vid)

      if (next_center_vid == "icon_narrator_left") {
        center_vid_element.play()
        left_vid_element.play()
        // say what to do after the left video ends
        left_vid_element.onended = function(e) {
          center_vid_element.play()
        }

      }


      if (next_center_vid == "icon_narrator_right") {
        right_vid_element.play()
        // say what to do after the right video ends
        right_vid_element.onended = function(e) {
          load_video(center_vid_element, curr_trial["center_videos"].shift())
          center_vid_element.play()
        }
      }

    }


    // what to do after both the left/right videos play
    videoElements[1].onended = function(e) {
      load_video(videoElements[0], "icon_narrator_testxylophone")
      videoElements[0].play()
    }

    //blank out all borders so no item is pre-selected
    //$(".xsit_pic").each(function(){this.children[0].style.border = '5px solid white';});

    //Display the experiment slide
      showSlide("stage");

    }
  };
