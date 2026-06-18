class Team {
    constructor(id, name, group, points, played, goalDifference){
        this.__id = id;
        this.__name = name;
        this.__group = group;
        this.points = points;
        this.played = played;
        this. goalDifference = goalDifference;
    }

    get summary() {
        return `|| ${this.__name} | Group ${this.__group} | Games played: ${this.played} | ${this.points} points ||`;
    }

    set points(value) {
        if (value >= 0) {
            this.__points = value;
        } else {
            throw new Error("Points must be greater or equal to 0");
        }
    }

    // Might not be necessary
    get points() {
        return this.__points;
    }

    static fromObject(data) {
        const parsedData = JSON.parse(data);
        const id = parsedData.id || undefined;
        const name = parsedData.name || undefined;
        const group = parsedData.group || undefined;
        const points = parsedData.points || undefined;
        const played = parsedData.played || undefined;
        const goalDifference = parsedData.goalDifference || undefined;

        if (!id || !name || !group || !points || !played || !goalDifference){
            throw new Error("Tournament instance was not created. Invalid data.")
        }
        
        return new this(id, name, group, points, played, goalDifference);
    }
}