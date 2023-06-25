function sendRequest(to, body, func){
  const xml = new XMLHttpRequest();
  xml.addEventListener('readystatechange', function(){
      if(xml.status === 200 && xml.readyState === 4){
          func(xml.responseText);
      }
  })
  xml.open('POST', to, true);
  xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xml.send(body)
}
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function cookieExists(cname) {
  return getCookie(cname) !== "";
}
function speak(str){
  var msg = new SpeechSynthesisUtterance();
  msg.text = str;
  window.speechSynthesis.speak(msg);
}
const text_to_speech = document.getElementById('text-to-speech-check');
const message_history = [
  {role: "system", content: `You are a helpful assistan on a website called AI Speaker.`},
];
const messages_div = document.querySelector('.messages');
const form = document.getElementById('message_form');
const message_input = document.getElementById('message_input');
function createMessage(text, who, who_class){
  let box = document.createElement('div');
  box.classList.add('message')
  box.classList.add(who_class);
  let p = document.createElement('p');
  p.innerText = who;
  let span = document.createElement('span');
  span.classList.add('text');
  span.innerText = text;
  box.appendChild(p);
  box.appendChild(span);
  messages_div.appendChild(box);
  messages_div.scrollTop = messages_div.scrollHeight;
}
function chat(){
  message_input.disabled = true;
  sendRequest('./chat.php', 'message='+JSON.stringify({ "model": "gpt-3.5-turbo","messages": message_history}), function(msg){
    let load_message = document.querySelector('.load_message');
    if(load_message !== null){
      load_message.remove();
    }
    createMessage(msg, 'AI:', 'ai_message');
    message_input.disabled = false;
    if(text_to_speech.checked){
      speak(msg);
    }
    message_history.push({role: "assistant", content: msg});
  })
}
function formSubmit(){
  let text = message_input.value.trim();
  if(text !== ''){
    message_history.push({role: "user", content: text});
    createMessage(text, 'You:', 'user_message');
    createMessage('...', 'AI:', 'load_message');
    message_input.value = '';
    chat();
  }
}
message_input.addEventListener('keydown', function(e){
  if(e.key === 'Enter'){
    e.preventDefault();
    formSubmit();
  }
})
form.addEventListener('submit', function(e){
  e.preventDefault();
  formSubmit();
})

if(typeof webkitSpeechRecognition !== 'undefined'){
  const microphone = document.getElementById('mic-btn');
  const msg = document.querySelector('.message-box');
  const msg_text = msg.querySelector('#msg-text')
  // have to use var instead of let and const
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  // fill results as speaking
  recognition.interimResults = true;
  microphone.addEventListener('click', function (e){
      e.preventDefault();
      // disable so user can't click again
      microphone.disabled = true;
      // start recognition
      recognition.start();
      // show listening box
      msg_text.innerText = 'Listening...'
      msg.style.display = 'block';
      msg.style.animation = 'slide-in-left 0.65s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
      recognition.onspeechend = function() {
          // done speaking
          message_input.focus();
          recognition.stop();
      }
      recognition.onresult = function(event) {
          let transcript = event.results[0][0].transcript;
          message_input.value = transcript;
          // done
          if(event.results[0].isFinal){
              msg.style.animation = 'slide-out-left 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
              // enable button
              microphone.disabled = false;
          }
      }
      // error occurred in speech recognition
      recognition.addEventListener('error', function (){
          msg_text.innerText = 'An error occurred while listening...'
      })
      // X button click
      msg.querySelector('.message-box-x').addEventListener('click', function (){
          recognition.stop();
          msg.style.animation = 'slide-out-left 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'
      })
  })
} else {
  alert('This browser does not support microphone functionality!');
}