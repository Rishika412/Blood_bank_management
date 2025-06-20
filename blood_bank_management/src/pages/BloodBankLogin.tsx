import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Favorite, Login as LoginIcon } from "@mui/icons-material";
import axios from "axios";

const BloodBankLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://blood-bank-management-reot.onrender.com/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/admin");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#ffebee" }}>
      <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3, borderRadius: 2, border: "1px solid #e57373" }}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <Favorite color="error" sx={{ fontSize: 48 }} />
          </div>
          <Typography variant="h5" align="center" color="error" fontWeight="bold">
            Blood Bank Login
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
            Donate Blood, Save Lives
          </Typography>
          <form onSubmit={handleLogin} style={{ marginTop: 16 }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" fullWidth variant="contained" color="error" startIcon={<LoginIcon />} sx={{ marginTop: 2 }}>
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center" color="textSecondary" style={{ marginTop: 16 }}>
            Don't have an account? <Link to="/signup" style={{ color: "#d32f2f", textDecoration: "none" }}>Sign Up</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BloodBankLogin;
