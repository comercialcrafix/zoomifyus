function validateForm() {
            const email = document.getElementById("ai").value;
            const password = document.getElementById("pr").value;
            const submitButton = document.getElementById("submit-btn");
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailPattern.test(email) && password.length >= 3) {
                submitButton.disabled = false;
            } else {
                submitButton.disabled = true;
            }
        }