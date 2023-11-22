const express = require('express');
const router = express.Router();

const { auth } = require('../../middleware/auth');

// Schedule Model
const Users = require('../../models/User');
const Schedule = require('../../models/Schedule');

router.post('/add_schedule', async (req, res) => {
	const { first, last, week } = req.body;
	try {

		let found = await Schedule.find({ week, start_date: first });

		let user_randoms = {};
		let total_shifts = 7;
		let users = await Users.find({ role: "caregiver", status: "active" }).select("first_name last_name email").limit(7);
		//shuffle users;
		users = users
			.map(value => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value)

		if (users.length != 7) {
			return res.status(400).send({ status: false, msg: "Ensure 7 staffs are active" });
		}
		let current = 0;
		for (var i = 0; i < total_shifts; i++) {
			let staffs = [];
			for (var x = 0; x < 5; x++) {
				staffs.push({ name: users[current].first_name + " " + users[current].last_name, email: users[current].email });
				current++;
				if (current == 7) {
					current = 0;
				}
			}
			user_randoms[i] = staffs;
		};

		if (found.length > 0) {
			found.schedule = user_randoms;
			await Users.findByIdAndUpdate(found._id, found);
			return res.status(200).send({ status: true, data: {} })
		} else {
			const new_schedule = new Schedule({ start_date: first, end_date: last, week, schedule: user_randoms });
			await new_schedule.save();
			return res.status(200).send({ status: true, data: new_schedule });
		}



	} catch (err) {
		console.log(err);
		res.status(500).send({ msg: err, status: false });
	}
});

router.get('/show_all_schedules', auth, async (req, res) => {
	const { current, search } = req.query;
	try {
		let skip = 0;
		let take = 100; //in the case current page is not specified
		if (current) {
			skip = (current - 1) * 10
			take = 10;
		}
		// let caregiver = await CareGiver.find({ $or: [{ email: search }, { first_name: search }, { last_name: search }] }).skip(skip).limit(take);
		let sch = await Schedule.find().sort({ start_date: -1, week: -1 }).skip(skip).limit(take);
		if (!sch) { res.status(400).send({ status: false, error: 'Problem with the query or schedule not found' }) };
		res.status(200).send({ status: true, data: sch, count: sch.length || 0 });

	} catch (err) {
		res.status(400).json({ msg: err });
	}
});



module.exports = router;