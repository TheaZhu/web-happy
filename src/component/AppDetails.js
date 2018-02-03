/**
 * @author zhuyaqin thea.zhu@foxmail.com
 */

import React, { Component } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import { get } from '../util/service';
import uris from '../util/uris';
import AppsData from '../const/AppsData';

import { Switch } from 'antd';
import './AppDetails.less';

const Flag = {
  sogou: 's',
  crop: 'c'
};

const wdcallback = 'jQuery321';
const emptyHtmlCode = '<!DOCTYPE html>\n' +
  '<html lang="zh-CN">' +
  '</html>';

export class AppDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      order: 0,
      title: '',
      sogouTitle: 0,
      sogouAnswer: '',
      sogouOptions: [],
      cropTitle: 0,
      cropAnswerIndex: -1,
      cropOptions: [],
      danSrcDoc: emptyHtmlCode
    };
    this.questions = {};
    this.searchOpend = false;
    this.onSearchChange = this.onSearchChange.bind(this);
    this.getData = this.getData.bind(this);
    this.parseSogouData = this.parseSogouData.bind(this);
    this.parseCropData = this.parseCropData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  onSearchChange(checked) {
    this.searchOpend = checked;
  }

  searchQuestion(problem) {
    if (this.searchOpend && !this.questions[problem]) {
      this.questions[problem] = true;
      window.open(`https://www.baidu.com/s?wd=${problem}`);
    }
  }

  render() {
    const { key: appKey, title: appTitle } = this.props.app;
    const { order, title, sogouAnswer, sogouOptions, cropAnswerIndex, cropOptions, danSrcDoc } = this.state;
    const choices = sogouOptions.map(item => {
      const isResult = item === sogouAnswer;
      return {
        text: item,
        right: isResult && sogouAnswer ? [Flag.sogou] : [],
        wrong: !isResult && sogouAnswer ? [Flag.sogou] : []
      };
    });
    cropOptions.forEach((item, index) => {
      const ch = choices.find(ch => ch.text === item.title);
      const isResult = index === cropAnswerIndex;
      if (!ch) {
        choices.push({
          text: item.title,
          right: isResult && cropAnswerIndex >= 0 ? [Flag.crop] : [],
          wrong: !isResult && cropAnswerIndex >= 0 ? [Flag.crop] : []
        });
      } else if (isResult && !ch.right.includes(Flag.crop)) {
        ch.right.push(Flag.crop);
      } else if (!isResult && cropAnswerIndex >= 0 && !ch.wrong.includes(Flag.crop)) {
        ch.wrong.push(Flag.crop);
      }
    });
    const choiceItemCls = 'current-question-choices-item';
    const underway = appKey === 'cddh';
    return (
      <div className="app-details-root">
        <div className="app-details">
          <div className="app-details-toolbar">
            <Link to="/">
              <div className="app-details-toolbar-back"><span className="icon-back" /></div>
            </Link>
            <div className="app-details-toolbar-search">
              <Switch size="small" onChange={this.onSearchChange} />
              <span className="app-details-toolbar-search-text">百度搜索</span>
            </div>
          </div>
          <div className="app-session">
            <span className="app-title">{appTitle} 300万</span>
            <span className={`app-session-status ${underway ? 'app-session-underway' : 'app-session-next-time'}`}>
            {underway ? '进行中' : '20:00'}
          </span>
          </div>
          <div className="current-question">
            <div className="current-question-card">
              <div className="current-question-order">
                <div className="current-question-order-divider-left" />
                <span className="current-question-number">第<strong>{order}</strong>题</span>
                <div className="current-question-order-divider-right" />
              </div>
              <div className="current-question-desc">{title}</div>
              <div className="current-question-choices">
                {choices.map((item, index) => (
                  <div
                    key={index}
                    className={`${choiceItemCls} ${item.right.length > 0 ? `${choiceItemCls}-active` : ''}`}>
                    <span className={`${choiceItemCls}-text`}>{item.text}</span>
                    <span className={`${choiceItemCls}-flag`}>
                  {
                    item.wrong.map((_, index) => <span
                      key={`wrong_${index}`}
                      className={`${choiceItemCls}-flag-wrong icon-wrong`} />)
                  }
                      {
                        item.right.map((_, index) => <span
                          key={`right_${index}`}
                          className={`${choiceItemCls}-flag-right icon-right`} />)
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="app-details-dan">
          <iframe srcDoc={danSrcDoc} />
        </div>
      </div>
    );
  }

  getData() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    const { key, sogouKey, cropKey, danKey } = this.props.app;
    const timestamp = new Date().getTime();
    if (sogouKey) {
      this.fetchSogouData(key, sogouKey, timestamp);
    }
    if (cropKey) {
      this.fetchCropData(key, timestamp);
    }
    if (danKey) {
      // this.fetchDanData(key, danKey);
    }
    this.timeout = setTimeout(this.getData, 600);
  }

  fetchSogouData(appKey, sogouKey, timestamp) {
    get(uris.getAnsFromSogou(sogouKey, wdcallback, timestamp))
      .then(payload => this.parseSogouData(payload, appKey))
      .catch(e => console.log(e));
  }

  fetchCropData(appKey, timestamp) {
    get(uris.getAnsFromCrop(timestamp))
      .then(payload => this.parseCropData(payload, appKey))
      .catch(e => {});
  }

  fetchDanData(appKey, danKey) {
    get(uris.getAnsFromDan(danKey))
      .then(payload => {
        if (this.props.app.key === appKey && payload) {
          this.setState({ danSrcDoc: payload });
        }
      })
      .catch(e => console.log(e));
  }

  parseSogouData(payload, appKey) {
    if (this.props.app.key !== appKey || !payload.startsWith(wdcallback)) {
      return;
    }
    const length = wdcallback.length;
    const data = JSON.parse(payload.substr(length + 1, payload.length - length - 2));
    if (data.code !== 0 || !data.result) {
      return;
    }
    const question = JSON.parse(data.result[data.result.length - 1]);
    if (!question.title) {
      return;
    }
    const { key: oldKey, order, sogouTitle, sogouAnswer, cropTitle, cropAnswerIndex, cropOptions } = this.state;
    let number = 0;
    let problem = this.formatProblem(question.title);
    const index = problem.indexOf('.');
    if (index >= 0) {
      number = Number(problem.substr(0, index));
      problem = problem.substr(index + 1).trim();
    }
    this.searchQuestion(problem);
    if (!problem || (appKey === oldKey && (problem === sogouTitle && sogouAnswer === question.result) ||
        !question.answers.includes(question.result) || (number > 0 && order !== 12 && number < order))) {
      return;
    }
    const clearCrop = appKey !== oldKey || cropTitle !== problem;
    this.setState({
      key: appKey,
      order: number,
      title: problem,
      sogouTitle: problem,
      sogouAnswer: question.result,
      sogouOptions: question.answers,
      cropTitle: clearCrop ? '' : cropTitle,
      cropAnswerIndex: clearCrop ? -1 : cropAnswerIndex,
      cropOptions: clearCrop ? [] : cropOptions
    });
  }

  parseCropData(payload, appKey) {
    const data = JSON.parse(payload);
    if (this.props.app.key !== appKey || data.status !== 0 || !data.data.title) {
      return;
    }
    const title = this.formatProblem(data.data.title);
    this.searchQuestion(title);
    const round = Number(data.data.round);
    const correct = Number(data.data.official || data.data.correct);
    const { key: oldKey, order, sogouTitle, sogouAnswer, sogouOptions, cropTitle, cropAnswerIndex } = this.state;
    if (appKey === oldKey && (title === cropTitle && cropAnswerIndex === correct ||
        (order > 0 && order !== 12 && round < order))) {
      return;
    }
    const clearSogou = appKey !== oldKey || sogouTitle !== title;
    const options = data.data.options.filter(item => !item.title.startsWith('NONE_') || item.score > 0);
    this.setState({
      key: appKey,
      order: round,
      title: title,
      sogouTitle: clearSogou ? '' : sogouTitle,
      sogouAnswer: clearSogou ? '' : sogouAnswer,
      sogouOptions: clearSogou ? [] : sogouOptions,
      cropTitle: title,
      cropAnswerIndex: correct,
      cropOptions: options
    });
  }

  formatProblem(title) {
    return title.replace('"', '“');
  }

}

AppDetails.propTypes = {
  app: PropType.object.isRequired
};

AppDetails.defaultProps = {
  app: AppsData[0]
};
