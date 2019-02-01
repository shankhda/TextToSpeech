speech = window.speechSynthesis;

mainForm =document.getElementById('main-form');
inputText=document.getElementById('input-text');
voiceSelect=document.getElementById('voice-select');
playbackRate=document.getElementById('playback-rate');
playbackRateValue=document.getElementById('playback-rate-value');
pitch=document.getElementById('pitch-rate');
pitchValue=document.getElementById('pitch-value');

voices =[];

function populateVoices() {
    voices= speech.getVoices();
    voices.forEach(voice => { 

        option = document.createElement('option')
        option.textContent = voice.name + '('+voice.lang +')';
        
        voiceSelect.appendChild(option);
    });
};

populateVoices();

if (speech.onvoiceschanged !==undefined){
    speech.onvoiceschanged = populateVoices;
}