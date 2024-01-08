			// создание pix сетки

function drawPixelGrid(pole_id, stepX, stepY) {
	let pole = document.getElementById(pole_id)
console.log('DEBUG:', pole);
	if (pole) {
		let maxX = Number(pole.getAttribute('width'));
		let maxY = Number(pole.getAttribute('height'));
		if (stepX && (stepX > 0)) {
			for(let x = 0; x < maxX; x = x + stepX) {
				let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
				line.setAttribute('x1', String(x));
				line.setAttribute('x2', String(x));
				line.setAttribute('y1', '0');
				line.setAttribute('y2', String(maxY));
				line.setAttribute('stroke', 'red');
				pole.appendChild(line);
				let txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
				txt.setAttribute('y', '100');
				txt.setAttribute('x', String(x));
				txt.style.fill = 'red';
				txt.style.font = 'Arial';
				txt.style.fontSize = '20';
				txt.innerHTML = String(x);
				pole.appendChild(txt);
			};
		};
		if (stepY && (stepY > 0)) {
			for(let y = 0; y < maxY; y = y + stepY) {
				let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
				line.setAttribute('y1', String(y));
				line.setAttribute('y2', String(y));
				line.setAttribute('x1', '0');
				line.setAttribute('x2', String(maxX));
				line.setAttribute('stroke', 'red');
				pole.appendChild(line);
				let txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
				txt.setAttribute('x', '100');
				txt.setAttribute('y', String(y));
				txt.style.fill = 'red';
				txt.style.font = 'Arial';
				txt.style.fontSize = '20';
				txt.innerHTML = String(y);
				pole.appendChild(txt);
			};
		};
	};
}


let requestJSON;
// управление 
function getControl(element_id, command) {
	requestJSON = {
		'id':element_id,
		'command': command
	};
	let req = new XMLHttpRequest();
	req.open("GET", "control?controljson=" + JSON.stringify(requestJSON));
	req.onreadystatechange = function() {
		if(this.readyState === 4 && this.status === 200) {
			elementStatus = JSON.parse(this.response);
			let elem = document.getElementById(elementStatus.id);
			if (elem.getAttribute('data-type') === 'cell'){
				if (elementStatus.status === 'on') {
					elem.href.baseVal ='#line_cell';
				}
				else {
					elem.href.baseVal ='#line_cell_off';
				};
			};
		};
	};
	req.send();
};
// параметры
function getParameters() {
	setInterval(
		function() {
			var req = new XMLHttpRequest();
			req.open("GET", "parameters?");
			req.onreadystatechange = function() {
				if(this.readyState === 4 && this.status === 200) {
					parameters = JSON.parse(this.response);
					for(let i=0; i < parameters.length; i++) {
						let elem = document.getElementById(parameters[i].id);
						if(elem) {
							if (elem.getAttribute('data-type') === 'cell'){
								if (parameters[i].value === 'on') {
									elem.href.baseVal ='#line_cell';
								}
								else {
									elem.href.baseVal ='#line_cell_off';
								};
							}
							else {
								elem.innerHTML = parameters[i].value;
							};
						};
					};
				};
			};
			req.send();
		}, 
		5000
	);
}

getParameters();

