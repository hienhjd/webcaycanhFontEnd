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
const api1 = "https://nhom11t4sangca1.onrender.com/shipping/fee";

const AddressInput = () => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number

  const [loading, setLoading] = useState(false);
  const [savedAddress, setSavedAddress] = useState("");
  const [shippingFee, setShippingFee] = useState(null);

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

  const normalizeProvinceName = (name) => {
    if (!name) return "";
    return name
      .replace(/^Thành phố\s*/i, "") // Bỏ "Thành phố"
      .replace(/^Tỉnh\s*/i, "")      // Bỏ "Tỉnh"
      .replace(/^Thành\s*/i, "")     // Bỏ "Thành"
      .trim();
  };

  const handleSave = () => {
    if (!selectedCity || !selectedDistrict || !selectedWard || !phoneNumber) {
      alert("Vui lòng chọn đầy đủ tỉnh, quận, phường và nhập số điện thoại.");
      return;
    }

    const normalizedProvince = normalizeProvinceName(selectedCity.name);
    axios
      .post(api1, {
        province: normalizedProvince,
        district: selectedDistrict.name,
        ward: selectedWard.name,
      })
      .then((res) => {
        const full = `${selectedWard.name}, ${selectedDistrict.name}, ${selectedCity.name}`;
        localStorage.setItem("city", selectedCity.name);
        localStorage.setItem("district", selectedDistrict.name);
        localStorage.setItem("ward", selectedWard.name);
        localStorage.setItem("phoneNumber", phoneNumber); // Store phone number
        setSavedAddress(full);
        localStorage.setItem("total", res.data.total);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API shipping:", err.response?.data || err);
        alert("Đã xảy ra lỗi khi tính phí vận chuyển.");
      });
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

            <Grid item xs={12}>
              <TextField
                label="Số điện thoại"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                sx={{ mt: 2 }}
                type="tel"
              />
            </Grid>
          </Grid>
        </CardContent>

        <Divider sx={{ my: 2 }} />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
          disabled={
            !selectedCity ||
            !selectedDistrict ||
            !selectedWard ||
            !phoneNumber ||
            loading
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

          {shippingFee !== null && (
            <Typography sx={{ mt: 1, fontWeight: 500 }}>
              Phí vận chuyển:{" "}
              <strong>{shippingFee.toLocaleString()} VND</strong>
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default AddressInput;
