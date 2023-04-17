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
exports.__esModule = true;
exports.TileMap = void 0;
var TileMap = /** @class */ (function () {
    function TileMap(scene, tileMap, tileset) {
        if (tileset === void 0) { tileset = null; }
        this.scene = scene;
        this.tileMap = __assign({ cols: 8, rows: 8, tsize: 32, tiles: [] }, tileMap);
        this.image = new Image();
        this.isLoaded = null;
        this.load();
        this.tileset = tileset;
        window.gamework.constants.ASSETS.push(this);
        this.scene.addObject(this);
    }
    TileMap.prototype.setScene = function (scene) {
        this.scene = scene;
    };
    TileMap.prototype.load = function () {
        var _this = this;
        this.image.onload = function () {
            _this.loaded = true;
        };
        this.image.src = this.tileset;
    };
    TileMap.prototype.getTile = function (col, row) {
        return this.tileMap.tiles[row * map.cols + col];
    };
    TileMap.prototype.draw = function (context) {
        for (var c = 0; c < this.tileMap.cols; c++) {
            for (var r = 0; r < this.tileMap.rows; r++) {
                var tile = this.getTile(c, r);
                if (tile === 0) { // 0 => empty tile
                    return;
                }
                context.drawImage(this.image, (tile - 1) * this.tileMap.tsize, 0, this.tileMap.tsize, this.tileMap.tsize, c * this.tileMap.tsize, r * this.tileMap.tsize, this.tileMap.tsize, this.tileMap.tsize);
            }
        }
    };
    return TileMap;
}());
exports.TileMap = TileMap;
