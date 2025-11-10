// Build UI and inject styles, then run p5 sketch
// Inject CSS and HTML into the page so index.html can be minimal.

function buildUI() {
	const css = `
		@font-face {
			font-family: 'ChironGoRoundTC';
			src: url('fonts/ChironGoRoundTC-VariableFont_wght.ttf') format('truetype');
			font-weight: 100 900;
			font-style: normal;
		}
		* { margin: 0; padding: 0; box-sizing: border-box; }
		body { font-family: 'Arial', sans-serif; overflow: hidden; }
		#container { display: flex; height: 100vh; }
		#sidebar { width: 280px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 30px 20px; overflow-y: auto; box-shadow: 4px 0 20px rgba(0,0,0,0.3); z-index: 10; }
		#sidebar h1 { font-family: 'ChironGoRoundTC', Arial, sans-serif; font-size: 40px; margin-bottom: 10px; color: #ff8c42; font-weight: 700; }
		#sidebar .subtitle { font-size: 12px; color: #aaa; margin-bottom: 30px; letter-spacing: 1px; }
		.menu-section { margin-bottom: 30px; }
		.menu-section h2 { font-size: 14px; color: #888; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 1.5px; font-weight: 600; }
		.menu-item { padding: 12px 15px; margin-bottom: 8px; background: rgba(255,255,255,0.05); border-radius: 8px; cursor: pointer; transition: all 0.3s ease; border-left: 3px solid transparent; }
		.menu-item:hover { background: rgba(255,255,255,0.1); border-left-color: #f1d302; transform: translateX(5px); }
		.menu-item.active { background: rgba(241,211,2,0.2); border-left-color: #f1d302; }
		.menu-item-title { font-size: 15px; font-weight: 600; margin-bottom: 3px; }
		.menu-item-desc { font-size: 11px; color: #aaa; }
		.submenu { display: none; margin-top: 8px; padding-left: 12px; }
		.menu-item.open .submenu { display: block; }
		.submenu-item { padding: 8px 12px; margin-bottom: 6px; background: rgba(255,255,255,0.03); border-radius: 6px; font-size: 13px; color: #ddd; cursor: pointer; }
		.submenu-item:hover { background: rgba(255,255,255,0.06); transform: translateX(4px); }
		.submenu-item.sub-active { background: rgba(241,211,2,0.12); color: #fff; }
		#canvas-container { flex: 1; position: relative; background: #000; }
		#info-panel { position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.7); color: white; padding: 15px 20px; border-radius: 10px; font-size: 14px; backdrop-filter: blur(10px); }
		#info-panel h3 { color: #f1d302; margin-bottom: 8px; font-size: 16px; }
		.color-palette { display: flex; gap: 5px; margin-top: 10px; }
		.color-dot { width: 20px; height: 20px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3); }
		::-webkit-scrollbar { width: 8px; }
		::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
		::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
		::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
	`;

	const html = `
		<div id="container">
			<div id="sidebar">
				<h1>淡江大學</h1>
				<div class="subtitle">GENERATIVE ART COLLECTION</div>
				<div class="menu-section">
					<h2>作品系列</h2>
					<div class="menu-item active" data-work="grid">
						<div class="menu-item-title">動態方格 #01</div>
						<div class="menu-item-desc">幾何分割動畫</div>
					</div>
					<div class="menu-item" data-work="color">
						<div class="menu-item-title">色彩變奏 #02</div>
						<div class="menu-item-desc">配色隨機組合</div>
					</div>
					<div class="menu-item" data-work="rhythm">
						<div class="menu-item-title">韻律節奏 #03</div>
						<div class="menu-item-desc">時間軸變化</div>
					</div>
					<div class="menu-item" data-work="extra">
						<div class="menu-item-title">額外素材 #04</div>
						<div class="menu-item-desc">延伸範例與素材</div>
					</div>
				</div>
				<div class="menu-section">
					<h2>控制設定</h2>
					<div class="menu-item" data-work="settings">
						<div class="menu-item-title">參數調整</div>
						<div class="menu-item-desc">速度與網格設定</div>
					</div>
				</div>
				<div class="menu-section">
					<h2>關於</h2>
					<div class="menu-item" data-work="about">
						<div class="menu-item-title">創作理念</div>
						<div class="menu-item-desc">作品說明</div>
						<div class="submenu">
							<div class="submenu-item" data-sub="tku">淡江大學</div>
							<div class="submenu-item" data-sub="contact">聯絡方式</div>
						</div>
					</div>
				</div>
			</div>
			<div id="canvas-container">
				<div id="info-panel">
					<h3>動態方格 #01</h3>
					<p>8x8 網格系統<br>隨機色彩配置<br>緩動函數動畫</p>
					<div class="color-palette">
						<div class="color-dot" style="background: #235789;"></div>
						<div class="color-dot" style="background: #c1292e;"></div>
						<div class="color-dot" style="background: #f1d302;"></div>
						<div class="color-dot" style="background: #d67ab1;"></div>
						<div class="color-dot" style="background: #ff8c42;"></div>
					</div>
				</div>
			</div>
		</div>
	`;

	// inject styles and html
	const styleTag = document.createElement('style');
	styleTag.textContent = css;
	document.head.appendChild(styleTag);

	document.body.innerHTML = html;
}

// Build UI immediately
buildUI();

