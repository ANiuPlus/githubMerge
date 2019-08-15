/*
 * @Descripttion:
 * @version:
 * @Author: Aniu
 * @Date: 2019-08-12 15:27:48
 * @LastEditors: Aniu
 * @LastEditTime: 2019-08-14 09:49:15
 */

const sessionArr = ['isNew', 'isOpen', 'isMerge', 'ProjectName', 'href'];

const clearSession = () => {
  sessionArr.forEach(item => {
    sessionStorage.removeItem(item);
  });
};

const goFront = () => {
  setTimeout(() => {
    window.location.href = 'https://dev365.keytop.cn/gitlab/FRONT';
  }, 1000);
};

$(function() {
  // chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //   // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
  //   if (request.cmd == 'test') alert(request.value);
  //   sendResponse('我收到了你的消息！');
  // });

  return;
  if (window.location.href === 'https://dev365.keytop.cn/gitlab/FRONT') {
    clearSession();
    return;
  }
  if (localStorage.getItem('success')) return;
  if (window.location.host !== 'dev365.keytop.cn') return;
  // 获取项目名
  let ProjectName, href;
  // 不再重新获取项目名
  if (!sessionStorage.getItem('ProjectName')) {
    ProjectName = window.location.href.split('/').pop();
    sessionStorage.setItem('ProjectName', ProjectName);
    // 跳到合并页
    // href = `https://dev365.keytop.cn/gitlab/FRONT/${ProjectName}/merge_requests/new`;
    // sessionStorage.setItem('href', href);
    // window.location.href = href;
  }

  // 获取源分支按钮
  var jsSource = $('.js-source-branch');
  // 获目标分支按钮
  // var jsTarget = $('.js-target-branch');
  console.log('jsSource', jsSource);
  // jsSource.trigger('click');
  // jsTarget.trigger('click');

  // var jsSourceText = jsSource.find('.dropdown-toggle-text');
  // var jsTargetText = jsTarget.find('.dropdown-toggle-text');

  // setTimeout换成自己请求数据
  // asynchronous data

  const ajaxPromise = param => {
    return new Promise((resovle, reject) => {
      $.ajax({
        type: param.type || 'get',
        async: param.async || true,
        url: param.url,
        data: param.data || '',
        success: res => {
          resovle(res);
        },
        error: err => {
          reject(err);
        }
      });
    });
  };

  // const getBranchData = () => {
  //   $.ajax({
  //     type: 'GET',
  //     url:
  //       'https://dev365.keytop.cn/gitlab/FRONT/mercoupon/refs?search=&find=branches',
  //     // data: { ref: ref },
  //     dataType: 'json',
  //     success: function(data) {
  //       return data;
  //     }
  //   });
  // };

  //https://dev365.keytop.cn/gitlab/autocomplete/users.json?search=&active=true&project_id=72&current_user=true

  //https://dev365.keytop.cn/gitlab/groups/FRONT/-/children.json
  // 获取项目id

  const jumpMerge = async () => {
    const projectId = (await ajaxPromise({
      url: `https://dev365.keytop.cn/gitlab/groups/FRONT/-/children.json`
    })).find(item => {
      return item.name === sessionStorage.getItem('ProjectName');
    });
    sessionStorage.setItem('projectId', projectId);

    const sourceArr = (await ajaxPromise({
      url: `https://dev365.keytop.cn/gitlab/FRONT/${sessionStorage.getItem(
        'ProjectName'
      )}/refs?search=&find=branches`
    })).Branches;
    console.log('sourceArr', sourceArr);
    // debugger;
    // 这边id是写死的后面要根据不同项目动态获取需要用到正则
    var next1 = sourceArr.findIndex(item => {
      return /^[A-Za-z]+$/.test(item);
    });

    var next2 = sourceArr.findIndex(item => {
      return /^[0-9]+$/.test(item);
    });

    var sourceId = sourceArr[next1 - 1]; //取纯数字分支最后一个
    var targetId = sourceArr[next2 - 1]; //取带点分支最后一个

    sessionStorage.setItem('isOpen', 1);
    // 项目id还没改
    window.location.href = `https://dev365.keytop.cn/gitlab/FRONT/${sessionStorage.getItem(
      'ProjectName'
    )}/merge_requests/new?utf8=%E2%9C%93&merge_request%5Bsource_project_id%5D=${projectId}&merge_request%5Bsource_branch%5D=${sourceId}&merge_request%5Btarget_project_id%5D=${projectId}&merge_request%5Btarget_branch%5D=${targetId}`;
  };

  // jump to merge page
  if (!sessionStorage.getItem('isOpen')) {
    // debugger;
    jumpMerge();
  }

  // is merge page
  // if has WIP 1s go to front
  //else into merge process
  // return;

  // const handleMerge= ()

  if (sessionStorage.getItem('isOpen') && !sessionStorage.getItem('isMerge')) {
    if (
      $('.qa-issuable-form-title')
        .val()
        .indexOf('WIP') > -1
    ) {
      goFront();
    } else {
      // 可能点击事件还没绑上 不知道怎么处理授权人，一个是assign-to-me-link点击无效，一个是要通过拿列表，但不知道怎么带上
      // setTimeout(() => {
      //   $('.assign-to-me-link').trigger('click');
      // });

      sessionStorage.setItem('isMerge', 1);
      // localStorage.setItem('success', 1);
      // setTimeout(() => {
      //   console.log('4000');
      //   $('.accept-merge-request').trigger('click');
      // }, 4000);
      $('.qa-issuable-create-button').trigger('click');
      // debugger;
    }
  }
  // 不知道为什么放在。。。只能丢到全局去结果可以了
  $('.accept-merge-request') && $('.accept-merge-request').trigger('click');
  return;
  if (sessionStorage.getItem('isMerge')) {
    debugger;
    // goFront();
  } else {
    debugger;
  }

  // var sourceId = jsSource
  //   .siblings('.js-source-branch-dropdown')
  //   .find('.dropdown-content ul')
  //   .find('li')
  //   .eq(-4)
  //   .text();
  // 找到1137上面一个  先找出所有li节点的类数组然后转化为数组遍历
  // get branch array
  var sourceLiArr = jsSource
    .siblings('.js-source-branch-dropdown')
    .find('.dropdown-content ul')
    .children();
  var sourceArr = [];
  for (let i = 0; i < sourceLiArr.length; i++) {
    sourceArr.push(sourceLiArr.eq(i).text());
  }
  var sourceId = sourceArr[sourceArr.length - 4]; //取纯数字分支最后一个
  var targetId = sourceArr[sourceArr.indexOf('1001137') - 1]; //取带点分支最后一个
  console.log('sourceArr', sourceArr.indexOf('1001137'));
  // var targetId = jsTarget
  //   .siblings('.js-target-branch-dropdown')
  //   .find('.dropdown-content ul')
  //   .find('li')
  //   .eq(-4)
  //   .text();

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

  // jump to merge page
  if (!sessionStorage.getItem('isOpen')) {
    // debugger;
    window.location.href =
      window.location.href +
      `?utf8=%E2%9C%93&merge_request%5Bsource_project_id%5D=72&merge_request%5Bsource_branch%5D=${sourceId}&merge_request%5Btarget_project_id%5D=72&merge_request%5Btarget_branch%5D=${targetId}`;
    sessionStorage.setItem('isOpen', 1);
  }
  // $.ajax({
  //   type: 'GET',
  //   url:
  //     'https://dev365.keytop.cn/gitlab/FRONT/mercoupon/merge_requests/new/branch_from',
  //   data: { ref: ref },
  //   dataType: 'json',
  //   success: function(data) {}
  // });
});

// is wip?
