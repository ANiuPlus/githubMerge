/*
 * @Descripttion:
 * @version:
 * @Author: Aniu
 * @Date: 2019-08-14 18:24:23
 * @LastEditors: Aniu
 * @LastEditTime: 2019-08-20 08:17:56
 */
function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      if (callback) callback(response);
    });
  });
}
$(() => {
  localStorage.setItem('success', 1);
  $('.radio-button').on('click', () => {
    const that = $('.radio-button');
    console.log(that);
    if (that.hasClass('active')) {
      sendMessageToContentScript({ cmd: 'test', value: 0 }, function(response) {
        console.log('来自content的回复：' + response);
      });
      that.removeClass('active');
      console.log(that.hasClass('active'));
      localStorage.removeItem('success');
    } else {
      sendMessageToContentScript({ cmd: 'test', value: 1 }, function(response) {
        console.log('来自content的回复：' + response);
      });
      that.addClass('active');
      console.log(that.hasClass('active'));
      localStorage.setItem('success', 1);
    }
  });
});
