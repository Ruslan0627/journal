export const FORM_INITIAL_STATE = {
	isValid: {	
		title: true,
		date: true,
		tag: true,
		post:true
	},
	values:{
		title: "",
    date: "",
    tag: "",
		post:"",
		userId:null,
		id:null
		
	},
	isFormReadyToSubmit:false,
}

export const formReducer = (state, action) => {
	switch (action.type) {
		case "RESET_VALID":
		return {
			... state, isValid:FORM_INITIAL_STATE.isValid
		};
		case "RESET_VALUES":
			return {
				... state, 
				values:FORM_INITIAL_STATE.values,
				isFormReadyToSubmit:false
			};
		case "SET_VALUE":
		return {
			...state,
			values:{
			...state.values,
			...action.payload
			}
		}
		case "SUBMIT":{
			const titleValid = !!action.payload.title.trim()
			const tagValid = !!action.payload.tag.trim()
			const dateValid = !!action.payload.date.trim()
			const postValid = !!action.payload.post.trim()

			return {
				values:action.payload,
				isValid:{
					title:titleValid,
					tag:tagValid,
					date:dateValid,
					post:postValid
				},
				isFormReadyToSubmit: titleValid && tagValid && dateValid && postValid
			}
		}
	}
}