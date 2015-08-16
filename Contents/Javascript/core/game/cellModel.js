var Cell = function (row, col, value) {
	this.row = row;
	this.col = col;
	this.value = value;

	this.updated = false;
	this.element = null;
};

Cell.prototype.clear = function () {
	if (this.element) {
		this.element.suicide();
		this.element = null;
	}
	this.value = null;
	this.updated = false;
};

Cell.prototype.refreshValue = function() {
	if (this.element) {
		this.element.content[0].setText(this.value);
	}
};

Cell.prototype.destroy = function () {
	if (this.element) {
		this.element.suicide();
		this.element = null;
	}
};