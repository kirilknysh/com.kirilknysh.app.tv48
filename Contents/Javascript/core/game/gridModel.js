include('Javascript/core/game/cellModel.js');

var MAX_GRID_HEIGHT = 650,//TODO: parametrize in constructor through view size
	CELL_GAP_PER_CENT = 0.05;

var Grid = function (rows, cols) {
	this.init(rows, cols);
};

Grid.prototype.init = function (rows, cols) {
	this.rows = rows;
	this.cols = cols;
	this.freeCells = [];

	this.model = new Array(rows);

	for (var i = 0; i < rows; i++) {
		this.model[i] = new Array(cols);
		for (var j = 0; j < cols; j++) {
			this.model[i][j] = new Cell(i, j, null);
			this.freeCells.push(i * cols + j);
		}
	}

	this.calculateRects(rows, cols);
};

Grid.prototype.generateCells = function (amount, value) {
	var randIndex, combinedIndex,
		targetRow, targetCol, cell;

	for (var i = 0; i < amount; i++) {
		randIndex = Math.round(Math.random() * (this.freeCells.length - 1));
		combinedIndex = this.freeCells[randIndex];
		this.freeCells.splice(randIndex, 1);

		targetRow = (combinedIndex / this.cols)|0;
		targetCol = combinedIndex % this.cols;

		cell = this.model[targetRow][targetCol];
		cell.value = value;
		this.fire('addCell', cell);

		this.refreshCells();
	}
};

Grid.prototype.calculateRects = function (rows, cols) {
	this.cellHeight = Math.floor(MAX_GRID_HEIGHT / (rows + CELL_GAP_PER_CENT * (rows + 1)));
	this.cellWidth = this.cellHeight;
	this.cellGap = Math.floor(CELL_GAP_PER_CENT * this.cellHeight);

	this.gridWidth = this.cellWidth * cols + (cols + 1) * this.cellGap;
	this.gridHeight = this.cellHeight * rows + (rows + 1) * this.cellGap;
};

Grid.prototype.setCellElement = function (row, col, element) {
	var cell = this.model[row][col];

	cell.element = element;
	cell.refreshValue();
};

Grid.prototype.refreshCells = function() {
	this.freeCells.length = 0;

	for (var i = 0; i < this.rows; i++) {
		for (var j = 0; j < this.cols; j++) {
			this.model[i][j].updated = false;
			if (!this.model[i][j].value) {
				this.freeCells.push(i * this.cols + j);
			}
		}
	}
};

Grid.prototype.navigate = function (direction, cb) {
	if (direction === 'left') {
		this._navigateLeft(cb);
	} else if (direction === 'right') {
		this._navigateRight(cb);
	} else if (direction === 'down') {
		this._navigateDown(cb);
	} else if (direction === 'up') {
		this._navigateUp(cb);
	}
};

Grid.prototype._navigateLeft = function (cb) {
	var cell, targetCell,
		grid = this,
		animationsCount = 0;

	function __onAnimationEnd__() {
		animationsCount--;
		if (animationsCount === 0) {
			grid.refreshCells();
			cb();
		}
	}

	for (var j = 1; j < this.cols; j++) {
		for (var i = 0; i < this.rows; i++) {
			cell = this.model[i][j];

			if (!cell.value) {
				//skip empty cells;
				continue;
			}

			for (var k = j - 1; k >= 0; k--) {
				targetCell = this.model[i][k];

				if (!targetCell.value) {
					//empty cell, move on
					continue;
				}

				if (targetCell.updated || targetCell.value !== cell.value) {
					//we met the cell that was already updated in scope of this round
					//or cell with value different from the current cell;
					//take the previous cell;
					targetCell = this.model[i][k + 1];
					break;
				}

				if (targetCell.value === cell.value) {
					//sum up cells as they have the same values;
					break;
				}
			}

			if (targetCell === cell) {
				//the same cells => do nothing
				continue;
			}

			if (targetCell.value === cell.value) {
				targetCell.value += cell.value;
				targetCell.updated = true;
			} else {
				targetCell.value = cell.value;
			}
			cell.value = null;
			animationsCount++;
			this.animateCell(cell, targetCell, __onAnimationEnd__);
		}
	}
};

