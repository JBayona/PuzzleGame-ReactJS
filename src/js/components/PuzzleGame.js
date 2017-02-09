import React from "react";
import Tile from "./Tile";
import Title from "./Title";


class PuzzleGame extends React.Component{
	constructor(){
		super();
		this.state = {
			tiles : this.shuffle([1,2,3,4,5,6,7,8,'']),
			blank : 0
		};
	}
	componentDidMount(){
		var self = this;
		self.setState({
			blank : this.state.tiles.indexOf('')
		});
		window.addEventListener("keydown", function(event){
			//console.log(event.keyCode);
			//console.log(self.state);
			self.checkKey(event.keyCode);
		});
	}
	shuffle(gameArray){
		let array = this.fischerYates(gameArray);
		//Check for the even number of inversions
		if(this.countInversion(array) % 2 !== 0){
			//Switch two tiles if odd
			array = this.switchTiles(array);
		}
		//At this point we have a random sort game
		return array;
	}
	switchTiles(array){ //Swithes the first two tiles
		let i = 0;
		let tile;
		while(!array[i] || !array[i+1]) i++; //Need to find the first two tiles in the row
		//Store the tile value
		tile = array[i];
		//Swap
		array[i] = array[i+1];
		array[i+1] = tile;
		return array;
	}
	countInversion(array){
		//Array of inversions
		let inversionArray = array.map((num,index) => {
			let inversions = 0;
			for(let i = index + 1; i < array.length; i++){
				if(array[i] && array[i] < num){
					inversions++;
				}
			}
			return inversions;
		});
		//Sum of inversions array
		return inversionArray.reduce((prev,curr) => prev+=curr);
	}
	//Fischer Yates Algorithm
	fischerYates(array){
		let counter = array.length, temp, index;
		//While we have elements in the array
		while(counter > 0){
			//Lets take a random index
			index = Math.floor(Math.random() * counter);
			counter --;
			//Swap the last element with it
			temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}
		return array;
	}
	titleClick(tileEl, index, status, isKey){
		//console.log(this);
		let tiles = this.state.tiles;
		let blank = this.state.blank;
		//Allowed moves [up,right,down,left], 9 means out of bounds
		let moves = [
                [null,1,3,null],[null,2,4,0],[null,null,5,1],
                [0,4,6,null],   [1,5,7,3],   [2,null,8,4],
                [3,7,null,null],[4,8,null,6],[5,null,null,7]
        ];
        // check possible moves
        for (let i = 0; i < moves[index].length; i++) {
            var move = moves[index][i];
            // if an adjacent tile is empty
            if (typeof move === 'number' && !tiles[move]) {
                moveTiles(i, move);
                setTimeout(afterMoved.bind(this), 200);
                break;
            }
        }
        function moveTiles(i, move){
			let directions = ['up','right','down','left'];
			let moveToEl = document.querySelector('.tile:nth-child(' + (move + 1) + ')');
	        let direction = directions[i];
	        tileEl.classList.add('move-' + direction);
	        setTimeout(function() {
	   			if(isKey){
	        		tileEl.classList.remove('customSlide');
	        	}
	            tileEl.classList.remove('move-' + direction);
	        }, 200); 
		}

		function afterMoved(){
			tiles[index] = '';
	        tiles[move] = status;
	        this.setState({
	            tiles: tiles,
	            moves: moves,
	            blank : index
	        });
		}
	}
	checkKey(key, space){
		let tiles = this.state.tiles;
		let blank = this.state.blank;
		let element;
		let index;
		let status;
		//Allowed moves [up,right,down,left], 9 means out of bounds
		let moves = [
                [null,1,3,null],[null,2,4,0],[null,null,5,1],
                [0,4,6,null],   [1,5,7,3],   [2,null,8,4],
                [3,7,null,null],[4,8,null,6],[5,null,null,7]
        ];
        //UP
        if(key === 38){
        	element = this.getDOMElement(moves[blank][2])
        	index = moves[blank][2];
        }else if(key == 37){ //Left
        	element = this.getDOMElement(moves[blank][1])
        	index = moves[blank][1];
        }else if(key == 39){ //Right
        	element = this.getDOMElement(moves[blank][3])
        	index = moves[blank][3];
        }else if(key == 40){ //Down
        	element = this.getDOMElement(moves[blank][0])
        	index = moves[blank][0];
        }
        status = tiles[index];
        element.classList.add('customSlide');
        this.titleClick(element, index, status, true); 
	}
	getDOMElement(index){
		let element = document.getElementById('game-board').children[0].children[index];
		return element;
	}
	render(){
		//console.log(this.state.tiles);
		const Tiles = this.state.tiles.map((tile, index) => <Tile key={index} position={index} tiles={this.state.tiles} status={tile} tileClick={this.titleClick.bind(this)}/>)
		return (
			<div>
				<div id="game-board">
					<div>{Tiles}</div>
					<Title/>
				</div>
			</div>
		);
	}
}

export default PuzzleGame;