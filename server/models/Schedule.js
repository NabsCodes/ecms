const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
	start_date: {
		type: String,
		required: true
	},
	end_date: {
		type: String,
		required: false
	},
	week: {
		type: String,
		default: true
	},
	schedule: {
		type: Object,
		default: true
	},

});

module.exports = mongoose.model('Schedule', ScheduleSchema);
