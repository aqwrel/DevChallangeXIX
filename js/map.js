import { EXTREME_POINTS } from './constants.js';

const heightRatio = 0.6665;

export class MapHelper {
    constructor() {
        this.canvas = document.querySelector('.map');
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.width * heightRatio;
        this.ctx = this.canvas.getContext('2d');
        this.points = [];
    }

    convertGeoToPixel(latitude, longitude) {
        const mapLatBottomRad = EXTREME_POINTS.south.lat * Math.PI / 180;
        const latitudeRad = latitude * Math.PI / 180;
        const mapLngDelta = (EXTREME_POINTS.east.lon - EXTREME_POINTS.west.lon);

        const worldMapWidth = ((this.canvas.width / mapLngDelta) * 360) / (2 * Math.PI);
        const mapOffsetY = (worldMapWidth / 2 * Math.log((1 + Math.sin(mapLatBottomRad)) / (1 - Math.sin(mapLatBottomRad))));

        const x = (longitude - EXTREME_POINTS.west.lon) * (this.canvas.width / mapLngDelta);
        const y = this.canvas.height - ((worldMapWidth / 2 * Math.log((1 + Math.sin(latitudeRad)) / (1 - Math.sin(latitudeRad)))) - mapOffsetY);

        return { x, y };
    }

    createPoint(x, y) {
        if (!x || !y) return;
        const position = this.convertGeoToPixel(x, y);
        this.drawPoint(position.x, position.y);
    }

    drawPoint(x, y) {
        const color = 'red';
        const size = 3;
        const radius = 0.5 * size;

        const pointX = Math.round(x - radius);
        const pointY = Math.round(y - radius);

        this.ctx.beginPath();
        this.ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    clearMap() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
