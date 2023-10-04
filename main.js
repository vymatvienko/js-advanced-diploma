!(function () {
  class e {
    constructor() { this.boardSize = 8, this.container = null, this.boardEl = null, this.cells = [], this.cellClickListeners = [], this.cellEnterListeners = [], this.cellLeaveListeners = [], this.newGameListeners = [], this.saveGameListeners = [], this.loadGameListeners = []; }

    bindToDOM(e) { if (!(e instanceof HTMLElement)) throw new Error('container is not HTMLElement'); this.container = e; }

    drawUi(e) { this.checkBinding(), this.container.innerHTML = '\n      <div class="controls">\n        <button data-id="action-restart" class="btn">New Game</button>\n        <button data-id="action-save" class="btn">Save Game</button>\n        <button data-id="action-load" class="btn">Load Game</button>\n      </div>\n      <div class="board-container">\n        <div data-id="board" class="board"></div>\n      </div>\n    ', this.newGameEl = this.container.querySelector('[data-id=action-restart]'), this.saveGameEl = this.container.querySelector('[data-id=action-save]'), this.loadGameEl = this.container.querySelector('[data-id=action-load]'), this.newGameEl.addEventListener('click', ((e) => this.onNewGameClick(e))), this.saveGameEl.addEventListener('click', ((e) => this.onSaveGameClick(e))), this.loadGameEl.addEventListener('click', ((e) => this.onLoadGameClick(e))), this.boardEl = this.container.querySelector('[data-id=board]'), this.boardEl.classList.add(e); for (let e = 0; e < this.boardSize ** 2; e += 1) { const s = document.createElement('div'); s.classList.add('cell', 'map-tile', `map-tile-${t = e, a = this.boardSize, t === 0 ? 'top-left' : t === a - 1 ? 'top-right' : t < a - 1 ? 'top' : t === a * (a - 1) ? 'bottom-left' : t === a * a - 1 ? 'bottom-right' : t % a == 0 ? 'left' : (t + 1) % a == 0 ? 'right' : t > a * (a - 1) ? 'bottom' : 'center'}`), s.addEventListener('mouseenter', ((e) => this.onCellEnter(e))), s.addEventListener('mouseleave', ((e) => this.onCellLeave(e))), s.addEventListener('click', ((e) => this.onCellClick(e))), this.boardEl.appendChild(s); } let t; let a; this.cells = Array.from(this.boardEl.children); }

    redrawPositions(e) { for (const e of this.cells)e.innerHTML = ''; for (const a of e) { const e = this.boardEl.children[a.position]; const s = document.createElement('div'); s.classList.add('character', a.character.type); const i = document.createElement('div'); i.classList.add('health-level'); const l = document.createElement('div'); l.classList.add('health-level-indicator', `health-level-indicator-${(t = a.character.health) < 15 ? 'critical' : t < 50 ? 'normal' : 'high'}`), l.style.width = `${a.character.health}%`, i.appendChild(l), s.appendChild(i), e.appendChild(s); } let t; }

    addCellEnterListener(e) { this.cellEnterListeners.push(e); }

    addCellLeaveListener(e) { this.cellLeaveListeners.push(e); }

    addCellClickListener(e) { this.cellClickListeners.push(e); }

    addNewGameListener(e) { this.newGameListeners.push(e); }

    addSaveGameListener(e) { this.saveGameListeners.push(e); }

    addLoadGameListener(e) { this.loadGameListeners.push(e); }

    onCellEnter(e) { e.preventDefault(); const t = this.cells.indexOf(e.currentTarget); this.cellEnterListeners.forEach(((e) => e.call(null, t))); }

    onCellLeave(e) { e.preventDefault(); const t = this.cells.indexOf(e.currentTarget); this.cellLeaveListeners.forEach(((e) => e.call(null, t))); }

    onCellClick(e) { const t = this.cells.indexOf(e.currentTarget); this.cellClickListeners.forEach(((e) => e.call(null, t))); }

    onNewGameClick(e) { e.preventDefault(), this.newGameListeners.forEach(((e) => e.call(null))); }

    onSaveGameClick(e) { e.preventDefault(), this.saveGameListeners.forEach(((e) => e.call(null))); }

    onLoadGameClick(e) { e.preventDefault(), this.loadGameListeners.forEach(((e) => e.call(null))); }

    static showError(e) { alert(e); }

    static showMessage(e) { alert(e); }

    selectCell(e) { const t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'yellow'; this.deselectCell(e), this.cells[e].classList.add('selected', `selected-${t}`); }

    deselectCell(e) { const t = this.cells[e]; t.classList.remove(...Array.from(t.classList).filter(((e) => e.startsWith('selected')))); }

    showCellTooltip(e, t) { this.cells[t].title = e; }

    hideCellTooltip(e) { this.cells[e].title = ''; }

    showDamage(e, t) { return new Promise(((a) => { const s = this.cells[e]; const i = document.createElement('span'); i.textContent = t, i.classList.add('damage'), s.appendChild(i), i.addEventListener('animationend', (() => { s.removeChild(i), a(); })); })); }

    setCursor(e) { this.boardEl.style.cursor = e; }

    checkBinding() { if (this.container === null) throw new Error('GamePlay not bind to DOM'); }
  } const t = {
    prairie: 'prairie', desert: 'desert', arctic: 'arctic', mountain: 'mountain',
  }; class a {constructor(e) { this.characters = []; for (let t = 0; t < e.length; t++) this.characters.push(e[t]); }} class s {constructor(e) { const t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'generic'; if (this.level = e, this.attack = 0, this.defence = 0, this.health = 50, this.move = 0, this.strike = 0, this.type = t, new.target.name === 'Character') throw new Error('Нельзя создавать персонажей, используя new Character()'); }} class i extends s {constructor(e) { super(e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'bowman'), this.attack = 25, this.defence = 25, this.move = 2, this.strike = 2; }} class l extends s {constructor(e) { super(e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'daemon'), this.attack = 10, this.defence = 10, this.move = 1, this.strike = 4; }} class r extends s {constructor(e) { super(e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'magician'), this.attack = 10, this.defence = 40, this.move = 1, this.strike = 4; }} class h extends s {constructor(e) { super(e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'swordsman'), this.attack = 40, this.defence = 10, this.move = 4, this.strike = 1; }} class c extends s {constructor(e) { super(e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'undead'), this.attack = 40, this.defence = 10, this.move = 4, this.strike = 1; }} class n extends s {constructor(e) { super(e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'vampire'), this.attack = 25, this.defence = 25, this.move = 2, this.strike = 2; }} function o(e, t, s) {
    const o = []; const m = (function* (e, t) {
      const a = {
        bowman: i, swordsman: h, magician: r, daemon: l, undead: c, vampire: n,
      }; for (;;) { const s = Math.floor(Math.random() * e.length); const i = Math.floor(Math.random() * t) + 1; const l = e[s]; yield new a[l](i); }
    }(e, t)); for (let e = 1; e <= s; e++)o.push(m.next().value); return new a(o);
  } class m {constructor(e, t) { if (!(e instanceof s)) throw new Error('character must be instance of Character or its children'); if (typeof t !== 'number') throw new Error('position must be a number'); this.character = e, this.position = t; }} class d {
    constructor() { this.playerMove = !0, this.playerTeam = [], this.compTeam = [], this.selectedCell = null, this.cellCharacter = void 0, this.canMoveCells = [], this.canStrikeCells = [], this.currentLevel = 1, this.gameOver = !1; }

    static from(e) { return null; }
  } const g = new e(); g.bindToDOM(document.querySelector('#game-container')); const S = new class {
    constructor(e) { this.storage = e; }

    save(e) { this.storage.setItem('state', JSON.stringify(e)); }

    load() { try { return JSON.parse(this.storage.getItem('state')); } catch (e) { throw new Error('Invalid state'); } }
  }(localStorage); const p = new class {
    constructor(e, t) { this.gamePlay = e, this.stateService = t, this.teamSize = 3, this.playerTypes = ['bowman', 'swordsman', 'magician'], this.compTypes = ['daemon', 'undead', 'vampire'], this.themesTypes = ['prairie', 'desert', 'arctic', 'mountain'], this.lines = [], this.gameState = new d(); }

    resetState() { this.gameState.cellCharacter = void 0, this.gamePlay.deselectCell(this.gameState.selectedCell), this.gameState.selectedCell = null, this.gameState.canMoveCells = [], this.gameState.canStrikeCells = []; }

    changeMove() { this.resetState(), this.gamePlay.redrawPositions(this.gameState.playerTeam.concat(this.gameState.compTeam)), this.gameState.playerMove = !this.gameState.playerMove, !1 === this.gameState.playerMove && this.compMove(); }

    raiseAttack(e) { return Math.floor(Math.max(e.attack, e.attack * (80 + e.health) / 100)); }

    raiseDefence(e) { return Math.floor(Math.max(e.defence, e.defence * (80 + e.health) / 100)); }

    changeLevel() { this.gameState.currentLevel++, this.gameState.playerMove = !0, this.resetState(); for (let e = 0; e < this.gameState.playerTeam.length; e++) this.gameState.playerTeam[e].character.level++, this.gameState.playerTeam[e].character.attack = this.raiseAttack(this.gameState.playerTeam[e].character), this.gameState.playerTeam[e].character.defence = this.raiseDefence(this.gameState.playerTeam[e].character), this.gameState.playerTeam[e].character.health = Math.min(this.gameState.playerTeam[e].character.health + 80, 100); this.gamePlay.drawUi(t[this.themesTypes[this.gameState.currentLevel - 1]]), this.generateTeams(this.teamSize - this.gameState.playerTeam.length, this.teamSize); }

    calcDamage(e, t) { return Math.floor(Math.max(e.attack - t.defence, 0.1 * e.attack)); }

    compMove() { let t; for (let a = 0; a < this.gameState.compTeam.length; a++) if (this.gameState.cellCharacter = this.gameState.compTeam[a], this.gameState.selectedCell = this.gameState.compTeam[a].position, this.canStrike(), this.gameState.canStrikeCells.length > 0) { if (t = this.gameState.playerTeam.find(((e) => e.position === this.gameState.canStrikeCells[0])), this.gameState.canStrikeCells.includes(t.position)) { const a = this.calcDamage(this.gameState.cellCharacter.character, t.character); this.gamePlay.showDamage(t.position, a).then((() => { if (t.character.health -= a, t.character.health <= 0) { const e = this.gameState.playerTeam.findIndex(((e) => e.position === t.position)); this.gameState.playerTeam.splice(e, 1); } this.gameState.playerTeam.length === 0 ? (e.showMessage('Вы проиграли :('), this.gameState.gameOver = !0) : this.changeMove(); })); } break; } if (void 0 === t) { this.gameState.cellCharacter = this.gameState.compTeam[Math.floor(Math.random() * this.gameState.compTeam.length)], this.gameState.selectedCell = this.gameState.cellCharacter.position, this.canMove(); const e = this.gameState.compTeam.findIndex(((e) => e.position === this.gameState.selectedCell)); this.gameState.compTeam[e].position = this.gameState.canMoveCells[Math.floor(Math.random() * this.gameState.canMoveCells.length)], this.changeMove(); } }

    getCell(e) { for (;;) { let t = Math.floor(Math.random() * this.gamePlay.boardSize * 2); if (t = t % 2 == 0 ? e === 0 ? t * this.gamePlay.boardSize / 2 : t * this.gamePlay.boardSize / 2 + (this.gamePlay.boardSize - 2) : e === 0 ? t * this.gamePlay.boardSize / 2 - (this.gamePlay.boardSize / 2 - 1) : t * this.gamePlay.boardSize / 2 - (this.gamePlay.boardSize / 2 - 1) + (this.gamePlay.boardSize - 2), !this.gameState.playerTeam.concat(this.gameState.compTeam).find(((e) => e.position === t))) return t; } }

    generateTeams(e, t) { const a = o(this.playerTypes, this.gameState.currentLevel, e); const s = o(this.compTypes, this.gameState.currentLevel, t); for (let e = 0; e < this.gameState.playerTeam.length; e++) this.gameState.playerTeam[e].position = this.getCell(0); for (let t = 0; t < e; t++) { if (a.characters[t].level > 1) for (let e = 2; e <= a.characters[t].level; e++)a.characters[t].attack = this.raiseAttack(a.characters[t]), a.characters[t].defence = this.raiseDefence(a.characters[t]); this.gameState.playerTeam.push(new m(a.characters[t], this.getCell(0))); } for (let e = 0; e < t; e++) { if (s.characters[e].level > 1) for (let t = 2; t <= s.characters[e].level; t++)s.characters[e].attack = this.raiseAttack(s.characters[e]), s.characters[e].defence = this.raiseDefence(s.characters[e]); this.gameState.compTeam.push(new m(s.characters[e], this.getCell(1))); } this.gamePlay.redrawPositions(this.gameState.playerTeam.concat(this.gameState.compTeam)); }

    init() { this.gamePlay.drawUi(t[this.themesTypes[this.gameState.currentLevel - 1]]); for (let e = 1; e <= this.gamePlay.boardSize; e++) { const t = []; for (let a = 1; a <= this.gamePlay.boardSize; a++)t.push((e - 1) * this.gamePlay.boardSize + (a - 1)); this.lines.push(t); } this.generateTeams(this.teamSize, this.teamSize), this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)), this.gamePlay.addCellClickListener(this.onCellClick.bind(this)), this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this)), this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this)), this.gamePlay.addSaveGameListener(this.onSaveGameClick.bind(this)), this.gamePlay.addLoadGameListener(this.onLoadGameClick.bind(this)); }

    onNewGameClick() { this.gameState.playerTeam = [], this.gameState.compTeam = [], this.gameState.currentLevel = 1, this.playerMove = !0, this.gameState.cellCharacter = void 0, this.gameState.selectedCell = null, this.gameState.canMoveCells = [], this.gameState.canStrikeCells = [], this.gameState.gameOver = !1, this.gamePlay.drawUi('prairie'), this.generateTeams(this.teamSize, this.teamSize); }

    onSaveGameClick() { this.stateService.save(this.gameState), e.showMessage('Игра успешно сохранена'); }

    onLoadGameClick() { const a = this.stateService.load(); a || e.showError('Ошибка загрузки'), this.gameState.playerMove = a.playerMove, this.gameState.currentLevel = a.currentLevel, this.gameState.playerTeam = [], this.gameState.compTeam = [], this.gameState.selectedCell = null, this.gameState.cellCharacter = void 0, this.gameState.canMoveCells = [], this.gameState.canStrikeCells = [], this.gameState.gameOver = a.gameOver; for (let e = 0; e < a.playerTeam.length; e++) { let t; a.playerTeam[e].character.type === 'bowman' ? t = new i(a.playerTeam[e].character.level) : a.playerTeam[e].character.type === 'magician' ? t = new r(a.playerTeam[e].character.level) : a.playerTeam[e].character.type === 'swordsman' && (t = new h(a.playerTeam[e].character.level)), t.attack = a.playerTeam[e].character.attack, t.defence = a.playerTeam[e].character.defence, t.health = a.playerTeam[e].character.health; const s = new m(t, a.playerTeam[e].position); this.gameState.playerTeam.push(s); } for (let e = 0; e < a.compTeam.length; e++) { let t; a.compTeam[e].character.type === 'daemon' ? t = new l(a.compTeam[e].character.level) : a.compTeam[e].character.type === 'undead' ? t = new c(a.compTeam[e].character.level) : a.compTeam[e].character.type === 'vampire' && (t = new n(a.compTeam[e].character.level)), t.attack = a.compTeam[e].character.attack, t.defence = a.compTeam[e].character.defence, t.health = a.compTeam[e].character.health; const s = new m(t, a.compTeam[e].position); this.gameState.compTeam.push(s); } this.gamePlay.drawUi(t[this.themesTypes[this.gameState.currentLevel - 1]]), this.gamePlay.redrawPositions(this.gameState.playerTeam.concat(this.gameState.compTeam)); }

    whoIsOnCell(e) { return this.gameState.playerTeam.find(((t) => t.position === e)) ? 1 : this.gameState.compTeam.find(((t) => t.position === e)) ? 2 : 0; }

    canMove() { let e = null; this.gameState.canMoveCells = []; let t = 0; for (let a = 0; a < this.gamePlay.boardSize; a++) if (e = this.lines[a].findIndex(((e) => e === this.gameState.selectedCell)), e >= 0) { for (let s = 1; s <= this.gameState.cellCharacter.character.move; s++)e + s < this.lines[a].length && (t = this.gameState.selectedCell + s, this.whoIsOnCell(t) === 0 && this.gameState.canMoveCells.push(t), t = this.gameState.selectedCell + s + s * this.gamePlay.boardSize, t < this.gamePlay.cells.length && this.whoIsOnCell(t) === 0 && this.gameState.canMoveCells.push(t), t = this.gameState.selectedCell + s - s * this.gamePlay.boardSize, t >= 0 && this.whoIsOnCell(t) === 0 && this.gameState.canMoveCells.push(t)), e - s >= 0 && (t = this.gameState.selectedCell - s, this.whoIsOnCell(t) === 0 && this.gameState.canMoveCells.push(t), t = this.gameState.selectedCell - s + s * this.gamePlay.boardSize, t < this.gamePlay.cells.length && this.whoIsOnCell(t) === 0 && this.gameState.canMoveCells.push(t), t = this.gameState.selectedCell - s - s * this.gamePlay.boardSize, t >= 0 && this.whoIsOnCell(t) === 0 && this.gameState.canMoveCells.push(t)), a + s < this.lines.length && this.whoIsOnCell(this.gameState.selectedCell + s * this.gamePlay.boardSize) === 0 && this.gameState.canMoveCells.push(this.gameState.selectedCell + s * this.gamePlay.boardSize), a - s >= 0 && this.whoIsOnCell(this.gameState.selectedCell - s * this.gamePlay.boardSize) === 0 && this.gameState.canMoveCells.push(this.gameState.selectedCell - s * this.gamePlay.boardSize); break; } }

    canStrike() { let e = null; this.gameState.canStrikeCells = []; for (let t = 0; t < this.gamePlay.boardSize; t++) if (e = this.lines[t].findIndex(((e) => e === this.gameState.selectedCell)), e >= 0) { for (let a = t - this.gameState.cellCharacter.character.strike; a <= t + this.gameState.cellCharacter.character.strike; a++) if (a >= 0 && a < this.lines.length) for (let t = e - this.gameState.cellCharacter.character.strike; t <= e + this.gameState.cellCharacter.character.strike; t++)t >= 0 && t < this.lines[a].length && (!0 === this.gameState.playerMove && this.whoIsOnCell(this.lines[a][t]) === 2 || !1 === this.gameState.playerMove && this.whoIsOnCell(this.lines[a][t]) === 1) && this.gameState.canStrikeCells.push(this.lines[a][t]); break; } }

    onCellClick(t) { if (!0 !== this.gameState.gameOver) if (!0 === this.gameState.playerMove) { if (this.gameState.selectedCell !== t) { let a = !1; let s = this.gameState.playerTeam.find(((e) => e.position === t)); if (s) this.gameState.cellCharacter = s, this.gameState.selectedCell != null && this.gamePlay.deselectCell(this.gameState.selectedCell), this.gamePlay.selectCell(t), this.gameState.selectedCell = t, a = !0, this.canMove(), this.canStrike(); else if (s = this.gameState.compTeam.find(((e) => e.position === t)), s) if (this.gameState.canStrikeCells.includes(t)) { a = !0; const i = this.calcDamage(this.gameState.cellCharacter.character, s.character); this.gamePlay.showDamage(t, i).then((() => { if (s.character.health -= i, s.character.health <= 0) { const e = this.gameState.compTeam.findIndex(((e) => e.position === t)); this.gameState.compTeam.splice(e, 1); } this.gameState.compTeam.length === 0 ? this.gameState.currentLevel < 4 ? this.changeLevel() : (this.gamePlay.redrawPositions(this.gameState.playerTeam), this.gameState.selectedCell = null, this.gamePlay.cellCharacter = void 0, e.showMessage('Вы победили!'), this.gameState.gameOver = !0) : this.changeMove(); })); } else a = !0, e.showError('Персонаж недоступен для атаки'); else if (this.gameState.canMoveCells.includes(t)) { a = !0; const e = this.gameState.playerTeam.findIndex(((e) => e.position === this.gameState.selectedCell)); this.gameState.playerTeam[e].position = t, this.changeMove(); } else a = !0, e.showError('Поле недоступно для хода'); !1 === a && e.showError('Выбирайте своего персонажа'); } } else e.showError('Сейчас ход противника'); }

    onCellEnter(e) { const t = this.gameState.playerTeam.find(((t) => t.position === e)); const a = this.gameState.compTeam.find(((t) => t.position === e)); t ? this.gamePlay.showCellTooltip(`🎖${t.character.level}⚔${t.character.attack}🛡${t.character.defence}❤${t.character.health}`, e) : a && this.gamePlay.showCellTooltip(`🎖${a.character.level}⚔${a.character.attack}🛡${a.character.defence}❤${a.character.health}`, e), this.gameState.selectedCell !== null ? this.gameState.selectedCell === e ? this.gamePlay.setCursor('auto') : this.gameState.selectedCell !== e && t ? this.gamePlay.setCursor('pointer') : void 0 === t && void 0 === a && this.gameState.canMoveCells.includes(e) ? (this.gamePlay.setCursor('pointer'), this.gamePlay.selectCell(e, 'green')) : void 0 === t && a && this.gameState.canStrikeCells.includes(e) ? (this.gamePlay.setCursor('crosshair'), this.gamePlay.selectCell(e, 'red')) : this.gamePlay.setCursor('not-allowed') : this.gamePlay.setCursor('auto'); }

    onCellLeave(e) { this.gamePlay.hideCellTooltip(e), this.gamePlay.setCursor('auto'), this.gamePlay.cells.forEach(((e) => e.classList.remove('selected-green'))), this.gamePlay.cells.forEach(((e) => e.classList.remove('selected-red'))); }
  }(g, S); p.init();
}());
