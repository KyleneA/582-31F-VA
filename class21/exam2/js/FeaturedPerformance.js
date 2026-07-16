import { Performance } from "./Performance.js";

export class FeaturedPerformance extends Performance{
    constructor(
        id,
        title,
        artist,
        stage,
        time,
        ticketPrice,
        ticketsRemaining,
        featured
    ) {
        super(
            id,
            title,
            artist,
            stage,
            time,
            ticketPrice,
            ticketsRemaining,
            featured
        );

    }

    get lineupLabel() {
        return "Featured Performance";
    }
}
