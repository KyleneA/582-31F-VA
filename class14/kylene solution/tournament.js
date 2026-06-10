export class Tournament{
    constructor(id, name, game, entryFee, maxPlayers, registeredPlayers, status){
        this.id = id;
        this.name = name;
        this.game = game;
        this.entryFee = Number(entryFee);
        this.maxPlayers = maxPlayers;
        this.registeredPlayers = Number(registeredPlayers);
        this.status = status;
    }

    get spotsLeft() {
        return this.maxPlayers - this.registeredPlayers;
    }

    set maxPlayers(value) {
        if (value <= 0) {
            throw new Error("Maximum number of players must be greater than 0!");
        } else if (value < this.registeredPlayers) {
            throw new Error("Maximum number of players cannot be smaller than the number of registered players!");
        } else {
            this.__maxPlayers = Number(value);
        }
    }

    get maxPlayers(){
        return this.__maxPlayers;
    }
    
    static fromObject(data) {
        const id = data.id;
        const name = data.name;
        const game = data.game;
        const entryFee = data.entryFee;
        const maxPlayers = data.maxPlayers;
        const registeredPlayers = data.registeredPlayers;
        const status = data.status;
        
        return new this(id, name, game, entryFee, maxPlayers, registeredPlayers, status);
    }
}