const Regex = {
  // 任意数字 可以是正负数 包含小数点
  anyNumber: /^(\-|\+)?\d+(\.\d+)?$/,

  // 常规数字校验 正整数
  positiveInteger: /^[0-9]*$/,

  // 任意非负数 包含小数
  positiveNumber: /^\d+(\.\d+)?$/,

  // 非零正数 包含小数
  positiveNotZero: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,

  // N位数字
  // nNumber: /^[0-9]{N}$/,
  // 长度 1 - N 位数字: /^[0-9]{1, N}$/

  // 手机号
  mobile: /^1[345789]\d{9}$/,

  // IP simple 不排除 0.0.0.0
  IP: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/,
  // 排除 0.0.0.0: /^(?!^0{1,3}(\.0{1,3}){3}$)((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/
  // 排除 255.255.255.255​​: /^(?!^255(\.255){3}$)​((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/
  // 繁琐版(默认排除 0.0.0.0)：/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

  // 身份证 X (18位 )  【注】: 一代 15 位已弃用
  idCardNo: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,

  // 经度 -180.0～+180.0（整数部分为 0～180,小数部分为 0 到 6 位）
  longitude: /^(-)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/,

  // 维度 -90.0～+90.0（整数部分为 0～90,小数部分为 0 到 6 位）
  latitude: /^(-)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/,
  // 经纬度小数部分位数可自定义，不一定6位

  
  // 允许字母、数字、汉字、点、下划线、连接符​
  charSP: /^[a-zA-Z0-9-_.\u4e00-\u9fa5]+$/,

  // 常见密码校验 8-16位 必须有数字和字母，特殊字符可有可无
  password: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/
  // 8-16位字母数字，指定特殊字符 三选二: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z~!@#$%^&*]{8,16}$/

}

export default Regex
