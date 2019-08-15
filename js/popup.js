/*
 * @Descripttion:
 * @version:
 * @Author: Aniu
 * @Date: 2019-08-14 18:24:23
 * @LastEditors: Aniu
 * @LastEditTime: 2019-08-15 08:48:13
 */
function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      if (callback) callback(response);
    });
  });
}
$(() => {
  $('.radio-button').on('click', () => {
    var ckb = $('.radio-button__inset');
    if (ckb.is(':checked')) {
      ckb.attr('checked', false);
      console.log(0);
      sendMessageToContentScript({ cmd: 'test', value: 0 }, function(response) {
        console.log('来自content的回复：' + response);
      });
      // localStorage.removeItem('success');
    } else {
      sendMessageToContentScript({ cmd: 'test', value: 1 }, function(response) {
        console.log('来自content的回复：' + response);
      });
      // localStorage.setItem('success', 1);
      // 为啥通信不了？？
      // sendMessageToContentScript(
      //   { cmd: 'test', value: '你好，我是popup！' },
      //   function(response) {
      //     console.log('来自content的回复：' + response);
      //   }
      // );
      ckb.attr('checked', true);
      console.log(ckb.is(':checked'));
    }
  });
});
