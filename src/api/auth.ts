/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BASE_URL } from "constant";

// Interfaces
interface OTPParams {
	Rollno: string;
}

interface SignupParams {
	Rollno: string;
	Password: string;
	OTP: string;
}

interface LoginParams {
	Rollno: string;
	Password: string;
}

interface Response {
	Payload: any;
	Status: any;
	Token?: any;
}

// API
const postOTP = async (params: OTPParams): Promise<Response> => {
	let payload, status;
	await axios.post(`${BASE_URL}/auth/otp`, {
		Rollno: params.Rollno,
	}).then(res => {
		payload = res.data;
		status = res.status;
	}).catch(err => {
		payload = err.response.data;
		status = err.response.status;
	});

	const response: Response = {
		Payload: payload,
		Status: status
	};
	return response;
};

const postSignup = async (params: SignupParams): Promise<Response> => {
	let payload, status;
	await axios.post(`${BASE_URL}/auth/signup`, {
		Rollno: params.Rollno,
		Password: params.Password,
		OTP: params.OTP
	}).then(res => {
		payload = res.data;
		status = res.status;
	}).catch(err => {
		payload = err.response.data;
		status = err.response.status;
	});
	const response: Response = {
		Payload: payload,
		Status: status
	};
	return response;
};

const postLogin = async (params: LoginParams): Promise<Response> => {
	let payload, status;
	let token: any;
	await axios.post(`${BASE_URL}/auth/login`, {
		Rollno: params.Rollno,
		Password: params.Password
	}).then(res => {
		token = res.headers["set-cookie"][0];
		payload = res.data;
		status = res.status;
	}).catch(err => {
		payload = err.response.data;
		status = err.response.status;
	});
	const response: Response = {
		Payload: payload,
		Status: status,
		Token: token
	};
	return response;
};

const postLogout = async (token: string): Promise<Response> => {
	let payload, status;
	await axios.post(`${BASE_URL}/auth/logout`, {}, {
		headers: {
			"Cookie": token
		}
	}).then(res => {
		payload = res.data;
		status = res.status;
	}).catch(err => {
		payload = err.response.data;
		status = err.response.status;
	});
	const response: Response = {
		Payload: payload,
		Status: status
	};
	return response;
};

export {
	OTPParams,
	SignupParams,
	LoginParams,
	postOTP,
	postSignup,
	postLogin,
	postLogout
};