const Game = new class GAME {
    constructor(){
        this.started = false
        this.over = false
        this.turn = true
        this.Player = {attacked: false, defended: false}
        this.Enemy = {attacked: false, defended: false}
        this.ids = ['attack', 'defend', 'fmove', 'stats']
        this.attackLog = ['hi', 'hi']
    }

    // UTILS

    gei(id){
        return document.getElementById(id)
    }

    init(){
        this.ids.forEach(x => document.getElementById(x).disabled = true)
        this.gei('start').onclick = this.start.bind(this)
        this.gei('directions').onclick = this.directions.bind(this)
    }

    setStats(){
        this.Player.stats = this.randomStat()
        this.Enemy.stats = this.randomStat()
    }

    setEnemyStats(){
        this.Enemy.stats = this.randomStat()
    }

    randomStat(){
        let choices = [0, 1, 2, 3]
        let choice2 = [1, 1, -1, -1]
        let atr = new Array(3).fill(12)
        atr.push(30)
        let newAtr = []

        newAtr = atr.map((w,x,y) => {
            let i = this.random(choice2)
            choice2.splice(choice2.indexOf(i), 1)
            let j = this.random(choices)
            w += j * i
            return w
        })

        let _a = newAtr.find(e => e > 26)
        newAtr.splice(newAtr.indexOf(_a))

        let z = {
            maxFatigue: _a,
            fatigue: _a,
            strength: newAtr[0],
            cunning: newAtr[1],
            speed: newAtr[2],
        }
        return z
    }

    random(array){
        return array[Math.floor(Math.random()*array.length)]
    }

    setFatigue(){
        this.gei('enemy-f').value = this.Enemy.stats.fatigue
        this.gei('player-f').value = this.Player.stats.fatigue

        this.gei('enemy-f').max = this.Enemy.stats.maxFatigue
        this.gei('player-f').max = this.Player.stats.maxFatigue
    }

    attackValue(person){
        return (person.stats.strength + person.stats.speed + person.stats.cunning) / (Math.floor(Math.random() * 6) + 1)
    }

    defendValue(person, defending=false){
        return defending ? person.stat.speed + person.stat.cunning : person.stat.speed + Math.floor(Math.random() * 6) + 1
    }

    // BUTTONS

    directions(){
        alert(`When you start the game you will be assined random stat points, which you can see by clicking 'stats'. Each turn you can either attack by clicking attack or defend. If you or the enemy attack, the attacker will deplete the other's fatigue by the amount of the attacker's attack score minus the other's defence score. If the other's defence score is higher than the attacker's attack score, then no fatigue is lost. To have a higher defence score you can defend, but that will forfit your chance to attack for that turn. To see the log of the game, click log`)
    }

    log(){
        alert(this.attackLog.reduce((p, c) => {
            return p += c + '\n'
        }, ''))
    }

    stats(){
        alert(
        `Player:
            Strength: ${this.Player.stats.strength},
            Cunning: ${this.Player.stats.cunning},
            Speed: ${this.Player.stats.speed},
            Fatigue: ${this.Player.stats.fatigue},
            Max Fatigue: ${this.Player.stats.maxFatigue}
        `)

        alert(
        `Enemy:
            Strength: ${this.Enemy.stats.strength},
            Cunning: ${this.Enemy.stats.cunning},
            Speed: ${this.Enemy.stats.speed},
            Fatigue: ${this.Enemy.stats.fatigue},
            Max Fatigue: ${this.Enemy.stats.maxFatigue}
        `)
    }

    start(){
        this.gei('start').id = 'log'
        this.gei('log').innerHTML = 'LOG'
        this.gei('log').onclick = this.log.bind(this)
        this.gei('stats').onclick = this.stats.bind(this)
        alert('The game has now started! If you do not know how to play or want to know what the buttons do, then click directions.')
        this.start = true
        this.ids.forEach(x => document.getElementById(x).disabled = false)
        this.setStats()
        this.setFatigue()
        console.log(this.Player, this.Enemy)
        console.log(this.attackValue(this.Player))
    }


}
window.onload = Game.init()