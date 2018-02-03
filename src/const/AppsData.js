/**
 * @author zhuyaqin thea.zhu@foxmail.com
 */

const AppsData = [
  { key: 'bwyx', title: '百万英雄', affiliation: '西瓜视频', sogouKey: 'xigua', cropKey: 'xigua', danKey: 'xiguashipin' },
  { key: 'cddh', title: '冲顶大会', sogouKey: 'cddh', danKey: 'chongdingdahui' },
  { key: 'bwyj', title: '百万赢家', affiliation: '花椒', sogouKey: 'huajiao', danKey: 'huajiao' },
  { key: 'zscr', title: '芝士超人', sogouKey: 'zscr', danKey: 'zhishichaoren' },
  { key: 'hjsm', title: '黄金十秒', sogouKey: 'hjsm' },
  { key: 'bwfw', title: '百万富翁', affiliation: '百度贴吧', danKey: 'tieba' },
  { key: 'jstz', title: '极速挑战', affiliation: '好看视频', danKey: 'haokan' }
];

export function findAppByKey(key) {
  return AppsData.find(item => item.key === key);
}

export default AppsData;
