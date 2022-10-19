// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build our functions
function togglePlay() {
    //there is no playing property, only a paused
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
    //shorthand way of writing the above:
    /*
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    */
}

function updateButton(){
    //change toggle button icon when paused/playing
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);//parseFloat converts it to a true number from a string
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100; //currentTime and duration are properties of the video
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;//get percentage of X axis where clicked and multiply by duration
    video.currentTime = scrubTime;
}

// Hook up event listeners
video.addEventListener('click', togglePlay);//click video element
video.addEventListener('play', updateButton);//video is playing, update button
video.addEventListener('pause', updateButton);//video is paused, update button
video.addEventListener('timeupdate', handleProgress);//run progress function every time the video time updates as it plays
toggle.addEventListener('click', togglePlay);//click play/pause button
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));//updating in real time when moving slider

let mousedown = false;
progress.addEventListener('click', scrub);
// progress.addEventListener('mousemove', () => {
//     if(mousedown){
//         scrub();
//     }
// });
//shorthand way of doing above:
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));//if mousedown is true, run scrub.
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);