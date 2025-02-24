import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Card, Grid, Typography, Box, IconButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [post, setPost] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInitialPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/jobPosts`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching job posts:", error);
            }
        };
        fetchInitialPosts();
    }, []);

    const handleEdit = (id) => {
        navigate("/edit", { state: { id } });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/jobPost/${id}`);
            setPost((prev) => prev.filter((p) => p.postId !== id)); // Optimistic UI update
        } catch (error) {
            console.error("Error deleting job post:", error);
        }
    };

    return (
        <Grid container spacing={3} sx={{ padding: "2%" }}>
            {post.length > 0 ? (
                post.map((p) => (
                    <Grid key={p.postId} item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                padding: "5%",
                                backgroundColor: "#2b2d42",
                                color: "#e0e0e0",
                                borderRadius: "12px",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                                transition: "transform 0.3s",
                                "&:hover": { transform: "scale(1.02)" },
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#89cff0" }}>
                                {p.postProfile}
                            </Typography>

                            <Typography sx={{ color: "#b0b0b0", marginTop: "1rem" }}>
                                <strong>Description:</strong> {p.postDesc}
                            </Typography>

                            <Typography sx={{ marginTop: "1rem" }}>
                                <strong>Experience:</strong> {p.reqExperience} years
                            </Typography>

                            <Typography sx={{ marginTop: "1rem" }}>
                                <strong>Skills:</strong> {p.postTechStack.join(", ")}
                            </Typography>

                            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                                <IconButton onClick={() => handleEdit(p.postId)} sx={{ color: "#89cff0", "&:hover": { color: "#ffffff" } }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(p.postId)} sx={{ color: "#ff6961", "&:hover": { color: "#ff0000" } }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Card>
                    </Grid>
                ))
            ) : (
                <Typography variant="h6" sx={{ textAlign: "center", color: "#b0b0b0", width: "100%" }}>
                    No job posts available
                </Typography>
            )}
        </Grid>
    );
};

export default Search;
