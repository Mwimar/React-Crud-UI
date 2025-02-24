import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Paper, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const initial = {
  postId: "",
  postProfile: "",
  reqExperience: 0,
  postTechStack: [],
  postDesc: "",
};

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const currId = location?.state?.id || null;


  useEffect(() => {
    if (!currId) {
      console.error("No job ID provided!");
      return;
    }

    axios.get(`http://localhost:8080/jobPosts/${currId}`)
        .then((response) => setForm(response.data))
        .catch((err) => console.error("Error fetching job data:", err));
  }, [currId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currId) {
      console.error("No job ID provided!");
      return;
    }

    axios.put(`http://localhost:8080/jobPosts/${currId}`, form)
        .then((resp) => {
          console.log("Job updated successfully:", resp.data);
          navigate("/"); // Redirect after successful update
        })
        .catch((error) => console.error("Error updating job:", error));
  };


  const skillSet = ["Javascript", "Java", "Python", "Django", "Rust"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
      <Paper sx={{ padding: "1%" }} elevation={0}>
        <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
          Edit Job Post
        </Typography>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>

            <TextField
                type="number"
                sx={{ width: "50%", margin: "2% auto" }}
                name="postId"
                label="Post ID"
                variant="outlined"
                value={form.postId}
                disabled
            />

            <TextField
                type="text"
                sx={{ width: "50%", margin: "2% auto" }}
                name="postProfile"
                label="Job Profile"
                variant="outlined"
                value={form.postProfile}
                onChange={handleChange}
                required
            />

            <TextField
                type="number"
                sx={{ width: "50%", margin: "2% auto" }}
                name="reqExperience"
                label="Years of Experience"
                variant="outlined"
                value={form.reqExperience}
                onChange={handleChange}
                required
            />

            <TextField
                type="text"
                sx={{ width: "50%", margin: "2% auto" }}
                name="postDesc"
                label="Job Description"
                variant="outlined"
                multiline
                rows={4}
                value={form.postDesc}
                onChange={handleChange}
                required
            />

            <Box sx={{ margin: "1% auto" }}>
              <h3>Required Skills</h3>
              <ul>
                {skillSet.map((name, index) => (
                    <li key={index}>
                      <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name="postTechStack"
                          value={name}
                          checked={form.postTechStack.includes(name)}
                          onChange={handleChange}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                    </li>
                ))}
              </ul>
            </Box>

            <Button sx={{ width: "50%", margin: "2% auto" }} variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
  );
};

export default Edit;
