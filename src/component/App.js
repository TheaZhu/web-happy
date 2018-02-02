import React, { Component } from 'react';

import { get, post } from '../util/service';
import uris from '../util/uris';

import './App.less';

const prefixCls = 'app';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
    
    this.questions = {};
    
    this.fetchMsg = this.fetchMsg.bind(this);
    this.interval = setInterval(this.fetchMsg, 1000);
  }
  
  fetchConfig() {
  }
  
  fetchMsg() {
    get(uris.getCddhMsg())
      .then(payload => {
        const data = payload;
        if (data.data && data.data.event) {
          const event = data.data.event;
          if (event.type === 'showAnswer' && !this.questions[event.displayOrder]) {
            console.log(event.desc);
            this.submitAnswer(event.displayOrder + 1, event.correctOption, event.questionId);
            const options = JSON.parse(event.options);
            console.log(options[event.correctOption]);
            this.questions[event.displayOrder] = true;
          }
        }
      })
      .catch(error => console.log(error));
  }
  
  submitAnswer(displayOrder, option, questionId) {
    post(uris.submitAnswer(), {
      option,
      questionId
    })
      .then(payload => {
        const { questions } = this.state;
        if (payload.data.selected === -1) {
          console.log('答题失败');
          questions.push({
            order: displayOrder,
            state: '答题失败'
          });
          clearInterval(this.interval);
        } else {
          console.log('答题成功');
          questions.push({
            order: displayOrder,
            state: '答题成功'
          });
        }
        this.setState({ questions });
      })
      .catch(error => console.log(error));
  }
  
  render() {
    const { questions } = this.state;
    return (
      <div className={`${prefixCls}`}>
        {questions.map(item => <div className="question-item">
          <span className="question-item-order">{item.order}</span>
          <span className="question-item-state">{item.state}</span>
        </div>)}
      </div>
    );
  }
}

