speech = window.speechSynthesis;

mainForm =document.getElementById('main-form');
inputText=document.getElementById('input-text');
voiceSelect=document.getElementById('voice-select');
playbackRate=document.getElementById('playback-rate');
playbackRateValue=document.getElementById('playback-rate-value');
pitch=document.getElementById('pitch');
pitchValue=document.getElementById('pitch-value');
body = document.querySelector('body');

voices =[];

function populateVoices() {
    voices= speech.getVoices();
    voices.forEach(function(voice) { 

        option = document.createElement('option')
        option.textContent = voice.name + '('+voice.lang +')';
        
        option.setAttribute('voice-name',voice.name);
        option.setAttribute('voice-lang',voice.name);

        voiceSelect.appendChild(option);
    });
};

populateVoices();

if (speech.onvoiceschanged !==undefined){
    speech.onvoiceschanged = populateVoices;
}

function speak() {
   
    if (speech.speaking) {
      alert('Already speaking...');
      return;
    }
    if (inputText.value !== '') {
      
      body.style.background = '#141414 url(img/wave.gif)';
      body.style.backgroundRepeat = 'repeat-x';
      body.style.backgroundSize = '100% 100%';
  
     
      speechText = new SpeechSynthesisUtterance(inputText.value);
  
     
      speechText.onend = function(event) {  
        body.style.background = '#141414';
      };
  
      speechText.onerror = function(event) {
        alert('Something went wrong');
      };
  
     
      selectedVoice = voiceSelect.selectedOptions[0].getAttribute('voice-name');
  
      voices.forEach(function(voice) {
        if (voice.name === selectedVoice) {
            speechText.voice = voice;
        }
      });
  
      
      speechText.rate = playbackRate.value;
      speechText.pitch = pitch.value;
     
      speech.speak(speechText);
    }
  };
  
  
mainForm.addEventListener('submit', function(submit) {
    submit.preventDefault();
    speak();
    inputText.blur();
});
  
playbackRate.addEventListener('change', function(){playbackRateValue.textContent = playbackRate.value});

pitch.addEventListener('change',function(){pitchValue.textContent = pitch.value});

voiceSelect.addEventListener('change', speak);