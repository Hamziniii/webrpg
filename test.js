let Game = new function() {
    // #region Variables
    this.utilities = {that: this} // non-entity specific functions
    this.entities = {that: this} // player and enemy data and functions
    this.button = {that: this} // functions regarding buttons the player can press on the ui
    // #endregion

    // #region Utilities
    this.utilities.log = function(){ // logs any arguments to console
        console.log(Array.from(arguments).join(', '))
    }
    
    this.utilities.random = function(max, min = 0) { // gets a random number from 'min' (default is 0) to 'max'
        return Math.floor(Math.random() * max) + min 
    }
    
    this.utilities.randomSlice = function(array){ // gets a random element of an array and slices that element out
        let i = this.random(array.length)
        let element = array[i]
        array.splice(i, 1)
        return [element, array]
    }

    this.utilities.gei = function(ele) { // gets an element from the element provided (ele)
        return document.getElementById(ele)
    }
    //#endregion

    // #region Entities

        // #region Variables
        this.entities.Player = {that: this.that} // player variable
        this.entities.Enemy = {that: this.that} // enemy variable
        // #endregion

        // #region Functions
        this.entities.randAttributes = function() { // returns an object with random attributes
            let addsub = [1, 1, -1, -1]
            let attributes = {
                strength: 12,
                cunning: 12,
                speed: 12,
                fatigue: 30
            }
            let keys = Object.keys(attributes)

            addsub.forEach(e => {
                let key
                [key, keys] = this.that.utilities.randomSlice(keys)
                let add = key == 'fatigue' ? this.that.utilities.random(7) : this.that.utilities.random(4)
                attributes[key] += add * e
            })

            return attributes
        }

        this.entities.setAttributes = function() { // set player and enemy's attributes (for start)
            Object.assign(this.Player, this.randAttributes)
            Object.assign(this.Enemy, this.randAttributes)
        }

        this.entities.getAttackValue = function(entity = 'Player') { /// returns the attack value based off of the entity
            return entity == 'Player' ?  
                (this.Player.strength + this.Player.speed + this.Player.cunning) / this.that.utilities.random(7, 1) :
                (this.Enemy.strength + this.Enemy.speed + this.Enemy.cunning) / this.that.utilities.random(7, 1)
        }

        this.entities.getDefenseValue = function(entity, defending = false) {
            if(defending) {
                return entity == 'Player' ?
                    this.Player.speed + this.Player.cunning :
                    this.Enemy.speed + this.Enemy.cunning
            } else {
                return entity == 'Player' ?
                    this.Player.speed + this.that.utilities.random(7, 1) :
                    this.Enemy.speed + this.that.utilities.random(7, 1)
            }
        }
        // #endregion

        // #region Enemy
        this.entities.Enemy.setAttribute = function() { // set player and enemy's attributes (for start)
            Object.assign(this, this.that.entities.randAttributes())
        }

        this.entities.Enemy.attack = function() {
            
        }
        // #endregion

        // #region Player
        this.entities.Player.addFatigue = function(x){
            this.fatigue += x
        }
        // #endregion        
    //#endregion

    // #region Button
    this.button.attack = function() {

    }

    this.button.defend = function() {

    }

    this.finishingmove.attack = function() {

    }
    //#endregion
}

Game.entities.setAttributes()
