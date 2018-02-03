/**
 * @author zhuyaqin thea.zhu@foxmail.com
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppsData from '../const/AppsData';
import './AppList.less';

const App = {
  bwyx: 'bwyx',
  cddh: 'cddh',
  bwyj: 'bwyj',
  zscr: 'zscr',
  hjsm: 'hjsm',
  bwfw: 'bwfw',
  jstz: 'jstz'
};

export default class AppList extends Component {

  render() {
    //  ${item.key === 'cddh' ? 'app-item-active' : ''}
    //  ${item.key === 'cddh' ? 'icon-arrow-right-fill' : 'icon-arrow-right'}
    return (
      <div className="app-list">
        <div className="app-list-title">答题直播间</div>
        {AppsData.map(item => (
          <Link key={item.key} to={`/${item.key}`}>
            <div className={`app-item`}>
              <span className="app-item-title">
                {item.title}
                {item.affiliation ? `（${item.affiliation}）` : ''}
              </span>
              <span className={`app-item-arrow icon-arrow-right`} />
            </div>
          </Link>
        ))}
      </div>
    );
  }

}
