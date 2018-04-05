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
  social_cond: '',
  trialOrder: trialOrder,
  trialTypes: trialOrder,
  trials: allSpacings,
  samePosOrderOne: samePosOrderOne,
  samePosOrderTwo: samePosOrderTwo,
  samePos: [allSamePosOne[samePosOrderOne][0], allSamePosOne[samePosOrderOne][1],
            allSamePosOne[samePosOrderTwo][0], allSamePosOne[samePosOrderTwo][1],
            allSamePosOne[samePosOrderOne][0], allSamePosOne[samePosOrderOne][1]],
  data: [],
  keepPic: ['','','','','',''],
  keepIdx: [0, 0, 0, 0, 0, 0],
  item: 0,
  exampleItem: 0,
  trialSounds: trialSounds,
  exampleSounds: ['flower','truck'],
  trialImages: allImgs,
  exampleImages: exampleImages,
  exampleFace: 0,
  exampleFaces: exampleFaces,
  faceCenter: 'straight-ahead',
  faceVids: testFaces,

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

narrator_intro: function() {
  showSlide("narrator_intro");
  videoElements = document.getElementsByTagName("video");
  var vid_name = "icon_narrator_intro";
  load_video(videoElements[0], vid_name);
  play_video(videoElements[0]);
},

/*The work horse of the sequence: what to do on every trial.*/
  next: function() {
  // figure out where we are in the experiment: exposure or test
  var trial_type = "exposure"
  // get video elements
  var videoElements = document.getElementsByTagName("video");

  if(trial_type == "exposure") {
    // load videos
    load_video(videoElements[1], "icon_narrator_introinstrument_right") // center_video
    load_video(videoElements[2], "icon_stimuli_xylophone") // left_video
    load_video(videoElements[3], "icon_stimuli_clarinet") // right_video

    // play videos (todo: make this general to handle different sequences of videos)
    play_video(videoElements[1])

    // play right video after center ends
    videoElements[1].onended = function(e) {
      videoElements[3].play()
    }

    // play right video after center ends
    videoElements[3].onended = function(e) {
      videoElements[2].play()
    }




  }

    //blank out all borders so no item is pre-selected
    $(".xsit_pic").each(function(){this.children[0].style.border = '5px solid white';});

    //Re-Display the experiment slide
      showSlide("stage");

    }
  };
