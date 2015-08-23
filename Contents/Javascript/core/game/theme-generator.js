var ThemeGenerator = {
	config: {
		2: { tileColor: '#7aba7a', fontSizeFactor: 1 },
		4: { tileColor: '#46a646', fontSizeFactor: 1 },
		8: { tileColor: '#2a812a', fontSizeFactor: 1 },
		16: { tileColor: '#156515', fontSizeFactor: 1 },
		32: { tileColor: '#074007', fontSizeFactor: 0.85 },
		64: { tileColor: '#ffcc00', fontSizeFactor: 0.85 },
		128: { tileColor: '#ffa200', fontSizeFactor: 0.68 },
		256: { tileColor: '#ff8400', fontSizeFactor: 0.58 },
		512: { tileColor: '#ff5500', fontSizeFactor: 0.68 },
		1024: { tileColor: '#ff2b00', fontSizeFactor: 0.5 },
		2048: { tileColor: '#b76eb8', fontSizeFactor: 0.5 },
		4096: { tileColor: '#984399', fontSizeFactor: 0.5 },
		8192: { tileColor: '#641b66', fontSizeFactor: 0.5 },
		16384: { tileColor: '#3c093e', fontSizeFactor: 0.38 },
		32768: { tileColor: '#c0a172', fontSizeFactor: 0.38 },
		65536: { tileColor: '#836b46', fontSizeFactor: 0.38 },
		131072: { tileColor: '#614d2f', fontSizeFactor: 0.3 },
		262144: { tileColor: '#3e2f1b', fontSizeFactor: 0.3 },
		524288: { tileColor: '#ec799a', fontSizeFactor: 0.3 },
		1048576: { tileColor: '#c01c61', fontSizeFactor: 0.25 },
		2097152: { tileColor: '#a00b5b', fontSizeFactor: 0.25 },
		
		4194304: { tileColor: '#9f9f9f', fontSizeFactor: 0.25 },
		8388608: { tileColor: '#989898', fontSizeFactor: 0.25 },
		16777216: { tileColor: '#8f8f8f', fontSizeFactor: 0.20 },
		33554432: { tileColor: '#888888', fontSizeFactor: 0.20 },
		67108864: { tileColor: '#7f7f7f', fontSizeFactor: 0.20 },
		134217728: { tileColor: '#787878', fontSizeFactor: 0.18 },
		268435456: { tileColor: '#6f6f6f', fontSizeFactor: 0.18 },
		536870912: { tileColor: '#606060', fontSizeFactor: 0.18 },
		1073741824: { tileColor: '#525252', fontSizeFactor: 0.17 },
		2147483648: { tileColor: '#454545', fontSizeFactor: 0.17 },
		4294967296: { tileColor: '#3a3a3a', fontSizeFactor: 0.16 },
		8589934592: { tileColor: '#303030', fontSizeFactor: 0.16 },
		17179869184: { tileColor: '#212121', fontSizeFactor: 0.17 },
		34359738368: { tileColor: '#131313', fontSizeFactor: 0.16 },
		68719476736: { tileColor: '#050505', fontSizeFactor: 0.16 }
	},

	generateCellsStyles: function (cellSize) {
		var baseFontSize = cellSize / 1.3,
			availableNumbers = Object.keys(this.config),
			num, conf, styleObj;

		for (var i = 0; i < availableNumbers.length; i++) {
			num = availableNumbers[i];
			conf = this.config[num];
			styleObj = {};

			styleObj['CellBackground_' + num] = {
				styles: {
					backgroundColor: conf.tileColor,
					fontSize: baseFontSize * conf.fontSizeFactor
				}
			};

			Theme.set(styleObj);
		}
	}
};