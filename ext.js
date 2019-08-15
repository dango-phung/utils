// 拆分为两个数组
const exampleValues = [2, 15, 8, 23, 1, 32]  // 测试用

const [truthyValues, falseyValues] = exampleValues.reduce((arrays, exampleValue) => {
  if (exampleValue > 10) {
    arrays[0].push(exampleValue)
    return arrays;
  }

  arrays[1].push(exampleValue)
  return arrays
}, [[], []])
// truthyValues: (3) [15, 23, 32]
// falseyValues: (3) [2, 8, 1]

// 普通去重 
const arr = ['aaa', 'bbb', 'aaa', 'ccc']
const uniqueArr = arr.filter((item, index) => {
	return arr.indexOf(item) === index
})
// console.log(uniqueArr);  // ['aaa', 'bbb', 'ccc']

// 货币格式化
const num = 123456.1234

num.toLocaleString('zh-Hans-CN', { style: 'currency', currency: 'CNY' })
// ￥123,456.12

num.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
// $123,456.12

num.toLocaleString('zh', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })
// 123,456.12


