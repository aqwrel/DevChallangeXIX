export class Statistic {
    constructor() {
        this.language = 'en';
        this.names = null;
        this.calculatedData = {};
        this.statisticBlock = document.querySelector('.statistic_list');
    }

    setLanguage() {
        const browserLanguage = navigator.language || navigator.userLanguag;
        if (Object.keys(this.names).includes(browserLanguage)) {
            this.language = browserLanguage;
        }
    }

    calculate(data) {
        this.calculatedData = {};
        data.forEach((item) => {
            const { affected_type: affectedType } = item;
            if (affectedType) {
                if (this.calculatedData[affectedType[0]] === undefined) {
                    this.calculatedData[affectedType[0]] = +item.affected_number[0];
                } else {
                    this.calculatedData[affectedType[0]] += +item.affected_number[0];
                }
            }
        });
        this.touchAnimate();
    }

    touchAnimate() {
        Object.keys(this.calculatedData).forEach((item) => {
            const obj = document.querySelector(`.statistic_list_item--${item} > span`);
            this.animateValue(obj, +obj.textContent, +this.calculatedData[item], 700);
        });
    }

    animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    renderStatistic() {
        this.statisticBlock.innerHTML = '';
        Object.keys(this.names[this.language].affected_type).forEach((item) => {
            const statisticItem = document.createElement('li');
            statisticItem.classList.add('statistic_list_item');
            statisticItem.classList.add(`statistic_list_item--${item}`);
            statisticItem.textContent = this.names[this.language].affected_type[item];
            const statisticItemNumber = document.createElement('span');
            statisticItemNumber.textContent = '0';
            statisticItem.appendChild(statisticItemNumber);
            this.statisticBlock.appendChild(statisticItem);
        });
    }

    init(names) {
        this.names = names;
        this.setLanguage();
        this.renderStatistic();
    }
}
