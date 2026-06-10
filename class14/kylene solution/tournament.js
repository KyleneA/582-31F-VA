class Tournament{
    constructor(id, name, game, entryFee, maxPlayers, registeredPlayers, status){
        this.id = id;
        this.name = name;
        this.game = game;
        this.entryFee = entryFee;
        this.maxPlayers = maxPlayers;
        this.registeredPlayers = registeredPlayers;
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
            this.maxPlayers = value;
        }
    }

    static fromObject(data) {
        //will come back to this
    }
}