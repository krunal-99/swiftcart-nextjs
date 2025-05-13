import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  Alert,
  Divider,
} from "@mui/material";
import {
  LocalShipping as TruckIcon,
  Add as AddIcon,
  Save,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { handleError } from "../utils/utils";
import { useQuery } from "@tanstack/react-query";
import { requiredFieldsCheckOut } from "../data/data";
import { Address } from "../data/types";
import { RootState } from "@/components/Providers";
import { getUserAddresses } from "@/utils/address";

interface CheckoutFormProps {
  onSubmit: (formData: Record<string, any>) => void;
  loading: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, loading }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    is_default: false,
    userId: user?.id,
  });

  const {
    data: addressesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["addresses", user?.id],
    queryFn: getUserAddresses,
    enabled: !!user?.id,
  });

  const addresses: Address[] = addressesData?.data || [];
  const hasAddresses = addresses.length > 0;

  useEffect(() => {
    if (!isLoading && !hasAddresses) {
      setShowAddressForm(true);
    } else if (hasAddresses) {
      const defaultAddress = addresses.find((addr) => addr.is_default);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
      } else if (addresses.length > 0) {
        setSelectedAddressId(addresses[0].id);
      }
    }
  }, [addresses, isLoading, hasAddresses]);

  useEffect(() => {
    if (user?.id) {
      setFormData((prev) => ({
        ...prev,
        userId: user.id,
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddressSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddressId(Number(e.target.value));
  };

  const handleAddNewAddressClick = () => {
    setShowAddressForm(true);
    setSelectedAddressId(null);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const missingFields = requiredFieldsCheckOut.filter(
      (field) => !formData[field as keyof typeof formData]
    );
    if (missingFields.length > 0) {
      handleError(`All fields are required`);
      return;
    }
    if (!formData.userId) {
      handleError("User Id is missing");
      return;
    }
    onSubmit({ ...formData, saveAddressOnly: true });
    setShowAddressForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAddressId) {
      onSubmit({
        addressId: selectedAddressId,
        userId: user?.id,
      });
    } else {
      handleError("Please select an address or add a new one.");
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      is_default: false,
      userId: user?.id,
    });
  };

  useEffect(() => {
    if (!loading) {
      resetForm();
    }
  }, [loading]);

  const renderAddressForm = () => (
    <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 2 }}>
      <CardHeader
        title="Add New Shipping Address"
        subheader="Please fill in your shipping details"
        avatar={<TruckIcon color="primary" />}
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Street Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
        />
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <TextField
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <TextField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.is_default}
              onChange={handleChange}
              name="is_default"
              color="primary"
            />
          }
          label="Set as default address"
        />
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSaveAddress}
          disabled={loading}
          sx={{ mt: 1 }}
          color="secondary"
        >
          {loading ? "Saving..." : "Save Address"}
        </Button>
      </CardContent>
    </Card>
  );

  const renderAddressSelector = () => (
    <>
      <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 3 }}>
        <CardHeader
          title="Your Shipping Addresses"
          subheader="Select an address for delivery"
          avatar={<TruckIcon color="primary" />}
        />
        <CardContent>
          {isLoading ? (
            <Typography>Loading addresses...</Typography>
          ) : isError ? (
            <Alert severity="error">
              Error loading your addresses. Please try again.
            </Alert>
          ) : addresses.length > 0 ? (
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={selectedAddressId || ""}
                onChange={handleAddressSelection}
              >
                {addresses.map((address) => (
                  <Box
                    key={address.id}
                    sx={{
                      mb: 2,
                      p: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                      borderLeft: address.is_default ? 4 : 1,
                      borderLeftColor: address.is_default
                        ? "primary.main"
                        : "divider",
                    }}
                  >
                    <FormControlLabel
                      value={address.id}
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {address.first_name} {address.last_name}
                            {address.is_default && (
                              <Typography
                                component="span"
                                variant="caption"
                                sx={{ ml: 1, color: "primary.main" }}
                              >
                                (Default)
                              </Typography>
                            )}
                          </Typography>
                          <Typography variant="body2">
                            {address.street_address}, {address.city},{" "}
                            {address.state} {address.pincode}
                          </Typography>
                          <Typography variant="body2">
                            {address.country}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>
                ))}
              </RadioGroup>
            </FormControl>
          ) : (
            <Typography>
              No addresses found. Please add a new address.
            </Typography>
          )}
        </CardContent>
      </Card>

      {!showAddressForm && (
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddNewAddressClick}
          sx={{ mb: 3 }}
          variant="outlined"
          color="primary"
        >
          Add New Address
        </Button>
      )}

      {showAddressForm && (
        <>
          <Divider sx={{ my: 2 }} />
          {renderAddressForm()}
          {hasAddresses && (
            <Button
              onClick={() => setShowAddressForm(false)}
              sx={{ mb: 2 }}
              color="secondary"
            >
              Cancel
            </Button>
          )}
        </>
      )}
    </>
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 700,
        mx: "auto",
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {hasAddresses ? renderAddressSelector() : renderAddressForm()}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading || !selectedAddressId}
        sx={{ py: 1.5, fontSize: 16 }}
      >
        {loading ? "Processing..." : "Place Order"}
      </Button>
    </Box>
  );
};

export default CheckoutForm;
