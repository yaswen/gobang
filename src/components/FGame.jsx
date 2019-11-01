import React, { Component } from 'react';
import FBoard from './FBoard';
import { message, Button, Menu, Dropdown, Icon, } from 'antd';
import PropTypes from 'prop-types';


//单个area的格式:{id:0,icon:unknown/0/1/2/3/4/5/6/7/8/bang/flag/wrong}
//areas,一个数组,每个元素是一个area.其中icon表示显示的图标,可以代表操作状态,是否点击过等.
// 考虑新增一个属性isMine,表示此块是不是雷.开始游戏时,随机放一些雷. TODO
// (进阶,点击第一块时,随机放雷) TODO
//

//新游戏构思
//五子棋
//棋盘固定15*15，最好是可以下棋下在线上
//先做同机对弈，后做人机对弈
//同机对弈很简单，就是把规则实现。
//按一下，白棋，按一下黑棋，按完，从按的地方往周围8个方向找，5个连起来了就获胜了
//人机对弈。需要一定的算法，留好口子，后面再想。
//
//单个area的格式：{id:0,icon:0/b/w} 0表示没有子，b表示黑子，w表示白子
//


class FGame extends Component {
	constructor() {
		super();
		this.startClick = this.startClick.bind(this);
		this.areaClick = this.areaClick.bind(this);//绑定this的指向~
		this.areaClick2 = this.areaClick2.bind(this);
		//this.sweep=this.sweep.bind(this);
		//this.bang = this.bang.bind(this);
		this.reset = this.reset.bind(this);
		//this.handleMenuClick = this.handleMenuClick.bind(this);
		let width = 15;
		let height = 15;
		let areas = new Array(width * height);
		let isMine = new Array(width * height);
		isMine.fill(false);
		for (let i = 0; i < areas.length; i++) {
			areas[i] = { id: i, icon: "0" };
		}
		this.state = {
			// defaultWidth: 15,
			// defaultHeight: 15,
			//defaultMinesNum: 60,
			width: 15,
			height: 15,
			areas: areas,
			gameStatus: 'yes',
			isMine: isMine,
			minesNum: 10,
			next: "b"//黑棋先手
		};
	}

	startClick() {
		console.log(`点击了 - 开始按钮`);

		this.setState({
			gameStatus: 'yes',
			next:"b",
		});
		//游戏开始
		this.reset();
	}

	//重置
	reset() {
		const { width, height } = this.state;
		console.log(`reset`);
		const areas = new Array(width * height);//重铸areas
		for (let i = 0; i < areas.length; i++) {
			areas[i] = { id: i, icon: '0' };
		}
		this.setState({
			areas: areas,
		});

	}

	areaClick(i) {
		console.log(`点击了 - ${i}号地块`);
		if (this.state.gameStatus === 'yes') {//判断游戏是否开始
			//area的格式{id:0,icon:0/w/b}
			if (this.state.areas[i].icon === '0') {
				//没点击过
				const { next, areas } = this.state;
				areas[i] = { id: i, icon: next };
				this.setState({
					next: next == "w" ? "b" : "w",
					areas: areas
				});

				//判断游戏是否结束
				const { width, height } = this.state;
				const proportion = height * width;//面积
				const directs = [1, width, width + 1, 1 - width];
				const neighborDefault = [
					0 - width - 1, 0 - width, 0 - width + 1,
					-1, 1,
					width - 1, width, width + 1
				];
				const neighborOfLeft = [
					0 - width, 0 - width + 1, 1, width, width + 1
				];
				const neighborOfRight = [
					0 - width - 1, 0 - width, -1, width - 1, width
				];

				const check = (t, dir) => {
					let sum = 1;
					for (let s = 1; s < 5; s++) {
						const x = t + s * dir;//正方向查找
						if (x % width < t % width || x<0 || x>=proportion ) {//超出棋盘了
							break;
						}
						if (areas[x].icon != next){
							break;
						}
						sum++;
					}
					for (let s = 1; s < 5; s++) {
						const x = t - s * dir;//反方向查找
						if (x % width > t % width || x<0 || x>=proportion ) {//超出棋盘了
							break;
						}
						if (areas[x].icon != next){
							break;
						}
						sum++;
					}
					//console.log(`${sum}子连珠`);
					return sum;
				}
				const maxLine=Math.max(check(i,1),check(i,width),check(i,1-width),check(i,1+width))
				console.log(`${maxLine}子连珠`)
				if(maxLine>=5){
					message.success(`五子连珠，${next=='w'?'白':'黑'}方获胜`);
					this.setState({gameStatus:'no'});
				}
				
			}
		} else {
			message.warning('游戏已结束');
			console.log(`但是游戏已结束，白点`);
		}
	}

	//鼠标右键 本游戏无鼠标右键事件
	areaClick2(i) {
		console.log(' ');
	}

	render() {
		console.log(`game - render`);
		//console.log(this.state.areas.toString());
		return (
			<div style={{ margin: 'auto auto', textAlign: 'center', padding: 24 }}>
				<div style={{ height: 32, margin: 12 }}>
					<Button type="default"   //按钮样式颜色
						//shape = "circle"　　//按钮圆角（默认为方形）
						onClick={this.startClick}
						style={{ margin: 'auto 8px' }}
					>
						{this.state.gameStatus === "no" ? '开始游戏' : '重新开始'}
					</Button>
				</div>
				<FBoard
					classname={'board'}
					width={this.state.width}
					height={this.state.height}
					areas={this.state.areas}
					// isMine={this.state.isMine}
					onClick={(i) => this.areaClick(i)}
					onClick2={(i) => this.areaClick2(i)}
				/>
			</div>
		);
	}
}


export default FGame;