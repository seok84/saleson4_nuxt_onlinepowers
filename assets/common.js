export const showPasswordFn = (event) => {
	const inputElement = event.target.parentElement.querySelector("input");
	const buttonEleMent = event.target;
	if (inputElement) {
		if (inputElement.type === "password") {
			inputElement.type = "text";
			buttonEleMent.classList.add("active");
		} else {
			inputElement.type = "password";
			buttonEleMent.classList.remove("active");
		}
	}
};
