/**
 * @description: 获取当前时间戳
 */
const curTime = () => {
  const time = Math.round(+new Date() / 1000);
  return +time;
};

/**
 * @description: 休眠
 * @param {number} ms
 */
const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, +ms));
};

/**
 * @description: 判断数据类型
 * @param {any} data
 */
const typeOf = (data: any) => {
  return Object.prototype.toString.call(data).slice(8, -1);
};

/**
 * @description: 判断是否为JSON
 * @param {string} str
 */
const isJSON = (str: string) => {
  if (!str) return false;
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str);
      if (typeof obj === 'object' && obj) return true;
      return false;
    } catch (e) {
      return false;
    }
  }
};

/**
 * @description: 数据处理
 */
const dataHandle = (o_data: any, method = 'get') => {
  let result = o_data;
  if (method === 'get') {
    //从数据库读取数据
    if (typeOf(result) === 'Object') {
      Object.keys(result).forEach((key) => {
        const _isJSON = isJSON(result?.[key] || '');
        _isJSON && (result[key] = JSON.parse(result[key]));
      });
    } else if (typeOf(result) === 'Array') {
      result.forEach((it) => {
        Object.keys(it).forEach((key) => {
          const _isJSON = isJSON(it?.[key] || '');
          _isJSON && (it[key] = JSON.parse(it[key]));
        });
      });
    } else {
      result = JSON.parse(result);
    }
  }
  if (method === 'set') {
    //将数据写入数据库
    if (typeOf(result) === 'Object') {
      Object.keys(result).forEach((key) => {
        result[key] = result?.[key] ?? '';
        if (typeof result[key] === 'object') {
          result[key] = JSON.stringify(result[key]);
        }
      });
    } else if (typeOf(result) === 'Array') {
      result = JSON.stringify(result);
    }
  }
  return result;
};

export { curTime, sleep, dataHandle };