Grid.prototype._navigateRight = function (cb) {
	var cell, targetCell,
		grid = this,
		animationsCount = 0;

	function __onAnimationEnd__() {
		animationsCount--;
		if (animationsCount === 0) {
			grid.refreshCells();
			cb();
		}
	}

	for (var j = this.cols - 2; j >= 0; j--) {
		for (var i = 0; i < this.rows; i++) {
			cell = this.model[i][j];

			if (!cell.value) {
				//skip empty cells;
				continue;
			}

			for (var k = j + 1; k < this.cols; k++) {
				targetCell = this.model[i][k];

				if (!targetCell.value) {
					//empty cell, move on
					continue;
				}

				if (targetCell.updated || targetCell.value !== cell.value) {
					//we met the cell that was already updated in scope of this round
					//or cell with value different from the current cell;
					//take the previous cell;
					targetCell = this.model[i][k - 1];
					break;
				}

				if (targetCell.value === cell.value) {
					//sum up cells as they have the same values;
					break;
				}
			}

			if (targetCell === cell) {
				//the same cells => do nothing
				continue;
			}

			if (targetCell.value === cell.value) {
				targetCell.value += cell.value;
				targetCell.updated = true;
			} else {
				targetCell.value = cell.value;
			}
			cell.value = null;
			animationsCount++;
			this.animateCell(cell, targetCell, __onAnimationEnd__);
		}
	}
};

Grid.prototype._navigateDown = function(cb) {
	var cell, targetCell,
		grid = this,
		animationsCount = 0;

	function __onAnimationEnd__() {
		animationsCount--;
		if (animationsCount === 0) {
			grid.refreshCells();
			cb();
		}
	}

	for (var i = this.rows - 2; i >= 0; i--) {
		for (var j = 0; j < this.cols; j++) {
			cell = this.model[i][j];

			if (!cell.value) {
				//skip empty cells;
				continue;
			}

			for (var k = i + 1; k < this.rows; k++) {
				targetCell = this.model[k][j];

				if (!targetCell.value) {
					//empty cell, move on
					continue;
				}

				if (targetCell.updated || targetCell.value !== cell.value) {
					//we met the cell that was already updated in scope of this round
					//or cell with value different from the current cell;
					//take the previous cell;
					targetCell = this.model[k - 1][j];
					break;
				}

				if (targetCell.value === cell.value) {
					//sum up cells as they have the same values;
					break;
				}
			}

			if (targetCell === cell) {
				//the same cells => do nothing
				continue;
			}

			if (targetCell.value === cell.value) {
				targetCell.value += cell.value;
				targetCell.updated = true;
			} else {
				targetCell.value = cell.value;
			}
			cell.value = null;
			animationsCount++;
			this.animateCell(cell, targetCell, __onAnimationEnd__);
		}
	}
};

Grid.prototype._navigateUp = function (cb) {
	var cell, targetCell,
		grid = this,
		animationsCount = 0;

	function __onAnimationEnd__() {
		animationsCount--;
		if (animationsCount === 0) {
			grid.refreshCells();
			cb();
		}
	}

	for (var i = 1; i < this.rows; i++) {
		for (var j = 0; j < this.cols; j++) {
			cell = this.model[i][j];

			if (!cell.value) {
				//skip empty cells;
				continue;
			}

			for (var k = i - 1; k >= 0; k--) {
				targetCell = this.model[k][j];

				if (!targetCell.value) {
					//empty cell, move on
					continue;
				}

				if (targetCell.updated || targetCell.value !== cell.value) {
					//we met the cell that was already updated in scope of this round
					//or cell with value different from the current cell;
					//take the previous cell;
					targetCell = this.model[k + 1][j];
					break;
				}

				if (targetCell.value === cell.value) {
					//sum up cells as they have the same values;
					break;
				}
			}

			if (targetCell === cell) {
				//the same cells => do nothing
				continue;
			}

			if (targetCell.value === cell.value) {
				targetCell.value += cell.value;
				targetCell.updated = true;
			} else {
				targetCell.value = cell.value;
			}
			cell.value = null;
			animationsCount++;
			this.animateCell(cell, targetCell, __onAnimationEnd__);
		}
	}
};

Grid.prototype.animateCell = function(source, target, cb) {
	var cellToUtilize = null;

	if (source.element) {
		source.element.animate({
			duration: 0.5,
			vOffset: this.cellGap + (target.row * (this.cellHeight + this.cellGap)),
			hOffset: this.cellGap + (target.col * (this.cellWidth + this.cellGap))
		});

		if (!target.element) {
			target.element = source.element;
		} else {
			cellToUtilize = source.element;
		}

		(function __cellAnimationEnd__() {
			if (cellToUtilize) {
				cellToUtilize.suicide();
				cellToUtilize = null;
			}
			target.updated = false;
			target.refreshValue();
			cb();
		}).subscribeOnce(source.element, 'onAnimationEnded');

		source.element = null;
	}
};

Grid.prototype.destroy = function () {
	for (var i = 0; i < this.rows; i++) {
		for (var j = 0; j < this.cols; j++) {
			this.model[i][j].destroy();
		}
	}
};
