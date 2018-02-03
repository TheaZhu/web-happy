export default {
  getAnsFromSogou: (key, callback,
                    timestamp) => `/sogou/api/ans2?key=${key}&wdcallback=${callback}&_=${timestamp}`,
  getAnsFromCrop: (timestamp) => `/crop/answer/curr?format=json&activity=million&_t=${timestamp}`,
  getAnsFromDan: (key) => `/dan/answer?xc=541e63a877abe5d6f9bf1b7c7f430258&app=${key}`,
  getCddhConfig: () => `/cddh/config/app`,
  getCddhMsg: () => `/cddh/msg/current`,
  submitCddhAnswer: () => `/cddh/answer/do`
};
