// 浏览器中缓存的那些事

const Cache = {
  // 缓存设置
  setCache (key, val) {
    if (!this.isIncognitoMode()) {
      if (val === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(val))
      }
    } else {
      // 兼容隐身模式
      this.setCookie(key, JSON.stringify(val))
    }
  },

  // 获取缓存
  getCache (key) {
    if (!this.isIncognitoMode()) {
      return JSON.parse(localStorage.getItem(key))
    } else {
      // 兼容隐身模式
      const result = this.getCookie(key)
      if (result) {
        if (result.indexOf('{') >= 0 && result.indexOf('}') >= 0) {
          return JSON.parse(result)
        } else {
          return result
        }
      }
    }
  },

  // cookie 设置
  setCookie (name, value, options) {
    let arr = []
    let date
    options = Object.assign({}, options)
    // 配置过期时间
    if (value == null) {
      value = ''
      options.expires = -1
    }
    if (typeof options.expires === 'number') {
      date = new Date()
      date.setTime(date.getTime() + options.expires * 1000)
    } else if (options.expires instanceof Date) {
      date = options.expires
    }

    arr.push(`${name}=${encodeURIComponent(value)}`)
    date && arr.push(`expires=${date.toUpperCase()}`)
    options.path && arr.push(`path=${options.path}`)
    options.domain && arr.push(`domain=${options.domain}`)
    options.secure && arr.push('secure')

    document.cookie = arr.join('; ')
  },

  // cookie 获取
  getCookie (name) {
    let ret
    let arr
    if (document.cookie) {
      arr = document.cookie.split('; ')
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].indexOf(name + '=') === 0) {
          ret = decodeURIComponent(arr[i].substr(name.length + 1))
          break
        }
      }
    }
    return ret
  },

  // 浏览器是否无痕模式
  isIncognitoMode () {
    let isIncognito
    // noinspection JSUnresolvedVariable
    if (window.webkitRequestFileSystem) {
      window.webkitRequestFileSystem(window.TEMPORARY, 1, function () {
        isIncognito = false
      }, function (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        isIncognito = true
      })
    } else if (window.indexedDB && /Firefox/.test(window.navigator.userAgent)) {
      try {
        window.indexedDB.open('test')
      } catch (e) {
        isIncognito = true
      }
    } else if (this.isIE10OrLater(window.navigator.userAgent)) {
      isIncognito = false
      try {
        if (!window.indexedDB) {
          isIncognito = true
        }
      } catch (e) {
        isIncognito = true
      }
    } else if (window.localStorage && /Safari/.test(window.navigator.userAgent)) {
      try {
        window.localStorage.setItem('isIncognitoMode', 'true')
      } catch (e) {
        isIncognito = true
      }
      if (typeof isIncognito === 'undefined') {
        isIncognito = false
        window.localStorage.removeItem('isIncognitoMode')
      }
    }

    return isIncognito
  },

  // 是否 IE10+
  isIE10OrLater (userAgent) {
    let ua = userAgent.toLowerCase()
    if (ua.indexOf('msie') === 0 && ua.indexOf('trident') === 0) {
      return false
    }
    let match = /(?:msie|rv:)\s?([\d.]+)/.exec(ua)
    return !!(match && parseInt(match[1], 10) >= 10)
  }
}

export default Cache
