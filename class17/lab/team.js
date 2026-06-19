export default class Team {
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

    get points() {
        return this.__points;
    }

    get id() {
        return this.__id;
    }

    get name() {
        return this.__name;
    }

    get group() {
        return this.__group;
    }

    static fromObject(data) {
        const id = data.id || undefined;
        const name = data.name || undefined;
        const group = data.group || undefined;
        const points = data.points || undefined;
        const played = data.played || undefined;
        const goalDifference = data.goalDifference || undefined;

        if (!id || !name || !group || !points || !played || !goalDifference){
            throw new Error("Team instance was not created. Invalid data.")
        }
        
        return new this(id, name, group, points, played, goalDifference);
    }
}