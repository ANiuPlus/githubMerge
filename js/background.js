/*
 * @Descripttion:
 * @version:
 * @Author: Aniu
 * @Date: 2019-08-12 17:48:00
 * @LastEditors: Aniu
 * @LastEditTime: 2019-08-15 08:30:55
 */

chrome.contextMenus.create({
  title: '使用度娘搜索：%s', // %s表示选中的文字
  contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
  onclick: function(params) {
    if (!params) return;
    // 注意不能使用location.href，因为location是属于background的window对象
    chrome.tabs.create({
      url:
        'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)
    });
  }
});
// 弹窗
// chrome.notifications.create(null, {
//   type: 'basic',
//   iconUrl: 'img/icon.png',
//   title: '这是标题',
//   message: '您刚才点击了自定义右键菜单！'
// });

const ajaxPromise = param => {
  return new Promise((resovle, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(param.type || 'get', param.url, true);
    xhr.send(param.data || null);

    xhr.onreadystatechange = () => {
      var DONE = 4; // readyState 4 代表已向服务器发送请求
      var OK = 200; // status 200 代表服务器返回成功
      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          resovle(xhr.responseText);
        } else {
          reject(xhr.responseText);
        }
      }
    };
  });
};

// const project1 = ajaxPromise({
//   url: `https://dev365.keytop.cn/gitlab/groups/FRONT/-/children.json`
// });

let project = () => {
  ajaxPromise({
    url: `https://dev365.keytop.cn/gitlab/groups/FRONT/-/children.json`
  })
    .then(res => {
      console.log('第一个请求正确返回==>' + res);
      // 取name和id
      // res.map(item=>{

      // }
    })
    .catch(err => {
      console.log('第一个请求失败');
    });
};
// project();
// console.log('project1', project1);
