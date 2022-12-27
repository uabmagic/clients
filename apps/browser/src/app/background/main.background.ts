export default class MainBackground {
  constructor() {
    // chrome.runtime.onInstalled.addListener(async () => {
    // this.bootstrap();
    // });
  }

  bootstrap() {
    chrome.action.onClicked.addListener(async tab => {
      await chrome.windows.create({
        height: 800,
        type: 'popup',
        url: 'index.html',
        width: 475
      });
    });

    chrome.runtime.onInstalled.addListener(() => {
      createTokenRefreshAlarm();
    });

    function createTokenRefreshAlarm() {
      chrome.alarms.create('refreshToken', {
        delayInMinutes: 5, periodInMinutes: 5
      });
    }

    chrome.alarms.onAlarm.addListener((alarm) => {
      console.log("Got an alarm!", alarm);
    });
  }

  // var isPlaying = false;

  // var audio_element = document.createElement("audio");
  // audio_element.src = "http://stream.uabmagic.com:8000/stream/3/";

  // chrome.runtime.onMessage.addListener(
  //   function (request, sender, sendResponse) {
  //     if (request.action === 'listen') {
  //       if (isPlaying) {
  //         audio_element.pause();
  //       } else {
  //         audio_element.load();
  //         audio_element.play();
  //       }

  //       isPlaying = !isPlaying;
  //       chrome.storage.local.set({ isPlaying });

  //       sendResponse({ response: "received", isPlaying });
  //     }

  //     sendResponse({ response: "unhandled_action" });
  //   }
  // );

  // async bootstrap() {
  //   chrome.runtime.onInstalled.addListener(() => {
  //     var isPlaying = false;

  //     var audio_element = document.createElement("audio");
  //     audio_element.src = "http://stream.uabmagic.com:8000/stream/3/";

  //     chrome.runtime.onMessage.addListener(
  //       function (request, sender, sendResponse) {
  //         if (request.action === 'listen') {
  //           if (isPlaying) {
  //             audio_element.pause();
  //           } else {
  //             audio_element.load();
  //             audio_element.play();
  //           }

  //           isPlaying = !isPlaying;
  //           chrome.storage.local.set({ isPlaying });

  //           sendResponse({ response: "received", isPlaying });
  //         }

  //         sendResponse({ response: "unhandled_action" });
  //       }
  //     );
  //   });
  // }
}
