// ---------------- CONTROL FLOW ------------------
// Global variable assignment is in the icon_ipad_param_setter.js
// Helper functions are stored in in icon_ipad_utils.js


/*This is where we define the experiment variable,
which tracks all the information we want to know about
the experiment.
*/

//Show instruction slide to start experiment
showSlide("instructions");
// Get browser
var browser=BrowserDetect.browser;

var experiment = {
  experiment: 'icon_ipad',
  subId: '',
  browser: browser,
  data: [],

/*The function that gets called when the sequence is finished. */
  end: function() {
    // grab variables and store in experiment object
    experiment.social_cond=testCondition;
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
    if(experiment.exampleItem == numExamples){
      experiment.exampleItem = numExamples+1;
      setTimeout(showSlide("instructions3"),500);
    } else {
      setTimeout(experiment.next, 1500);
    }
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
    //var vid_name = "icon_narrator_intro";
  // figure out where we are in the experiment: exposure or test
  var trial_type = "exposure"
  var within_counter = 0;
  // get video elements
  var videoElements = document.getElementsByTagName("video");

  load_video(videoElements[0], "icon_narrator_intro") // center_video
  videoElements[0].play()

  if(trial_type == "exposure") {
    // load videos
    load_video(videoElements[1], "icon_stimuli_xylophone") // left_video
    load_video(videoElements[2], "icon_stimuli_clarinet") // right_video

    // play videos (todo: make this general to handle different sequences of videos)
    // play right video after center ends
    videoElements[0].onended = function(e) {
      console.log(within_counter)
      if(within_counter==0) {
        load_video(videoElements[0], "icon_narrator_introinstrument_right") // center_video
        videoElements[0].play()
        within_counter++
      } else if(within_counter==1) {
        videoElements[2].play() // play_video() function not working at this step -- todo
        within_counter++
      } else if(within_counter==2) {
        videoElements[1].play()
        within_counter++
      } else {
        videoElements[0].pause()
      }
    }
    // say what to do after the right video ends
    videoElements[2].onended = function(e) {
      load_video(videoElements[0], "icon_narrator_introinstrument_left")
      videoElements[0].play()
    }

    // what to do after the left video ends
    videoElements[1].onended = function(e) {
      load_video(videoElements[0], "icon_narrator_testxylophone")
      videoElements[0].play()
    }
  }

    //blank out all borders so no item is pre-selected
    //$(".xsit_pic").each(function(){this.children[0].style.border = '5px solid white';});

    //Display the experiment slide
      showSlide("stage");

    }
  };
