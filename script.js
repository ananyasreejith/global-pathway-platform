document.getElementById("studyForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const country = document.getElementById("country").value;

    const applicationId = "APP" + Math.floor(Math.random() * 100000);

    const applicationData = {
        name: name,
        email: email,
        country: country,
        status: "Application Submitted"
    };

    localStorage.setItem(applicationId, JSON.stringify(applicationData));

    document.getElementById("result").innerHTML =
        "✅ Application Submitted Successfully! <br> Your Application ID: <b>" +
        applicationId +
        "</b>";
});
function trackApplication() {
    const id = document.getElementById("trackId").value;
    const data = localStorage.getItem(id);

    if (data) {
        const app = JSON.parse(data);
        document.getElementById("trackResult").innerHTML =
            "Name: " + app.name + "<br>" +
            "Email: " + app.email + "<br>" +
            "Country: " + app.country + "<br>" +
            "Status: " + app.status;
    } else {
        document.getElementById("trackResult").innerHTML =
            "❌ Application ID not found";
    }
}