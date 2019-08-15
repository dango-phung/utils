
// 通用校验

const Verify = {
  isEmail (val) {
    const reg = /^([a-zA-Z0-9_-])+%40([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
    return reg.test(val)
  },

  isMobile (val) {
    // 运营商后继添加...
    const reg = /^1[345789]\d{9}$/
    return reg.test(val)
  },

  // 任意数字  可以是小数、正负数
  isNumber (val) {
    const reg = /^(\-|\+)?\d+(\.\d+)?$/
    return reg.test(val)
  },

  // 正整数
  isPositiveInteger (val) {
    const reg = /^[0-9]*$/
    return reg.test(val)
  },

  // 不建议校验使用
  isUrl (url) {
    const reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
    return reg.test(url)
  }
}

export default Verify
