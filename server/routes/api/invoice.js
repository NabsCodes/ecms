const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth');
// Invoice
const Invoices = require('../../models/Invoice');

router.post('/add_invoice', auth, async (req, res) => {
	const newInvoice = new Invoices(req.body);
	try {
		const invoice = await newInvoice.save();
		if (invoice) {
			res.status(200).send({ 'status': true, message: "Invoice created successfully.", data: invoice });
		} else {
			res.json({ 'status': false, 'reason': "Error Creating Invoice" });
		}
	} catch (err) {
		console.log(err);
		res.json({ 'status': false, 'reason': "Server Error" });;
	}

});


router.get('/show_invoices', auth, async (req, res) => {
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
		let invoices = await Invoices.find({ role }).skip(skip).limit(take);
		if (!invoices) { res.status(400).send({ status: false, error: 'Problem with the query or invoice not found' }) };
		res.status(200).send({ status: true, data: invoices, count: invoices.length || 0 });

	} catch (err) {
		res.status(400).json({ msg: err });
	}
});

router.get('/show_invoice/:email', auth, async (req, res) => {
	const { current, search } = req.query;
	const { email } = req.params;
	try {
		let skip = 0;
		let take = 100; //in the case current page is not specified
		if (current) {
			skip = (current - 1) * 10
			take = 10;
		}
		let invoices = await Invoices.find({ email }).skip(skip).limit(take);
		if (!invoices) { res.status(400).send({ status: false, error: 'Problem with the query or invoice not found' }) };
		res.status(200).send({ status: true, data: invoices, count: invoices.length || 0 });

	} catch (err) {
		res.status(400).json({ msg: err });
	}
});


//@routes PUT api/update_service/
//@desc update service 
//@response - status: true or false | error
router.patch('/update_invoice', auth, async (req, res) => {
	try {
		const services = await Invoices.findByIdAndUpdate(req.body._id, req.body);
		if (!services) { res.status(400).send({ status: false, error: 'Problem with the update query' }) };

		res.status(200).send({ status: true, msg: "Invoice updated successfully" });

	} catch (err) {
		console.log(err);
		res.status(400).json({ msg: err });
	}
});



module.exports = router;