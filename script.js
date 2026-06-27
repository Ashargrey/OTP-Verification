emailjs.init("Enter Here Your Email.js Public Key");

let generatedOTP = "";

function showToast(text, color) {
    Toastify({
        text: text,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: color
        }
    }).showToast();
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendOTP() {
    let email = document.getElementById("email").value;
    let loader = document.getElementById("loader");

    if (!email) {
        showToast("Enter email first!", "red");
        return;
    }

    generatedOTP = generateOTP();
    loader.style.display = "block";

    emailjs.send("Enter Here Your Email.js Service ID", "Enter Here Your Email.js Template ID", {
        to_email: email,
        otp: generatedOTP
    })
        .then(() => {
            loader.style.display = "none";
            showToast("OTP sent successfully ✅", "green");

            document.getElementById("otp").disabled = false;
            document.getElementById("verifyBtn").disabled = false;
        })
        .catch((error) => {
            loader.style.display = "none";
            console.log(error);
            showToast("Failed to send OTP ❌", "red");
        });
}

document.querySelector("#verifyBtn").addEventListener("click", function () {
    let userOTP = document.getElementById("otp").value;

    if (userOTP === generatedOTP) {
        showToast("OTP Verified 🎉", "green");
    } else {
        showToast("Wrong OTP ❌", "red");
    }
});


