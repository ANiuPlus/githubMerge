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
  jsTarget.trigger('click');

  var jsSourceText = jsSource.find('.dropdown-toggle-text');
  var jsTargetText = jsTarget.find('.dropdown-toggle-text');
  setTimeout(() => {
    var sourceId = jsSource
      .siblings('.js-source-branch-dropdown')
      .find('.dropdown-content ul')
      .find('li')
      .eq(-4)
      .text();

    var targetId = jsTarget
      .siblings('.js-target-branch-dropdown')
      .find('.dropdown-content ul')
      .find('li')
      .eq(-4)
      .text();

    window.location.href;
    var href;
    if (window.location.href.indexOf('?') > -1) {
      href = window.location.href.split('?')[0];
    } else {
      href =
        'https://dev365.keytop.cn/gitlab/FRONT/mercoupon/merge_requests/new';
    }
    console.log(
      sourceId,
      targetId,
      `${href}?utf8=%E2%9C%93&merge_request%5Bsource_project_id%5D=72&merge_request%5Bsource_branch%5D=${sourceId}&merge_request%5Btarget_project_id%5D=72&merge_request%5Btarget_branch%5D=${targetId}`
    );

    // $('.js-source-branch').siblings('.js-source-branch-dropdown')
    //   .find('.dropdown-content ul')
    //   .find('li')
    //   .eq(-4).trigger('click')

    // console.log(li);

    // https://dev365.keytop.cn/gitlab/FRONT/mercoupon/merge_requests/new/branch_from?ref=1005016

    //

    // window.open(
    //   `https://dev365.keytop.cn/gitlab/FRONT/mercoupon/merge_requests/new?utf8=%E2%9C%93&merge_request%5Bsource_project_id%5D=72&merge_request%5Bsource_branch%5D=${sourceId}&merge_request%5Btarget_project_id%5D=72&merge_request%5Btarget_branch%5D=${targetId}`
    // );
    // $.ajax({
    //   type: 'GET',
    //   url:
    //     'https://dev365.keytop.cn/gitlab/FRONT/mercoupon/merge_requests/new/branch_from',
    //   data: { ref: ref },
    //   dataType: 'json',
    //   success: function(data) {}
    // });
  }, 1500);
});
