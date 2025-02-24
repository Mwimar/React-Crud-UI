import React from "react";
import { AppBar, Toolbar, Box, Typography, Button, Container } from "@mui/material";

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#2b2d42", padding: "0.5rem" }}>
            <Container maxWidth="lg">
                <Toolbar>
                    {/* Logo / Title */}
                    <Typography
                        variant="h5"
                        sx={{
                            flexGrow: 1,
                            fontWeight: "bold",
                            color: "#89cff0",
                            fontFamily: "sans-serif",
                        }}
                    >
                        Job Portal
                    </Typography>

                    {/* Navigation Buttons */}
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Button
                            variant="outlined"
                            href="http://localhost:3000"
                            sx={{
                                color: "#ffffff",
                                borderColor: "#89cff0",
                                "&:hover": { backgroundColor: "#89cff0", color: "#2b2d42" },
                            }}
                        >
                            Home
                        </Button>

                        <Button
                            variant="outlined"
                            href="http://localhost:3000/create"
                            sx={{
                                color: "#ffffff",
                                borderColor: "#89cff0",
                                "&:hover": { backgroundColor: "#89cff0", color: "#2b2d42" },
                            }}
                        >
                            Add Job
                        </Button>

                        <Button
                            variant="outlined"
                            href="https://github.com/Mwimar"
                            sx={{
                                color: "#ffffff",
                                borderColor: "#89cff0",
                                "&:hover": { backgroundColor: "#89cff0", color: "#2b2d42" },
                            }}
                        >
                            Contact Us
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
