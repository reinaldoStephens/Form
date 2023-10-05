document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("showPassword").onclick = function () {
        if (this.checked) {
            document.getElementById("password").type = "text";
        } else {
            document.getElementById("password").type = "password";
        }
    };
    // username
    const usernameElem = document.getElementById("username");
    usernameElem?.addEventListener("blur", () => usernameValidation(usernameElem, 6, 18));
    avoidSpaces(usernameElem);
    usernameElem?.addEventListener("blur", validateForm);
    // email
    const emailElem = document.getElementById("email");
    emailElem?.addEventListener("blur", () => emailValidation(emailElem));
    avoidSpaces(emailElem);

    // password
    const passwordElem = document.getElementById("password");
    passwordElem?.addEventListener("blur", () => passwordValidation(passwordElem, 8, 16));
    avoidSpaces(passwordElem);

    // password confirmation
    const passwordConfirmElem = document.getElementById("passwordConfirm");
    passwordConfirmElem?.addEventListener("blur", () => passwordConfirmValidation());

    const formElem = document.getElementById("form");
    formElem?.addEventListener("submit", () => formSubmitValidation());
});

function avoidSpaces(pInputElem) {
    pInputElem.onkeydown = (e) => {
        if (e.code == "Space") e.preventDefault();
        pInputElem.value = pInputElem.value?.trim();
    };
}

function passwordValidationRegex(inputTextVal) {
    let regexPattern = /^(?=.*[-\#\$\.\%\&\@\!\+\=\\*])(?=.*[a-zA-Z])(?=.*\d).{8,16}$/;
    if (inputTextVal.match(regexPattern)) {
        return true;
    } else {
        return false;
    }
}

function inputFieldLengthValidation(pElem, pInputName, pMinNumberofChars, pMaxNumberofChars) {
    let inputValue = pElem.value;
    let helpMessage = "";
    if (inputValue.length < pMinNumberofChars || inputValue.length > pMaxNumberofChars) {
        // Error
        helpMessage = `${
            pInputName ? pInputName : "Length"
        } must be between ${pMinNumberofChars} and ${pMaxNumberofChars} characters long`;
    }

    return helpMessage;
}

function removeErrorMsj(pHelpMsjElem) {
    pHelpMsjElem?.setAttribute("data-error", "false");
    let parentElem = pHelpMsjElem.parentElement;
    let icon = parentElem.querySelector(".check-icon");
    if (icon) {
        icon.style.display = "flex";
    }

    let inputElem = parentElem.querySelector("input");
    inputElem?.classList.add("valid");
    inputElem?.classList.remove("invalid");
}

function setHelpMessage(pHelpMessage, pHelpMsjElem) {
    if (pHelpMessage) {
        if (pHelpMsjElem) {
            let parentElem = pHelpMsjElem.parentElement;
            pHelpMsjElem.setAttribute("data-error", "true");
            pHelpMsjElem.innerHTML = pHelpMessage;

            let icon = parentElem.querySelector(".check-icon");
            if (icon) {
                icon.style.display = "none";
            }

            let inputElem = parentElem.querySelector("input");
            inputElem?.classList.add("invalid");
            inputElem?.classList.remove("valid");
        }
    }
}

function usernameValidation(pElem, pMinNumberofChars, pMaxNumberofChars) {
    let inputValue = pElem.value;
    let helpMessage = "";
    let helpMsjElem = document.getElementById("username-help-text");

    if (inputValue) {
        helpMessage = inputFieldLengthValidation(pElem, "Username", pMinNumberofChars, pMaxNumberofChars);
        if (!helpMessage) {
            removeErrorMsj(helpMsjElem);
        }
    } else {
        // Error
        helpMessage = "Username cannot be blank";
    }

    setHelpMessage(helpMessage, helpMsjElem);
    validateForm();
}

function emailValidation(pElem) {
    let inputValue = pElem.value;
    let helpMessage = "";
    let helpMsjElem = document.getElementById("email-help-text");

    if (inputValue) {
        let expReg =
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        if (inputValue.match(expReg)) {
            removeErrorMsj(helpMsjElem);
        } else {
            helpMessage = "Invalid email address!";
        }
    } else {
        // Error
        helpMessage = "Email cannot be blank";
    }

    setHelpMessage(helpMessage, helpMsjElem);
    validateForm();
}

function passwordValidation(pElem, pMinNumberofChars, pMaxNumberofChars) {
    let inputValue = pElem.value;
    let passwordHelpMessage = "";
    let helpMsjElem = document.getElementById("password-help-text");

    if (inputValue) {
        passwordHelpMessage = inputFieldLengthValidation(pElem, "Password", pMinNumberofChars, pMaxNumberofChars);
        if (!passwordHelpMessage) {
            // Sucess
            removeErrorMsj(helpMsjElem);
            if (!passwordValidationRegex(inputValue)) {
                // Error
                passwordHelpMessage = `Password must contain at least one number and one special character`;
            } else {
                // Sucess
                removeErrorMsj(helpMsjElem);
            }
        }
    } else {
        // Error
        passwordHelpMessage = "Password cannot be blank";
    }

    setHelpMessage(passwordHelpMessage, helpMsjElem);
    validateForm();
}

function passwordConfirmValidation() {
    let pConfirmElem = document.getElementById("passwordConfirm");
    let passwordElem = document.getElementById("password");
    let helpMsjElem = document.getElementById("confirm-help-text");
    let passwordHelpMessage = "";
    let passwordConfirmValue = pConfirmElem.value;

    if (passwordElem.classList.contains("valid")) {
        if (passwordConfirmValue) {
            if (passwordElem.value != passwordConfirmValue) {
                passwordHelpMessage = "Passwords don't match";
            } else {
                // success
                removeErrorMsj(helpMsjElem);
            }
        } else {
            // Error
            setErrorMsj(pConfirmElem);
            passwordHelpMessage = "Password Confirm cannot be blank";
        }
    } else {
        // Error
        passwordHelpMessage = "Your password is invalid";
    }
    let passHelpMsjElem = document.getElementById("passwordConfirmHelpMsj");
    passHelpMsjElem?.setAttribute("data-error", passwordHelpMessage);

    setHelpMessage(passwordHelpMessage, helpMsjElem);
    validateForm();
}

function validateForm() {
    let usernameElem = document.getElementById("username");
    let emailElem = document.getElementById("email");
    let confirmElem = document.getElementById("passwordConfirm");
    let passwordElem = document.getElementById("password");
    let validInformation = false;
    if (
        usernameElem.classList.contains("valid") &&
        emailElem.classList.contains("valid") &&
        passwordElem.classList.contains("valid") &&
        confirmElem.classList.contains("valid")
    ) {
        validInformation = true;
    }

    let submitButtonElem = document.getElementById("submitButtom");
    if (submitButtonElem.disabled) {
        if (validInformation) {
            submitButtonElem.disabled = false;
        }
    } else {
        if (!validInformation) {
            submitButtonElem.disabled = true;
        }
    }
}

function formSubmitValidation() {
    let submitButtonElem = document.getElementById("submitButtom");
    let sendForm = submitButtonElem.disabled ? false : true;
    let modalMsj = document.getElementById("modalMsj");

    var modal = document.querySelector(".modal");
    modal.classList.add("show-modal");

    var closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => modal.classList.remove("show-modal"));

    if (!sendForm) {
        modalMsj.innerHTML = "<p style='color:red;'>Data invalid, not sent!<p>";
    } else {
        modalMsj.innerHTML = "<p style='color:green;'>Successfully submitted!<p>";
    }

    return sendForm;
}
