/*
 * @Descripttion:
 * @version:
 * @Author: Aniu
 * @Date: 2019-08-14 18:24:23
 * @LastEditors: Aniu
 * @LastEditTime: 2019-08-14 18:30:34
 */
$(() => {
  $('.radio-button').on('click', () => {
    var ckb = $('.radio-button__inset');
    if (ckb.is(':checked')) {
      ckb.attr('checked', 'checked');
      console.log(0);
    } else {
      ckb.attr('checked', true);
      console.log(1);
    }
  });
});
