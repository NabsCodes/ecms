const BackEnd = process.env.REACT_APP_BackEndHost;
export const caregiver = {
	//take in a body with data
	//data :  
	addCareGiver: `${BackEnd}/api/caregiver/add_caregiver`,
	updateCareGiver: `${BackEnd}/api/caregiver/update_caregiver`,
	//---------------------------------------------------------------------------------------------------

	showCareGiver: `${BackEnd}/api/caregiver/show_caregivers`,
	//---------------------------------------------------------------------------------------------------

	showAllCareGivers: `${BackEnd}/api/caregiver/show_all_caregivers`,
	//---------------------------------------------------------------------------------------------------

};
export const schedule = {
	//take in a body with data
	//data :  
	addSchedule: `${BackEnd}/api/schedule/add_schedule`,
	updateSchedule: `${BackEnd}/api/schedule/update_schedule`,
	//---------------------------------------------------------------------------------------------------

	showSchedule: `${BackEnd}/api/schedule/show_schedule`,
	//---------------------------------------------------------------------------------------------------

	showAllSchedules: `${BackEnd}/api/schedule/show_all_schedules`,
	//---------------------------------------------------------------------------------------------------

};

export const invoice_api = {
	//take in a body with data
	//data :  
	addInvoice: `${BackEnd}/api/invoice/add_invoice`,
	updateInvoice: `${BackEnd}/api/invoice/update_invoice`,
	//---------------------------------------------------------------------------------------------------

	showInvoices: `${BackEnd}/api/invoice/show_invoices`,
	showInvoice: `${BackEnd}/api/invoice/show_invoice`,
	//---------------------------------------------------------------------------------------------------
};


export const user = {
	addUser: `${BackEnd}/api/user/add_user`,
	updateUser: `${BackEnd}/api/user/update_user`,
	getCounts: `${BackEnd}/api/user/get_counts`,
	showUsers: `${BackEnd}/api/user/show_users`,
	showAllContracts: `${BackEnd}/api/user/show_all_contracts`,
	showAllUsers: `${BackEnd}/api/user/show_all_users`,
	showUserByEmail: `${BackEnd}/api/user/show_user_by_email`
};
export const authenticate = {
	//takes in token as http cookie
	//data : [verifyToken]
	verifyAcct: `${BackEnd}/api/user/verifyAccount/`,

	//takes in password + token as http cookie
	//data : [verifyToken]
	passwordReset: `${BackEnd}/api/user/passwordReset/`,

	//takes http cookie token and checks if a user is logged in
	//data : requires token to be set - user login
	loggedIn: `${BackEnd}/api/user/loggedIn`,

	//sends a reset link to specified user email
	//data : email
	forgotPassword: `${BackEnd}/api/user/forgotPassword`,

	//destroys cookie
	logout: `${BackEnd}/api/user/logout`,

	//destroys cookie
	addUser: `${BackEnd}/api/user/add_user`,

	//give logged in user data
	getUserData: `${BackEnd}/api/auth/user`,

	//---------
	userAuth: `${BackEnd}/api/auth`
};
