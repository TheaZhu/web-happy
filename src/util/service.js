import request from 'superagent';

const DEFAULT_AJAX_TIMEOUT = 3000;
const DEFAULT_AJAX_TIMEOUT_POST = 30000;

/**
 * 最终发送AJAX请求的函数
 * @param url
 * @param method
 * @param body
 * @param resolve
 * @param reject
 * @private
 */
function sendRequest(url, method, body, resolve, reject) {
  const onRequestEnd = (err, res) => {
    if (err) {
      console.warn(err);
      reject({
        error: err,
        res
      });
    } else if (res.statusCode === 200) {
      let data = res.body;
      if (!data && res.text) {
        data = res.text;
      }
      resolve(data);
    } else {
      reject({
        error: {
          code: res.statusCode,
          message: res.statusText
        }
      });
    }
  };

  if (method === 'post') {
    request.post(url)
      .timeout(DEFAULT_AJAX_TIMEOUT_POST)
      .send(body)
      .end(onRequestEnd);
  } else {
    request.get(url)
      .timeout(DEFAULT_AJAX_TIMEOUT)
      .end(onRequestEnd);
  }
}

/**
 * AJAX GET
 * @param url
 * @returns {Promise}
 */
export function get(url) {
  return new Promise((resolve, reject) => {
    sendRequest(url, 'get', null, resolve, reject);
  });
}

/**
 * AJAX POST
 * @param url
 * @param jsonBody
 * @returns {Promise}
 */
export function post(url, jsonBody) {
  return new Promise((resolve, reject) => {
    sendRequest(url, 'post', JSON.stringify(jsonBody), resolve, reject);
  });
}
