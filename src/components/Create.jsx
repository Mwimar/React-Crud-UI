import React, { useState } from "react";
import axios from "axios";
import {
    Typography,
    TextField,
    Button,
    Paper,
    Box,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const initialFormState = {
    postId: "",
    postProfile: "",
    reqExperience: 0,
    postTechStack: [],
    postDesc: "",
};

const Create = () => {
    const skillSet = ["JavaScript", "Java", "Python", "Django", "Rust"];
    const navigate = useNavigate();
    const [form, setForm] = useState(initialFormState);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/jobPosts", form);
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            postTechStack: checked
                ? [...prevForm.postTechStack, value]
                : prevForm.postTechStack.filter((skill) => skill !== value),
        }));
    };

    return (
        <Paper sx={{ padding: "2rem", maxWidth: "600px", margin: "2rem auto", borderRadius: "10px" }} elevation={3}>
            <Typography sx={{ textAlign: "center", fontWeight: "bold", color: "#333", mb: 2 }} variant="h5">
                Create New Job Post
            </Typography>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        type="number"
                        onChange={(e) => setForm({ ...form, postId: e.target.value })}
                        label="Post ID"
                        variant="outlined"
                        value={form.postId}
                        fullWidth
                    />
                    <TextField
                        required
                        onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
                        label="Job Profile"
                        variant="outlined"
                        value={form.postProfile}
                        fullWidth
                    />
                    <TextField
                        type="number"
                        required
                        onChange={(e) => setForm({ ...form, reqExperience: e.target.value })}
                        label="Years of Experience"
                        variant="outlined"
                        value={form.reqExperience}
                        fullWidth
                    />
                    <TextField
                        required
                        multiline
                        rows={4}
                        onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
                        label="Job Description"
                        variant="outlined"
                        value={form.postDesc}
                        fullWidth
                    />

                    {/* Skills Section */}
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                            Required Skills:
                        </Typography>
                        <FormGroup row>
                            {skillSet.map((skill, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={form.postTechStack.includes(skill)}
                                            onChange={handleCheckboxChange}
                                            value={skill}
                                        />
                                    }
                                    label={skill}
                                />
                            ))}
                        </FormGroup>
                    </Box>

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: "#1976d2",
                            color: "white",
                            "&:hover": { backgroundColor: "#1565c0" },
                            borderRadius: "5px",
                        }}
                        fullWidth
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default Create;
