/*
 * @Descripttion:
 * @version:
 * @Author: Aniu
 * @Date: 2019-08-12 15:27:48
 * @LastEditors: Aniu
 * @LastEditTime: 2019-08-12 18:40:16
 */

$(function() {
  // 获取源分支按钮
  var jsSource = $('.js-source-branch');
  // 获目标分支按钮
  var jsTarget = $('.js-target-branch');
  console.log('jsSource', jsSource);
  jsSource.trigger('click');
  setTimeout(() => {
    var li = jsSource
      .siblings('.js-source-branch-dropdown')
      .find('.dropdown-content ul')
      .find('li')
      .eq(-4);
    li.find('a').trigger('click');
    // li.on
    console.log(li);
  }, 1500);
});
