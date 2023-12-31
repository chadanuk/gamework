"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.TileMap = void 0;
var GameObject_1 = require("gamework/src/GameObject");
var Rectangle_1 = require("gamework/src/Rectangle");
var TileMap = /** @class */ (function (_super) {
    __extends(TileMap, _super);
    function TileMap(scene, tileMap, tileset) {
        if (tileMap === void 0) { tileMap = {}; }
        if (tileset === void 0) { tileset = null; }
        var _this = _super.call(this, scene, 'tilemap', new Rectangle_1.Rectangle(0, 0, 32, 32)) || this;
        _this.name = 'tilemap';
        _this.id = "tilemap-".concat(new Date().getTime());
        scene.addObject(_this);
        _this.showHitBox = false;
        _this.tileMap = __assign({ cols: 8, rows: 80, tsize: 32, tiles: [] }, tileMap);
        _this.image = new Image();
        _this.isLoaded = null;
        _this.tileset = tileset;
        _this.load();
        window.gamework.constants.ASSETS.push(_this);
        return _this;
    }
    TileMap.prototype.setScene = function (scene) {
        this.scene = scene;
        return this;
    };
    TileMap.prototype.setShowHitBox = function (showHitBox) {
        this.showHitBox = showHitBox;
        return this;
    };
    TileMap.prototype.drawHitBox = function (context) { };
    TileMap.prototype.handleCollisions = function () { };
    TileMap.prototype.calculatePosition = function () { };
    TileMap.prototype.load = function () {
        var _this = this;
        this.image.onload = function () {
            _this.loaded = true;
        };
        this.image.src = this.tileset;
    };
    TileMap.prototype.getTile = function (col, row) {
        return this.tileMap.tiles[row * this.tileMap.cols + col];
    };
    TileMap.prototype.draw = function (context) {
        if (!this.loaded) {
            return;
        }
        for (var c = 0; c < this.tileMap.cols; c++) {
            for (var r = 0; r < this.tileMap.rows; r++) {
                var tile = this.getTile(c, r);
                if (tile === 0) { // 0 => empty tile
                    continue;
                }
                var x = c * this.tileMap.tsize;
                var y = r * this.tileMap.tsize;
                context.drawImage(this.image, (tile - 1) * this.tileMap.tsize, (tile - 1) * this.tileMap.tsize / this.tileMap.cols, this.tileMap.tsize, this.tileMap.tsize, x, y, this.tileMap.tsize, this.tileMap.tsize);
            }
        }
    };
    return TileMap;
}(GameObject_1.GameObject));
exports.TileMap = TileMap;
