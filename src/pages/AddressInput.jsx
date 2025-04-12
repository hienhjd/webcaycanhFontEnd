
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  Card,
  CardContent,
  Divider,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import axios from "axios";

const API = "https://provinces.open-api.vn/api";

const AddressInput = () => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [loading, setLoading] = useState(false);
  const [savedAddress, setSavedAddress] = useState("");

  // Lấy danh sách tỉnh/thành phố
  useEffect(() => {
    axios
      .get(`${API}/p`)
      .then((res) => setCities(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Khi chọn tỉnh/thành, fetch thêm dữ liệu quận/huyện
  useEffect(() => {
    if (selectedCity?.code) {
      setLoading(true);
      axios
        .get(`${API}/p/${selectedCity.code}?depth=2`)
        .then((res) => {
          setDistricts(res.data.districts);
          setSelectedDistrict(null);
          setSelectedWard(null);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [selectedCity]);

  // Khi chọn quận/huyện, fetch thêm dữ liệu phường/xã
  useEffect(() => {
    if (selectedDistrict?.code) {
      setLoading(true);
      axios
        .get(`${API}/d/${selectedDistrict.code}?depth=2`)
        .then((res) => {
          setWards(res.data.wards);
          setSelectedWard(null);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [selectedDistrict]);

  const handleSave = () => {
    if (!selectedCity || !selectedDistrict || !selectedWard) {
      alert("Vui lòng chọn đầy đủ tỉnh, quận và phường.");
      return;
    }
    const full = `${selectedWard.name}, ${selectedDistrict.name}, ${selectedCity.name}`;
    setSavedAddress(full);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: 4,
        backgroundColor: "#FAFAFA",
        borderRadius: 2,
        boxShadow: 8,
        marginTop: 5,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: 4,
          fontWeight: 700,
          color: "#1A73E8",
        }}
      >
        Chọn địa chỉ của bạn
      </Typography>

      <Card
        sx={{
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 5,
          padding: 3,
        }}
      >
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                options={cities}
                getOptionLabel={(option) => option.name}
                value={selectedCity}
                onChange={(e, value) => setSelectedCity(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tỉnh / Thành phố"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>

            {selectedCity && (
              <Grid item xs={12}>
                <Autocomplete
                  options={districts}
                  getOptionLabel={(option) => option.name}
                  value={selectedDistrict}
                  onChange={(e, value) => setSelectedDistrict(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Quận / Huyện"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            )}

            {selectedDistrict && (
              <Grid item xs={12}>
                <Autocomplete
                  options={wards}
                  getOptionLabel={(option) => option.name}
                  value={selectedWard}
                  onChange={(e, value) => setSelectedWard(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Phường / Xã"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>

        <Divider sx={{ my: 2 }} />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
          disabled={
            !selectedCity || !selectedDistrict || !selectedWard || loading
          }
          sx={{ py: 1.5, fontWeight: "bold" }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Lưu địa chỉ"
          )}
        </Button>
      </Card>

      {savedAddress && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CheckCircle sx={{ fontSize: 30, color: "#4caf50" }} />
          <Typography sx={{ mt: 1, fontWeight: 500 }}>
            Địa chỉ đã lưu: <strong>{savedAddress}</strong>
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default AddressInput;

