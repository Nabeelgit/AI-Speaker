<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Speaker</title>
    <link rel="stylesheet" type="text/css" href="./style.css">
    <script src="./main.js" defer></script>
</head>
<body>
    <div class="main_container">
        <div class="container fill-available-height">
            <div class="header">
                <h1 style="margin: 0">AI Speaker</h1>
                <div>
                    <label>Text to speech</label>
                    <input type="checkbox" id="text-to-speech-check">
                </div>
            </div>
            <div class="messages fill-available-width fill-available-height"></div>
            <div class="message_box">
                <form id="message_form">
                    <div class="input_container">
                        <textarea placeholder="Type a message..." id="message_input" tabindex="0"></textarea>
                        <button id="submit_btn"><svg xmlns="http://www.w3.org/2000/svg" style="fill: white" viewBox="0 0 512 512" class="send_svg"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg></button>
                    </div>
                    <button class="blue-btn" id="mic-btn" role="button" style="margin-left: 1rem">                            
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.3rem" style="fill: white" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg>
                    </button>
                </form>
            </div>
        </div>
    </div>
    <div class="message-box">
        <div style="display: flex; justify-content: space-between; align-items: center">
            <h2 id="msg-text"></h2>
            <p class="message-box-x">X</p>
        </div>
    </div>  
</body>
</html>