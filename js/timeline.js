export class Timeline {
    constructor(total) {
        this.timelineBlock = document.querySelector('.timeline');
        this.total = total - 1;
        this.timelineValue = 99;
        this.maxAffectedNumber = 0;
        this.events = null;
    }

    getMaxAffectedNumber() {
        const counter = {};
        Object.keys(this.events).forEach((event) => {
            const tmp = this.getAffectedNumber(this.events[event]);
            if (tmp) {
                if (counter[event] === undefined) {
                    counter[event] = +tmp;
                } else {
                    counter[event] += +tmp;
                }
            }
        });
        this.maxAffectedNumber = Math.max(...Object.values(counter));
    }

    getAffectedNumber(item) {
        return item.reduce((acc, curr) => {
            if (curr.affected_number) {
                acc += +curr.affected_number[0];
            }
            return acc;
        }, 0);
    }

    createTimelineItem() {
        Object.keys(this.events).reverse().forEach((item, index) => {
            const affectedNumber = this.getAffectedNumber(this.events[item]);
            const itemHeight = (affectedNumber / this.maxAffectedNumber * 100).toFixed(2);
            const timelineItem = document.createElement('div');
            timelineItem.classList.add('timeline_item');
            if (index === this.total) {
                timelineItem.classList.add('timeline_item--active');
            }
            const date = new Date(item);
            timelineItem.dataset.date = date.toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric',
            });
            timelineItem.dataset.dirty = item;
            timelineItem.dataset.index = index;
            timelineItem.style.height = `calc(${itemHeight}% + 10px)`;
            this.timelineBlock.appendChild(timelineItem);
        });
    }

    timelineItemToggle() {
        const items = [...document.querySelectorAll('.timeline_item')];
        items[this.timelineValue].classList.toggle('timeline_item--active');
    }

    changeActiveStep(index) {
        this.timelineItemToggle();
        this.timelineValue = index;
        this.timelineItemToggle();
    }

    init(events) {
        this.events = events;
        this.getMaxAffectedNumber();
        this.createTimelineItem();
    }
}
