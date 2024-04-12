{
	try {
		//---------Notifications Handling---------
		const notify = (type, message) => {
			let noty = {};
			noty[type] = {
				theme: "relax",
				text: message,
				type: type,
				layout: "topRight",
				progressBar: true,
				closeWith: ["click", "button"],
				timeout: 6000,
				sounds: {
					sources: ["/storage/sounds/Ting.mp3"],
					volume: 0.5,
					conditions: ["docHidden", "docVisible"],
				},
			};

		};

		//---------On Sign Up Form Submit---------
		document.querySelectorAll(".signup-btn").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();

				//FRONTEND VALIDATION :: Frontend Form Validation
				const name = document.getElementById("name").value.trim();
				const email = document.getElementById("email").value.trim();
				const pass = document.getElementById("password").value;
				const CPass = document.getElementById("confirm_password").value;
				const regex1 = /\S+@\S+\.\S+/;
				const regex2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				const at = email.indexOf("@");
				const dot = email.indexOf(".");

				//If name is empty
				if (name === "");
				//If email is empty
				if (email === "");
				//If password is empty
				if (pass === "");
				//If confirm password is empty
				if (CPass === "") {
					return;
				}
				//If name is less than 3 characters
				if (name.length < 3) {
					
					return;
				}
				//If password is less than 6 characters
				if (pass.length < 6) {
					
					return;
				}
				//If passwords do not match
				if (CPass !== pass) {
					
					return;
				}
				//For @ and . in email
				if (!email.match(regex1)) {
					
					return;
				}
				//For characters, digits, special characters, @ and . in email
				if (!email.match(regex2)) {
				
					return;
				}
				//For @ and . indexes in email
				if (at < 1 || dot < at + 2 || dot + 2 >= email.length) {
					
					return;
				}

				document.querySelector("form").submit();
			});
		});
	} catch (error) {
		console.log(error);
	}
}

try {
	//---------Redirect to Google Login---------
	document.querySelectorAll(".google-btn").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			window.location.href = "/auth/google";
		});
	});
} catch (error) {
	console.log(error);
}

try {
	//---------Redirect to Login Page---------
	document.querySelectorAll(".login-btn").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			window.location.href = "/";
		});
	});
} catch (error) {
	console.log(error);
}

try {
	//---------Change Header Title---------
	if (document.getElementById("User").value === "false") {
		if (window.location.pathname === "/signup") {
			document.querySelector("header h1").textContent = "Employee Sign Up";
		}
	}
} catch (error) {
	console.log(error);
}
