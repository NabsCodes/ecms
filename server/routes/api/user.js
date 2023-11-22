const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { auth } = require('../../middleware/auth');

// User Model
const Users = require('../../models/User');
const Invoice = require('../../models/Invoice');


const port = process.env.PORT || process.env.LocalPort;
{ process.env.LocalPort === port ? FrontEnd = process.env.FrontEndHost : FrontEnd = process.env.FrontEndHostProduction }


//@routes PUT api/user/editProfile
//@desc update user
//@response - status: true or false | error
router.patch('/update_user/:id', auth, async (req, res) => {
	const { id } = req.params;

	try {
		let data = req.body;
		if (data.password) {
			const salt = await bcrypt.genSalt(10);
			data.password = await bcrypt.hash(data.password, salt);
		}

		const user = await Users.findByIdAndUpdate(id, req.body);
		console.log(user)
		if (!user) { res.status(400).send({ status: false, error: 'Problem with the update query' }) };

		//add change to system
		res.status(200).send({ status: true, message: "Profile Updated" });

	} catch (err) {
		res.json({ msg: err });
	}
});

//@routes POST api/users/register
//@desc Register new user
//@access public
router.post('/add_user', async (req, res) => {
	const { first_name, email, last_name, dob, role, address, phone, password } = req.body;
	if (email == undefined || first_name == undefined || last_name == undefined || dob == undefined || role == undefined || address == undefined || phone == undefined || password == undefined) {
		return res.status(400).send({ msg: 'Some fields are empty!' })
	}
	try {
		user = await Users.findOne({ email: email });

		//if user already exist
		if (user) { return res.status(400).send({ msg: 'User Already Exist' }) };

		//creating new user
		const newUser = new Users(req.body);

		//Create salt and hash
		const salt = await bcrypt.genSalt(10);

		newUser.password = await bcrypt.hash(req.body.password || "", salt);

		try {
			newUser.save(); //save the data to db
			return res
				.status(200)
				.send({ msg: 'Account created successfuly!', status: true, data: newUser });
		} catch (error) {
			return res.status(500).send({ msg: 'Account Not Created!' });
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({ msg: err });
	}



});

router.get('/show_users/:role', auth, async (req, res) => {
	const { current, search } = req.query;
	const { role } = req.params;
	try {
		let skip = 0;
		let take = 100; //in the case current page is not specified
		if (current) {
			skip = (current - 1) * 10
			take = 10;
		}
		// let caregiver = await CareGiver.find({ $or: [{ email: search }, { first_name: search }, { last_name: search }] }).skip(skip).limit(take);
		let users = await Users.find({ role }).select('-password').skip(skip).limit(take);
		if (!users) { res.status(400).send({ status: false, error: 'Problem with the query or user not found' }) };
		res.status(200).send({ status: true, data: users, count: users.length || 0 });

	} catch (err) {
		res.status(400).json({ msg: err });
	}
});

router.get('/show_all_users', auth, async (req, res) => {
	const { current, search } = req.query;
	try {
		let skip = 0;
		let take = 100; //in the case current page is not specified
		if (current) {
			skip = (current - 1) * 10
			take = 10;
		}
		// let caregiver = await CareGiver.find({ $or: [{ email: search }, { first_name: search }, { last_name: search }] }).skip(skip).limit(take);
		let users = await Users.find().select('-password').skip(skip).limit(take);
		if (!users) { res.status(400).send({ status: false, error: 'Problem with the query or user not found' }) };
		res.status(200).send({ status: true, data: users, count: users.length || 0 });

	} catch (err) {
		res.status(400).json({ msg: err });
	}
});

function checkDates(start1, end1) {
    if (!start1 || !end1) {
      return false;
    }
    const date = new Date();

    const start = new Date(start1);
    const end = new Date(end1);
    let result = null;

    if (date > start && date < end) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }


router.get('/show_all_contracts', auth, async (req, res) => {
	const { current, search } = req.query;
	try {
		let noContracts=[];
		let valid=[];
		let expired=[];

		let skip = 0;
		let take = 100; //in the case current page is not specified
		if (current) {
			skip = (current - 1) * 10
			take = 10;
		}
		// let caregiver = await CareGiver.find({ $or: [{ email: search }, { first_name: search }, { last_name: search }] }).skip(skip).limit(take);
		let users = await Users.find().select('-password');

		users.map((user)=>{
			if(user.Contracts.length>0){
				checkDates(user.Contracts[0].start_date, user.Contracts[0].end_date)?valid=[...valid,user]:expired=[...expired,user];
			}else{
				noContracts = [...noContracts, user];
			}
			user.Contracts.map((c)=>{

			})
		})
		if (!users) { res.status(400).send({ status: false, error: 'Problem with the query or user not found' }) };
		res.status(200).send({ status: true, data: users, count: users.length || 0 , noContracts, valid, expired});

	} catch (err) {
		res.status(400).json({ msg: err });
	}
});




router.get('/show_user_by_email/:email', auth, async (req, res) => {
	const { email } = req.params;
	try {
		// let caregiver = await CareGiver.find({ $or: [{ email: search }, { first_name: search }, { last_name: search }] }).skip(skip).limit(take);
		let users = await Users.findOne({ email }).select('-password');
		if (!users) { return res.status(400).send({ status: false, msg: 'User not found' }) };
		return res.status(200).send({ status: true, data: users });

	} catch (err) {
		return res.status(400).json({ msg: err });
	}
});


router.get('/get_counts', auth, async (req, res) => {
	try {
		// let caregiver = await CareGiver.find({ $or: [{ email: search }, { first_name: search }, { last_name: search }] }).skip(skip).limit(take);
		let users = await Users.find();
		let clients = await Users.countDocuments({ role: "client" });
		let contracts = 0;
		if (!users) { return res.status(400).send({ status: false, msg: 'User not found' }) };
		users.map((u) => {
			contracts += u.Contracts.length || 0;
		});
		return res.status(200).send({ status: true, data: { users: users.length, contracts, clients } });

	} catch (err) {
		return res.status(400).json({ msg: err });
	}
});

router.get('/get_counts/:email', auth, async (req, res) => {
	try {
		const { email } = req.params;
		// let caregiver = await CareGiver.find({ $or: [{ email: search }, { first_name: search }, { last_name: search }] }).skip(skip).limit(take);
		let invoices = await Invoice.countDocuments({ email });
		let client = await Users.find({ email });
		let contracts = client?.Contracts?.length || 0;

		return res.status(200).send({ status: true, data: { invoices, contracts } });

	} catch (err) {
		conso
		return res.status(400).json({ msg: err });
	}
});


//@routes GET api/user/loggedIn
//@desc Check if a user is loggedIn
router.get('/loggedIn', async (req, res) => {
	try {
		const token = req.headers.authorization;
		//check for token
		if (!token) {
			res.status(200).send(false);
		} else {
			jwt.verify(token, process.env.jwtSecret, function (err) {
				if (err) { res.status(200).send({ status: false }); }
				else { res.status(200).send(true) };
			})

		}
		//verify token

	} catch (e) {
		res.status(501).send(e);
	}
});




module.exports = router;