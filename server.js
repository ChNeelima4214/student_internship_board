const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const dataPath = path.join(__dirname, "data", "internship.json");

function readInternships() {
  const file = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(file).internships;
}

function response(status, data, pagination = null) {
  return {
    status,
    data,
    pagination
  };
}

app.get("/api/internships", (req, res) => {
  try {
    let internships = readInternships();

    const search = (req.query.search || "").toLowerCase();
    const domain = req.query.domain || "";
    const mode = req.query.mode || "";

    if (search) {
      internships = internships.filter((item) =>
        `${item.title} ${item.domain} ${item.location}`
          .toLowerCase()
          .includes(search)
      );
    }

    if (domain) {
      internships = internships.filter(
        (item) => item.domain === domain
      );
    }

    if (mode) {
      internships = internships.filter(
        (item) => item.mode === mode
      );
    }

    res.json(
      response("success", internships, {
        total: internships.length,
        page: 1,
        limit: internships.length
      })
    );
  } catch (error) {
    console.error("Failed to load internships:", error.message);

    res.status(500).json(
      response("error", {
        message: "Unable to load internships"
      })
    );
  }
});

app.get("/api/internships/:id", (req, res) => {
  try {
    const internships = readInternships();

    const internship = internships.find(
      (item) => item.id === req.params.id
    );

    if (!internship) {
      return res.status(404).json(
        response("error", {
          message: "Internship not found"
        })
      );
    }

    res.json(response("success", internship));
  } catch (error) {
    console.error("Failed to load internship:", error.message);

    res.status(500).json(
      response("error", {
        message: "Unable to load internship"
      })
    );
  }
});

app.use(express.static(path.join(__dirname, "public")));
const applicationsPath = path.join(__dirname, "data", "applications.json");

app.post("/api/applications", (req, res) => {
  try {
    const { internshipId, name, email } = req.body;

    if (
      typeof internshipId !== "string" ||
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json(
        response("error", { message: "Enter a valid name and email." })
      );
    }

    const internships = readInternships();
    const internship = internships.find(item => item.id === internshipId);

    if (!internship) {
      return res.status(404).json(
        response("error", { message: "Internship not found." })
      );
    }

    let applications = [];

    if (fs.existsSync(applicationsPath)) {
      applications = JSON.parse(fs.readFileSync(applicationsPath, "utf8"));
    }

    const duplicate = applications.some(
      item => item.internshipId === internshipId &&
        item.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (duplicate) {
      return res.status(409).json(
        response("error", { message: "You have already applied for this internship." })
      );
    }

    applications.push({
      internshipId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      submittedAt: new Date().toISOString()
    });

    fs.writeFileSync(
      applicationsPath,
      JSON.stringify(applications, null, 2),
      "utf8"
    );

    return res.status(201).json(
      response("success", { message: "Application submitted successfully." })
    );
  } catch (error) {
    console.error("Failed to save application:", error.message);
    return res.status(500).json(
      response("error", { message: "Unable to submit application." })
    );
  }
});

app.listen(PORT, () => {
  console.log(`Internship Board running at http://localhost:${PORT}`);
});