// --- Menu interaction handlers ---
function setupMenuHandlers() {
	document.querySelectorAll('.menu-item').forEach(item => {
		item.addEventListener('click', function() {
			// 清除其他項目的 active / open
			document.querySelectorAll('.menu-item').forEach(i => {
				i.classList.remove('active');
				i.classList.remove('open');
			});

			// 標示為 active
			this.classList.add('active');

			// 若此項目有 submenu，展開它
			if (this.querySelector('.submenu')) {
				this.classList.add('open');
			}
		});
	});

	// 處理子選單點擊
	document.querySelectorAll('.submenu-item').forEach(sub => {
		sub.addEventListener('click', function(e) {
			e.stopPropagation();
			document.querySelectorAll('.submenu-item').forEach(s => s.classList.remove('sub-active'));
			this.classList.add('sub-active');

			const key = this.getAttribute('data-sub');
			const infoPanel = document.querySelector('#info-panel');
			if (key === 'tku') {
				window.open('https://www.tku.edu.tw', '_blank');
			} else if (key === 'author') {
				infoPanel.querySelector('h3').textContent = '關於作者';
				infoPanel.querySelector('p').innerHTML = '作者：某某人<br>作品簡介與背景說明。';
			} else if (key === 'contact') {
				infoPanel.querySelector('h3').textContent = '聯絡方式';
				infoPanel.querySelector('p').innerHTML = 'Email: example@example.com<br>IG: @yourhandle';
			}
		});
	});
}

setupMenuHandlers();

// --- p5 sketch ---
let objs = [];
let colors = ['#235789', '#c1292e', '#f1d302', '#ffffff', '#d67ab1', '#ff8c42', '#81c14b', '#2e933c', '#e4572e', '#17bebb'];

function setup() {
	// create responsive canvas and parent to container created above
	const canvas = createCanvas(windowWidth - 280, windowHeight);
	canvas.parent('canvas-container');
	initGrid();
}

function initGrid() {
	objs = [];
	let c = 8;
	let w = width / c;
	for (let i = 0; i < c; i++) {
		for (let j = 0; j < c; j++) {
			let x = i * w + w / 2;
			let y = j * w + w / 2;
			objs.push(new OBJ(x, y, w));
		}
	}
}

function draw() {
	background(0);
	for (let i of objs) {
		i.run();
	}
}

function windowResized() {
	resizeCanvas(windowWidth - 280, windowHeight);
	initGrid();
}

function easeInOutExpo(x) {
	return x === 0
		? 0
		: x === 1
			? 1
			: x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
				: (2 - Math.pow(2, -20 * x + 10)) / 2;
}

class OBJ {
	constructor(x, y, w) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.cx = x;
		this.cy = y;
		this.init();
		this.cols = [];
		shuffle(colors, true);
		for (let i = 0; i < 4; i++) {
			this.cols.push(colors[i]);
		}
		this.t1 = 50;
	}

	show() {
		noStroke();
		let xx = this.x - (this.w / 2);
		let yy = this.y - (this.w / 2);
		let ww = this.cx - xx;
		let hh = this.cy - yy;
		let off = this.w * 0.1;
		let crr = this.w * 0.5;
		fill(this.cols[0]);
		rect(xx + (off / 2), yy + (off / 2), ww - off, hh - off, crr);
		fill(this.cols[1]);
		rect(xx + ww + (off / 2), yy + (off / 2), this.w - ww - off, hh - off, crr);
		fill(this.cols[2]);
		rect(this.cx + (off / 2), this.cy + (off / 2), this.w - ww - off, this.w - hh - off, crr);
		fill(this.cols[3]);
		rect(xx + (off / 2), yy + hh + (off / 2), ww - off, this.w - hh - off, crr);
	}

	move() {
		if (0 < this.t && this.t < this.t1) {
			let n = norm(this.t, 0, this.t1);
			this.cx = lerp(this.cx0, this.cx1, easeInOutExpo(n));
			this.cy = lerp(this.cy0, this.cy1, easeInOutExpo(n));
		}
		if (this.t > this.t1) {
			this.init();
		}
		this.t++;
	}

	init() {
		this.drc = int(random(5));
		while (this.drc == this.pdrc) {
			this.drc = int(random(5));
		}
		this.d = this.w * random(0.4, 0.75);

		this.pdrc = this.drc;
		if (this.drc == 0) {
			this.cx1 = this.x + ((this.w / 2) - (this.d / 2));
			this.cy1 = this.y + ((this.w / 2) - (this.d / 2));
		} else if (this.drc == 1) {
			this.cx1 = this.x - ((this.w / 2) - (this.d / 2));
			this.cy1 = this.y + ((this.w / 2) - (this.d / 2));
		} else if (this.drc == 2) {
			this.cx1 = this.x + ((this.w / 2) - (this.d / 2));
			this.cy1 = this.y - ((this.w / 2) - (this.d / 2));
		} else if (this.drc == 3) {
			this.cx1 = this.x - ((this.w / 2) - (this.d / 2));
			this.cy1 = this.y - ((this.w / 2) - (this.d / 2));
		} else if (this.drc == 4) {
			this.cx1 = this.x;
			this.cy1 = this.y;
		}
		this.cx0 = this.cx;
		this.cy0 = this.cy;
		this.t = 0;
	}

	run() {
		this.show();
		this.move();
	}
}