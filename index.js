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
    // password
    const passwordElem = document.getElementById("password");
    passwordElem?.addEventListener("blur", () => passwordValidation(passwordElem, 8, 16));
    avoidSpaces(passwordElem);
    // password confirmation
    const passwordConfirmElem = document.getElementById("passwordConfirm");
    passwordConfirmElem?.addEventListener("blur", passwordConfirmValidation);
    const formElem = document.getElementById("testForm");
    formElem?.addEventListener("submit", formSubmitValidation);

    const emailElem = document.getElementById("email");
    emailElem?.addEventListener("blur", validateForm);
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

function setErrorMsj(pElem) {
    addInvalidClass(pElem);
    removeValidClass(pElem);
}

function addValidClass(pElem) {
    if (!pElem.classList.contains("valid")) pElem.classList.add("valid");
}

function removeValidClass(pElem) {
    if (pElem.classList.contains("valid")) pElem.classList.remove("valid");
}

function addInvalidClass(pElem) {
    if (!pElem.classList.contains("invalid")) pElem.classList.add("invalid");
}

function removeInvalidClass(pElem) {
    if (pElem.classList.contains("invalid")) pElem.classList.remove("invalid");
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
    let icon = pHelpMsjElem.parentElement.querySelector(".check-icon");
    if (icon) {
        icon.style.display = "flex";
    }
}

function setHelpMessage(pHelpMessage, pHelpMsjElem) {
    if (pHelpMessage) {
        if (pHelpMsjElem) {
            pHelpMsjElem.setAttribute("data-error", "true");
            pHelpMsjElem.innerHTML = pHelpMessage;

            let icon = pHelpMsjElem.parentElement.querySelector(".check-icon");
            if (icon) {
                icon.style.display = "none";
            }
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

    //validateForm();
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

    //validateForm();
}

function passwordConfirmValidation() {
    let pConfirmElem = document.getElementById("passwordConfirm");
    let passwordElem = document.getElementById("password");
    let passwordHelpMessage = "";
    let passwordConfirmValue = pConfirmElem.value;

    if (passwordElem.classList.contains("valid")) {
        if (passwordConfirmValue) {
            if (passwordElem.value != passwordConfirmValue) {
                // Error
                setErrorMsj(pConfirmElem);
                passwordHelpMessage = "Passwords don't match";
            } else {
                // success
                removeErrorMsj(pConfirmElem);
            }
        } else {
            // Error
            setErrorMsj(pConfirmElem);
            passwordHelpMessage = "Password Confirm cannot be blank";
        }
    } else {
        // Error
        setErrorMsj(pConfirmElem);
        passwordHelpMessage = "Your password is invalid";
    }
    let passHelpMsjElem = document.getElementById("passwordConfirmHelpMsj");
    passHelpMsjElem?.setAttribute("data-error", passwordHelpMessage);

    // validateForm();
}

function validateForm() {
    let usernameElem = document.getElementById("username");
    let emailElem = document.getElementById("email");
    let confirmElem = document.getElementById("passwordConfirm");
    let passwordElem = document.getElementById("password");
    let validInformation = false;
    if (
        usernameElem.value &&
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
    let confirmElem = document.getElementById("passwordConfirm");
    let passwordElem = document.getElementById("password");
    let sendForm = true;
    if (!passwordElem.classList.contains("valid")) {
        sendForm = false;
    } else if (!confirmElem.classList.contains("valid")) {
        sendForm = false;
    }

    let modalElem = document.getElementById("modal1");
    let modalMsj = document.getElementById("modalMsj");

    if (!sendForm) {
        modalMsj.innerHTML = "<p style='color:red;'>Data invalid, not sent!<p>";
        modalElem.M_Modal.open();
    } else {
        modalMsj.innerHTML = "<p style='color:green;'>Successfully submitted!<p>";
        modalElem.M_Modal.open();
    }

    return sendForm;
}
