const express = require('express');
const router = express.Router();
const {addService,editServiceChange} = require('../../utils/changes');
const {auth} = require('../../middleware/auth');
// Product Model
const Services = require('../../models/Service');

//@routes POST api/add_service/
//@desc create a service
//@response - status: true or false
// {
//     "service_name":"Changing of Screen",
//     "product_desc":"This service entails changing of screen",
//     "store":"storeid?"
// }

router.post('/add_service', auth, async(req,res)=>{
	const store = req.user.id;
    const newService = new Services(req.body);
	newService.store = store; 
    try{
        const service = await newService.save();
        if(service){
			const change = addService(newService);
            res.status(200).send({'status':true, message:change.message});
        }else{
            res.json({'status':false,'reason':"Error Creating Service"});
        }
    }catch(err){
		console.log(err);
        res.json({'status':false, 'reason':"Server Error"});;
    }

});


//@routes GET api/show_store_services/
//@desc Get all list of services provided by store
//@response - status: true or false | data | error
router.get('/show_store_services', auth, async (req, res) => {
	const store = req.user.id;
	const services = await Services.find({store});
	try {
		if (!services){res.status(400).send({status:false, error:'Problem with the query'})};
		res.status(200).send({status:true,data:services});
		console.log(services)
        
	} catch (err) {
		res.status(400).json({ msg: err });
	}
});


//@routes PUT api/update_service/
//@desc update service 
//@response - status: true or false | error
router.patch('/update_service', auth, async (req, res) => {
	try {
        const services = await Services.findByIdAndUpdate(req.body._id,req.body);
		if (!services){res.status(400).send({status:false, error:'Problem with the update query'})};
		
		//add change to system
		const cresult = await editServiceChange(services,req.body);
		console.log(cresult);
		res.status(200).send({status:true, change: cresult});
        
	} catch (err) {
		console.log(err);
		res.status(400).json({ msg: err });
	}
});



module.exports = router;