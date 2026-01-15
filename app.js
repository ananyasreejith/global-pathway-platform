/* TOGGLE STUDY / WORK FIELDS */
function toggleFields() {
    const purpose = document.getElementById("purpose").value;

    const studyFields = document.getElementById("studyFields");
    const workFields = document.getElementById("workFields");
    const resultSection = document.getElementById("resultSection");

    if (studyFields) studyFields.style.display = "none";
    if (workFields) workFields.style.display = "none";
    if (resultSection) resultSection.style.display = "none";

    if (purpose === "study" && studyFields) {
        studyFields.style.display = "block";
    }

    if (purpose === "work" && workFields) {
        workFields.style.display = "block";
    }
}

/* SUBMIT APPLICATION (STUDY + WORK) */
function submitApplication(event) {
    event.preventDefault();

    const purpose = document.getElementById("purpose").value;
    const country = document.getElementById("country").value;
    const course = document.getElementById("course")?.value || "";
    const job = document.getElementById("jobTitle")?.value || "";

    /* Generate Application ID */
    const applicationId = "APP" + Math.floor(1000 + Math.random() * 9000);

    const application = {
        id: applicationId,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        country: country,
        purpose: purpose,
        course: course,
        job: job,
        status: "Under Review"
    };

    /* Store in localStorage for tracking */
    localStorage.setItem(applicationId, JSON.stringify(application));

    /* Show results section */
    const resultSection = document.getElementById("resultSection");
    const resultTitle = document.getElementById("resultTitle");
    const resultContent = document.getElementById("resultContent");

    if (resultSection) {
        resultSection.style.display = "block";

        if (purpose === "study") {
            resultTitle.innerText = "Top Universities for " + course;
            resultContent.innerHTML = getUniversities(country, course);
        }

        if (purpose === "work") {
            resultTitle.innerText = "Job Opportunities for " + job;
            resultContent.innerHTML = getJobs(country, job);
        }
    }

    alert(
        "Application submitted successfully!\n" +
        "Your Application ID: " + applicationId
    );

    event.target.reset();
}

/* TRACK APPLICATION (USED IN TRACK PAGE) */
function trackApplication() {
    const id = document.getElementById("trackId").value;
    const data = localStorage.getItem(id);

    if (data) {
        const app = JSON.parse(data);
        document.getElementById("trackResult").innerHTML =
            "Name: " + app.name + "<br>" +
            "Country: " + app.country + "<br>" +
            "Purpose: " + app.purpose + "<br>" +
            "Status: <b>" + app.status + "</b>";
    } else {
        document.getElementById("trackResult").innerText =
            "Application not found!";
    }
}

/* UNIVERSITY DATA */
function getUniversities(country, course) {
    country = country.toLowerCase();

    if (country.includes("usa")) {
        return `
            Harvard University – ${course}<br>
            MIT – ${course}<br>
            Stanford University – ${course}<br>
            UCLA – ${course}
        `;
    }

    if (country.includes("canada")) {
        return `
            University of Toronto – ${course}<br>
            UBC – ${course}<br>
            McGill University – ${course}<br>
            University of Waterloo – ${course}
        `;
    }

    if (country.includes("uk")) {
        return `
            Oxford University – ${course}<br>
            Cambridge University – ${course}<br>
            Imperial College London – ${course}<br>
            UCL – ${course}
        `;
    }

    return "Universities will be suggested after profile evaluation.";
}

/* JOB DATA */
function getJobs(country, job) {
    country = country.toLowerCase();

    if (country.includes("usa")) {
        return `
            ${job} – Google<br>
            ${job} – Amazon<br>
            ${job} – Microsoft<br>
            ${job} – Tesla
        `;
    }

    if (country.includes("canada")) {
        return `
            ${job} – Shopify<br>
            ${job} – RBC<br>
            ${job} – Infosys Canada<br>
            ${job} – TD Bank
        `;
    }

    if (country.includes("uk")) {
        return `
            ${job} – NHS<br>
            ${job} – Deloitte UK<br>
            ${job} – Barclays<br>
            ${job} – PwC UK
        `;
    }

    return "Job opportunities will be shared after profile review.";
}
