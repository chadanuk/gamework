"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterWalls = void 0;
var wall_1 = require("./wall");
var WALL_DEPTH = window.gamework.WALL_DEPTH;
var OuterWalls = /** @class */ (function () {
    function OuterWalls(scene, gap, wallsConfig) {
        if (gap === void 0) { gap = null; }
        if (wallsConfig === void 0) { wallsConfig = [
            { x: 0, y: 0, w: canvas.width, h: WALL_DEPTH },
            { x: (canvas.width) - WALL_DEPTH, y: WALL_DEPTH, w: WALL_DEPTH, h: canvas.height - (2 * -WALL_DEPTH) },
            { x: 0, y: (canvas.height) - WALL_DEPTH, w: (canvas.width) - WALL_DEPTH, h: WALL_DEPTH },
            { x: 0, y: WALL_DEPTH, w: WALL_DEPTH, h: (canvas.height) - (2 * WALL_DEPTH) }
        ]; }
        this.scene = scene;
        this.depth = WALL_DEPTH;
        this.wallsConfig = wallsConfig;
        this.pixelWallsConfig = [];
        this.walls = [];
        this.gap = gap;
        this.generateWalls();
    }
    OuterWalls.prototype.setWallsConfig = function (wallsConfig, gap) {
        this.removeWallsFromScene();
        this.walls = [];
        this.wallsConfig = wallsConfig;
        this.gap = gap;
        this.generateWalls();
    };
    OuterWalls.prototype.removeWallsFromScene = function () {
        this.scene.removeObjectsWithNameContaining('Wall');
    };
    OuterWalls.prototype.findWallIndexForGap = function () {
        var _this = this;
        if (!this.gap) {
            return -1;
        }
        return this.pixelWallsConfig.findIndex(function (pixelWallConfig) {
            return (_this.gap.rectangle.x >= pixelWallConfig.x
                && (_this.gap.rectangle.x + _this.gap.rectangle.width) <= (pixelWallConfig.x + pixelWallConfig.w)
                && _this.gap.rectangle.y >= pixelWallConfig.y
                && (_this.gap.rectangle.y + _this.gap.rectangle.height) <= (pixelWallConfig.y + pixelWallConfig.h));
        });
    };
    OuterWalls.prototype.splitWallForGap = function () {
        var pixelWallConfigIndex = this.findWallIndexForGap();
        var pixelWallConfig = this.pixelWallsConfig[pixelWallConfigIndex];
        if (pixelWallConfigIndex < 0 || !this.gap) {
            return;
        }
        var newWall = { x: pixelWallConfig.x, y: pixelWallConfig.y, w: pixelWallConfig.w, h: pixelWallConfig.h };
        if (this.gap.rectangle.x === pixelWallConfig.x) {
            var origHeight = pixelWallConfig.h;
            this.pixelWallsConfig[pixelWallConfigIndex].h = origHeight - pixelWallConfig.y - (origHeight - this.gap.rectangle.y);
            newWall.y = this.gap.rectangle.y + this.gap.rectangle.height;
            newWall.height = origHeight - this.gap.rectangle.height - this.gap.rectangle.y;
        }
        if (this.gap.rectangle.y === pixelWallConfig.y) {
            var origWidth = pixelWallConfig.w;
            this.pixelWallsConfig[pixelWallConfigIndex].w = origWidth - pixelWallConfig.y - (origWidth - this.gap.rectangle.x);
            newWall.x = this.gap.rectangle.x + this.gap.rectangle.width;
            newWall.width = origWidth - this.gap.rectangle.width - this.gap.rectangle.x;
        }
        this.pixelWallsConfig.push(newWall);
    };
    OuterWalls.prototype.convertWallConfigToPixels = function () {
        var _this = this;
        this.pixelWallsConfig = [];
        this.wallsConfig.forEach(function (wallConfig) {
            var pixelWallConfig = __assign({}, wallConfig);
            ['x', 'y', 'w', 'h'].forEach(function (prop) {
                if (wallConfig[prop] <= 1) {
                    var multiplier = (['x', 'w'].includes(prop) ? canvas.width : canvas.height) / window.devicePixelRatio;
                    pixelWallConfig[prop] = wallConfig[prop] * multiplier;
                }
            });
            _this.pixelWallsConfig.push(pixelWallConfig);
        });
    };
    OuterWalls.prototype.generateWalls = function () {
        var _this = this;
        this.convertWallConfigToPixels();
        this.splitWallForGap();
        this.walls = this.pixelWallsConfig.map(function (wallConfig, index) {
            return new wall_1.Wall(_this.scene, wallConfig, "Wall ".concat(index));
        });
    };
    return OuterWalls;
}());
exports.OuterWalls = OuterWalls;
