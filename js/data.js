export class DataHelper {
    constructor(totalItems) {
        this.names = null;
        this.events = null;
        this.TIMELINE_ITEMS = totalItems;
    }

    async getEvents() {
        const response = await fetch('../data/events.json');
        const data = await response.json();
        this.events = this.sortEvents(data);
    }

    async getNames() {
        const response = await fetch('../data/names.json');
        const data = await response.json();
        this.names = data;
    }

    sortEvents(data) {
        data.sort((a, b) => new Date(`${b.from}T00:00:00`).getTime() - new Date(`${a.from}T00:00:00`).getTime());
        return data;
    }

    get getLatestEvents() {
        const entries = Object.entries(this.groupByDay);
        return Object.fromEntries(entries.splice(0, this.TIMELINE_ITEMS));
    }

    get groupByDay() {
        const byTheDay = {};
        this.events.forEach((event) => {
            if (byTheDay[event.from] === undefined) {
                byTheDay[event.from] = [event];
            } else {
                byTheDay[event.from] = [...byTheDay[event.from], event];
            }
        });
        return byTheDay;
    }

    async init() {
        await Promise.all([this.getEvents(), this.getNames()]);
    }
}
