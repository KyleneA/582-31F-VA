export default class Artist {
    constructor(id, name, genre, stage, time, country, headliner) {
        this.__id = id;
        this.__name = name;
        this.genre = genre;
        this.stage = stage;
        this.time = time;
        this.country = country;
        this.headliner = headliner;
    }

    get id() {
        return this.__id;
    }

    get name() {
        return this.__name;
    }

    get summary() {
        return `${this.__name} (${this.country}) | ${this.genre} | ${this.stage} - ${this.time}`;
    }

    set headliner(value) {
        if (typeof(value) === "boolean") {
            this.__headliner = value;
        } else {
            throw new Error("Headliner must be boolean value.")
        }
    }

    static fromObject(data) {
        const id = data.id || undefined;
        const name = data.name || undefined;
        const genre = data.genre || undefined;
        const stage = data.stage || undefined;
        const time = data.time || undefined;
        const country = data.country || undefined;
        const headliner = data.headliner;

        if (!id || !name || !genre || !stage || !time || !country || headliner === "") {
            throw new Error("Artist instance was not created. Invalid data.")
        } else {
            return new this(id, name, genre, stage, time, country, headliner)
        }
    }
}