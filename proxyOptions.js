/**
 * @author zhuyaqin thea.zhu@foxmail.com
 */

module.exports = {
  sogou: {
    target: 'http://140.143.49.31',
    changeOrigin: true,
    headers: {
      'Host': '140.143.49.31',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 7.0; MI 5 Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/59.0.3071.125 Mobile Safari/537.36 SogouSearch Android1.0 ' +
      'version3.0 AppVersion/5909',
      'Accept': '*/*',
      'Referer': 'http://nb.sa.sogou.com/',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,en-US;q=0.8',
      'X-Requested-With': 'com.sogou.activity.src'
    },
    pathRewrite: {
      '^/sogou/api': '/api'
    }
  },
  crop: {
    target: 'http://crop-answer.sm.cn',
    changeOrigin: true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
      'Accept': 'application/json',
      'Referer': 'http://crop-answer.sm.cn/answer/index?activity=million&from=smball',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'en,zh-CN;q=0.9,zh;q=0.8',
      'Connection': 'keep-alive',
      'Cookie': 'sm_uuid=48c0fc0556a65d2be204f6b7db190abd%7C%7C%7C1516102039; sm_diu=48c0fc0556a65d2be204f6b7db190abd%7C%7C1Fe0ff734542fe884b%7C1516102039',
      'DNT': 1,
      'X-Requested-With': 'XMLHttpRequest'
    },
    pathRewrite: {
      '^/crop/answer': '/answer'
    },
    cookieDomainRewrite: {
      sm_uuid: '48c0fc0556a65d2be204f6b7db190abd%7C%7C%7C1516102039',
      sm_diu: '48c0fc0556a65d2be204f6b7db190abd%7C%7C1Fe0ff734542fe884b%7C1516102039'
    }
  },
  dan: {
    target: 'https://secr.baidu.com',
    changeOrigin: true,
    headers: {
      'user-agent': 'Mozilla/5.0 (Linux; Android 7.0; MI 5 Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/48.0.2564.116 Mobile Safari/537.36 T7/9.3 ' +
      'SearchCraft/1.7.1 (Baidu; P1 7.0)',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'upgrade-insecure-requests': 1,
      'referer': 'https://secr.baidu.com/entry?status=1-1-1-1-1-1&version=7',
      'cookie': 'BAIDUID=656BD4BD34050EEFB2D4AECEBAC3FF91:FG=1;io=6U-8ILlpGFcOj2Mbg0Jw;BAIDUCUID=guSkaYOSH8_oiS8rlu-Lu0OLv80ZiviXlavIa_adH88qa2tg_Pvii_uH28gEP2fHA;' +
      'BAIDULOC=0.0_0.0_1000_null_1517376282412',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'zh-CN,en-US;q=0.8'
    },
    pathRewrite: {
      '^/dan/answer': '/answer'
    },
    cookieDomainRewrite: {
      'BAIDUID': '656BD4BD34050EEFB2D4AECEBAC3FF91:FG=1',
      'io': '6U-8ILlpGFcOj2Mbg0Jw',
      'BAIDUCUID': 'guSkaYOSH8_oiS8rlu-Lu0OLv80ZiviXlavIa_adH88qa2tg_Pvii_uH28gEP2fHA',
      'BAIDULOC': '0.0_0.0_1000_null_1517376282412'
    }
  },
  config: {
    target: 'https://conf.api.chongdingdahui.com',
    changeOrigin: true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 7.0; MI 5 Build/NRD81M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/59.0.3071.125 Mobile Safari/537.36',
      'X-Live-App-Version': '1.1.4',
      'X-Live-Device-Type': 'android',
      'X-Live-Session-Token': '1.19373008.2388600.pQR.02240f45b33c0284955eaf4f9c3fb20f'
    },
    pathRewrite: {
      '^/cddh/conf': '/conf'
    }
  },
  user: {
    target: 'http://user.api.chongdingdahui.com',
    changeOrigin: true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 7.0; MI 5 Build/NRD81M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/59.0.3071.125 Mobile Safari/537.36',
      'X-Live-App-Version': '1.1.4',
      'X-Live-Device-Type': 'android',
      'X-Live-Session-Token': '1.19373008.2388600.pQR.02240f45b33c0284955eaf4f9c3fb20f'
    },
    pathRewrite: {
      '^/cddh/user': '/user'
    }
  },
  msg: {
    target: 'http://msg.api.chongdingdahui.com',
    changeOrigin: true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 7.0; MI 5 Build/NRD81M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/59.0.3071.125 Mobile Safari/537.36',
      'X-Live-App-Version': '1.1.4',
      'X-Live-Device-Type': 'android',
      'X-Live-Session-Token': '1.19373008.2388600.pQR.02240f45b33c0284955eaf4f9c3fb20f'
    },
    pathRewrite: {
      '^/cddh/msg': '/msg'
    }
  },
  answer: {
    target: 'http://answer.api.chongdingdahui.com',
    changeOrigin: true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 7.0; MI 5 Build/NRD81M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/59.0.3071.125 Mobile Safari/537.36',
      'X-Live-App-Version': '1.1.4',
      'X-Live-Device-Type': 'android',
      'X-Live-Session-Token': '1.19373008.2388600.pQR.02240f45b33c0284955eaf4f9c3fb20f'
    },
    pathRewrite: {
      '^/cddh/answer': '/answer'
    }
  }
};
