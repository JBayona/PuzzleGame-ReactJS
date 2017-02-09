import React from "react";


class Tile extends React.Component{
	constructor(props){
		super(props);
		/*this.state = {
			tiles: props.tiles 
		};*/
	}
	clickHandler(e){
		//console.log(this);
		this.props.tileClick(e.target, this.props.position, this.props.status)
		//console.log(e.target);
	}
	render(){
		const backColor = this.props.status === '' ? {backgroundColor: "black"} : {backgroundColor: "white",borderStyle: "outset", borderColor: "#D8D8D8"};
		return (
			<div className="tile button btn" style={backColor} onClick={this.clickHandler.bind(this)}>{this.props.status}</div>
		);
	}
}

export default Tile;