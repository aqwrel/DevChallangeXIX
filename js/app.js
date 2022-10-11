import { DataHelper } from './data.js';
import { Timeline } from './timeline.js';
import { MapHelper } from './map.js';
import { Statistic } from './statistic.js';

const TOTAL_TIMELINE_ITEMS = 100;
export class App {
    constructor() {
        this.data = new DataHelper(TOTAL_TIMELINE_ITEMS);
        this.timeline = new Timeline(TOTAL_TIMELINE_ITEMS);
        this.map = new MapHelper();
        this.statistic = new Statistic();
        this.currentDay = TOTAL_TIMELINE_ITEMS - 1;
        this.controlBtn = document.querySelector('.control_btn');
        this.isPlay = false;
        this.interval = null;
    }

    createPoints() {
        this.map.clearMap();
        const arr = Object.values(this.data.groupByDay);
        arr.splice(-(TOTAL_TIMELINE_ITEMS - this.currentDay));
        this.statistic.calculate(arr.flat());
        arr.flat().forEach((item) => {
            this.map.createPoint(item.lat, item.lon);
        });
    }

    changeCurrentDay(e) {
        if (e.target.dataset?.index) {
            this.currentDay = +e.target.dataset.index;
            this.timeline.changeActiveStep(this.currentDay);
            this.createPoints();
            this.pause();
        }
    }

    controlsClick() {
        if (this.isPlay) {
            this.pause();
        } else {
            this.start();
        }
    }

    pause() {
        this.isPlay = false;
        this.controlBtn.classList.add('control_btn--play');
        this.controlBtn.classList.remove('control_btn--pause');
        clearInterval(this.interval);
    }

    start() {
        if (this.currentDay === 99) return;
        this.isPlay = true;
        this.controlBtn.classList.remove('control_btn--play');
        this.controlBtn.classList.add('control_btn--pause');
        this.interval = setInterval(() => {
            this.currentDay += 1;
            this.timeline.changeActiveStep(this.currentDay);
            this.createPoints();
            if (this.currentDay === 99) {
                this.pause();
            }
        }, 700);
    }

    addListeners() {
        this.timeline.timelineBlock.addEventListener('click', this.changeCurrentDay.bind(this));
        this.controlBtn.addEventListener('click', this.controlsClick.bind(this));
    }

    async init() {
        await this.data.init();
        this.statistic.init(this.data.names);
        this.timeline.init(this.data.getLatestEvents);
        this.createPoints();
        this.addListeners();
    }
}
