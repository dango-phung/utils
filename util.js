/**
 * 获取表单数据对象 jQuery
 *
 * @param {HTMLFormElement | string} form
 * @return {object}
 */
const getFormData = form => {
  let data = {}
  const kvObjArray = $(form).serializeArray()

  for (let obj of kvObjArray) {
    if (data[obj.name]) {
      // 多選
      data[obj.name] = [data[obj.name], $.trim(obj.value)].join(',')
    } else {
      data[obj.name] = $.trim(obj.value)
    }
  }

  return data
}

/**
 * 將 queryString 解析为对象
 *
 * @param {string} search
 * @return {object}
 */
const queryParse = (search = window.location.search) => {
  if (!search) return {}
  const queryString = search[0] === '?' ? search.substring(1) : search
  const query = {}
  queryString.split('&').forEach(queryStr => {
    const [key, value] = queryStr.split('=')
    /* istanbul ignore else */
    if (key) query[decodeURIComponent(key)] = decodeURIComponent(value)
  })

  return query
}

/**
 * 将对象转化为 queryString
 *
 * @param {object} query
 * @return {string}
 */
const queryStringify = query => {
  const queryString = Object.keys(query)
    .map(key => `${key}=${encodeURIComponent(query[key] || '')}`)
    .join('&')
  return queryString
}

/**
 * 去除 url 中特定的 queryString
 *
 * @param {string} key
 * @param {string} href
 * @return {string}
 */
const removeQueryString = (key, href = window.location.href) => {
  const [url, search] = href.split( '?' )

  if (!search) {
    return url
  }

  let queryString = search.split('&')
  let finalQuery = ''

  if (queryString.length) {
    queryString = queryString.filter(item => !item.startsWith(key + '='))
  }

  if (!queryString.length) {
    return url
  }

  finalQuery = queryString.length > 1 ? queryString.join('&') : queryString[0]
  return url + '?' + finalQuery
}

/**
 * 生成指定位数的随机数
 * @param {number} x
 */
const randomStr = (x) => {
  let s = ""
  while(s.length < x && x > 0){
    let v = Math.random() < 0.5 ? 32 : 0
    s += String.fromCharCode(Math.round(Math.random() * ((122 - v) - (97 - v)) + (97 - v)))
  }
  return s
}

// 防 XSS
const escapeHtml = (str) => {
  if (str.length === 0) return ''
  let s
  s = str.replace(/&/g, '&amp;')
  s = s.replace(/</g, '&lt;')
  s = s.replace(/>/g, '&gt;')
  s = s.replace(/ /g, '&nbsp;')
  s = s.replace(/\'/g, '&#39;')
  s = s.replace(/\"/g, '&quot;')

  return s
}

/**
 * 针对接口返回文件流 依靠浏览器能力执行下载
 * @param {Object} res 接口回调参数
 * @param {string} type 指定下载文件类型
 */
const BlobDownload = (res, type) => {
  let blob = type ? new Blob([res.data], { type: type }) : new Blob([res.data])
  let url = window.URL.createObjectURL(blob)
  let fileName = res.headers['content-disposition'].split(';')[1].split('=')[1] // 从回调 header 取出 filename

  // IE 处理
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName)
    return
  }
  let linkDom = document.createElement('a')
  linkDom.className = 'part-download'
  document.body.appendChild(linkDom)

  linkDom.href = url
  linkDom.download = fileName // 命名下载名称
  linkDom.click() // 触发下载
  window.URL.revokeObjectURL(url) // 下载完成进行释放
  document.body.removeChild(linkDom) // 删除新增节点
}

/**
 * 超出数字上线 单位计数
 * @param {Number} num
 * @param {Number} max 最大数 如 10000
 * @param {String} unit 单位 如 人/次
 */
const unitNumber = (num, max, unit) => {
  let newNum = num
  if (Number(num) > max || Number(num) === max) {
    newNum = Math.round((newNum / max) * 100) / 100
    newNum = newNum + unit
  }

  return newNum
}

export {
  getFormData,
  queryParse,
  queryStringify,
  removeQueryString,
  randomStr,
  escapeHtml,
  BlobDownload,
  unitNumber
}
