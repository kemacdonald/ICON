// ---------------- 2. STIMULUS SETUP ------------------
// Global variable assignment for the experiment

var instruments = ["xylophone", "clarinet"]
var narrator_vid_names = ["intro", "left", "right", "postinstrument"]
var imgsPerSlide = 2
var numBlocks = 6;
var numOccurs = 2
var numUsedImgs = ((imgsPerSlide*numOccurs)-1)*numBlocks
var numUsedSounds = numBlocks;

var numImgs = 28;
var numSounds = 6;

allImgs = range(1,numImgs);
allImgs = shuffle(allImgs);
allImgs = allImgs.slice(0,numUsedImgs);

allSounds = range(1,numSounds);
allSounds = shuffle(allSounds);
allSounds = allSounds.slice(0,numUsedSounds);

allImgs = allImgs.map(function(elem){return 'Novel'+elem;});
$(allImgs.map(function(elem){return 'stimuli/images/'+elem+'.jpg';})).preload();

// controls order of trial types
var trialOrder = [1, 1, 2, 2, 1, 2];

// controls whether we move the image on test trials
var allSamePosOne = [[1, 0], [0, 1], [1, 0]];

// controls the delay between exposure and test
var allSpacings = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

var condition, handler, testFaceIdx;
var numExamples = 2;
var startTime = 0;
var samePosOrderOne = random(2);
var samePosOrderTwo = random(2);
var cont = 0;
var audioSprite = $("#sound_player")[0];
var exampleImages = ['lion','flower','truck','tie'];
var exampleFaces = ['down-right', 'down-left'];
var exampleFacesIdx = [1,0];
var testFaces = ['down-left', 'down-right'];
var trialSounds = allSounds.map(function(elem){return 'Sound'+elem;});
