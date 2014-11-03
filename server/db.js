var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Village = new Schema({
	Villagers: Number,
    Huts: Number,
    Food: Number
})

var Domain = new Schema({
	Fields: Number,
    Forests: Number,
    Peasants: Number,
    Vineyards: Number,
    Mines: Number
})

var Controller = new Schema({
	level: Number,
    wolves: Number,
    bear: Number,
    vineyards: Number
})

var Game = new Schema({
	stage: Number,
	milestones: Array,
	user: String,
	village: [Village],
	domain: [Domain],
	controller: [Controller]
})