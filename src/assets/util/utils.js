 const tokenExpressInTime = () => {
  let date = new Date()
  let tokenTime = localStorage.getItem('tokenTime')
  // 当前时间减去获取本地过期时间的值是否大于0   大于0为过期返回true 否则返回false
  return (date.getTime() - Number(tokenTime)) > 0
}


 const timestampToTime = (timestamp) => {
  let date = new Date(timestamp)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h = (date.getHours()  < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = (date.getSeconds()  < 10 ? '0' + date.getSeconds()  : date.getSeconds())
  let day = date.getDay()
  switch (day) {
    case 0: day = '星期日'
      break;
    case 1: day = '星期一'
      break;
    case 2: day = '星期二'
      break;
    case 3: day = '星期三'
      break;
    case 4: day = '星期四'
      break;
    case 5: day = '星期五'
      break;
    case 6: day = '星期六'
      break;
  }
  return {
    full: Y + M + D + h + m + s,
    YMD: Y + M + D,
    hms: h + m + s,
    day: day
  }
}

export {
  timestampToTime,
  tokenExpressInTime
}
