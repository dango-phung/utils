/**
 * 应用 js 处理数组的那些事
 * 去重 
 * 分割 
 * 格式化扁平化 
 * Array<Object>根据 key 排序
 */

/**
 * 简单去重
 * @param {array} arr ['aaa', 'bbb', 'aaa', 'ccc']
 */
const simpleUnique = (arr) => {
	return [...new Set(arr)]
}
// console.log(simpleUnique(arr))	 // ["aaa", "bbb", "ccc"]


/**
 * 分割数组
 * @param {array} array 元数组
 * @param {number} subGroupLength 以 N 个一组分割
 */
const subGroupArr = (array, subGroupLength) => {
  let index = 0
  let newArray = []
  while(index < array.length) {
      newArray.push(array.slice(index, index += subGroupLength))
  }
  return newArray
}

/**
 * 扁平化数组
 * @param {Array<any>} arr 
 */
const flattenArr = (arr) => {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
  }, [])
}

/**
 * 
 * @param {Array<Object>} arr 
 * @param {String} key 
 */
const filterKeyValues = (arr, key) => {
  return arr.map(item => {
    return item[key]
  })
}

/**
 * Array<Object> 根据 key 排序
 * @param {string} key 
 */
const compareArrObject = (key) => {
  return (obj1, obj2) => {
    const value1 = obj1[key]
    const value2 = obj2[key]
    
    if (typeof value1 === 'number' && typeof value2 === 'number') {
      if (value1 > value2) {
      	return 1
      } else if (value1 < value2) {
        return -1
      } else {
      	return 0
      }
    } else if (typeof value1 === 'string' && typeof value2 === 'string') {
      return value1.localeCompare(value2)
    } else {
      throw Error('Compare value must be number or string.')
    }
  }
}
// e.g. 
// const arr = [
//   {"name": "Kate", "age": 22},
//   {"name": "Candy", "age": 21},
//   {"name": "Petty", "age": 20}
// ]

// arr.sort(compareArrObject('name'))      // {"name": "Candy", "age": 21}, {"name": "Kate", "age": 22}, {"name": "Petty", "age": 20}
// arr.sort(compareArrObject('age'))      // {"name": "Petty", "age": 20}, {"name": "Candy", "age": 21}, {"name": "Kate", "age": 22} 

export {
  simpleUnique,
  subGroupArr,
  flattenArr,
  filterKeyValues,
  compareArrObject
}
