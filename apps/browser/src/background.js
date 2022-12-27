chrome.action.onClicked.addListener(async tab => {
  await chrome.windows.create({
    height: 800,
    type: 'popup',
    url: 'index.html',
    width: 475
  });
});



/******** OLD ********/
// chrome.action.onClicked.addListener(async (tab) => {
//   console.log('here');
//   await chrome.tabs.create({ url: 'index.html' });
// });

// // import MainBackground from "src/app/background/main.background";

// // const uabMain = ((window as any).uabMain = new MainBackground());

// // // uabMain.bootstrap().then(() => {
// // //   // finished bootstrap
// // // });

// chrome.runtime.onInstalled.addListener(async () => {
//   var audio_element = document.createElement("audio");
//   audio_element.src = "http://stream.uabmagic.com:8000/stream/3/";

//   // chrome.runtime.onMessage.addListener(
//   //   function (request, sender, sendResponse) {
//   //     if (request.action === 'listen') {
//   //       if (isPlaying) {
//   //         audio_element.pause();
//   //       } else {
//   //         audio_element.load();
//   //         audio_element.play();
//   //       }

//   //       isPlaying = !isPlaying;
//   //       chrome.storage.local.set({ isPlaying });

//   //       sendResponse({ response: "received", isPlaying });
//   //     }

//   //     sendResponse({ response: "unhandled_action" });
//   //   }
//   // );
// });

// var isPlaying = false;

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
