import React, { Component } from 'react';
import Area from './Area';
import PropTypes from "prop-types";

class FBoard extends Component {
	constructor() {
		super();
	}
	render() {
		console.log(`board - render`);
		let width = this.props.width;
		let height = this.props.height;
		const styles = {
			board: {
				border: '1px solid',
				margin: 'auto auto',
				padding: 'auto auto',
				textAlign: 'center',
				width: width * 36 + 2,
				height: height * 36 + 2,
			}
		};
		const areas = this.props.areas;
		//const isMine = this.props.isMine;
		return (
			<div className="board" style={styles.board}>

				{areas.map(
					area => (
						<Area
							key={area.id}
							id={area.id}
							icon={area.icon}
							//im={isMine[area.id]}
							onClick={() => this.props.onClick(area.id)}
							onClick2={() => this.props.onClick2(area.id)}
						/>)
				)}
			</div>
		);
	}
}

//单个area的格式:{id:0,icon:unknown/0/1/2/3/4/5/6/7/8/bang/flag/wrong}



export default FBoard;