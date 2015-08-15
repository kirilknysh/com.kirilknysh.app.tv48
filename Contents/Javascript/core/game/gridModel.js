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
			this.model[i][j] = null;//Full fill with custom objects
			this.freeCells.push(i * cols + j);
		}
	}

	this.calculateRects(rows, cols);
};

Grid.prototype.generateCells = function (amount, value) {
	var randIndex, combinedIndex,
		targetRow, targetCol;

	for (var i = 0; i < amount; i++) {
		randIndex = Math.round(Math.random() * (this.freeCells.length - 1));
		combinedIndex = this.freeCells[randIndex];
		this.freeCells.splice(randIndex, 1);

		targetRow = (combinedIndex / this.cols)|0;
		targetCol = combinedIndex % this.cols;

		this.fire('addCell', { row: targetRow, col: targetCol, value: value });
	}
};

Grid.prototype.calculateRects = function (rows, cols) {
	this.cellHeight = Math.floor(MAX_GRID_HEIGHT / (rows + CELL_GAP_PER_CENT * (rows + 1)));
	this.cellWidth = this.cellHeight;
	this.cellGap = Math.floor(CELL_GAP_PER_CENT * this.cellHeight);

	this.gridWidth = this.cellWidth * cols + (cols + 1) * this.cellGap;
	this.gridHeight = this.cellHeight * rows + (rows + 1) * this.cellGap;
};