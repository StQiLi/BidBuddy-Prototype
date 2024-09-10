import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, Container, Typography } from '@mui/material';

function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

function getRandomIntBetween(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;

}
  
const FormComponent = () => {
    const [formValues, setFormValues] = useState({
      lotSize1: '',
      lotSize2: '', // Added for completeness
      yearBuilt: '',
      bldgSize: '', // Added for completeness
      livingSize: '',
      roomsTotal: '', // Added for completeness
      beds: '',
      bathsTotal: '',
      bsmtSize: '', // Added for completeness
      condition: '',
      latitude: '', // Added for completeness
      longitude: '', // Added for completeness
      distance: '', // Added for completeness
      saleTransType: '', // Added for completeness
      daysFromSaleRecDate: '', // Added for completeness
      mktTtlValue: '',
      assdTtlValue: '', // Added for completeness
      taxAmt: '',
      taxYear: '' // Added for completeness
    });
  
    const [prediction, setPrediction] = useState(null); // To store the prediction result
  
    // Additional static or dynamic data
    const additionalData = {
        lotSize1: getRandomBetween(0.0277778, 0.1434803),
        lotSize2: getRandomBetween(), // Added for completeness
        bldgSize: getRandomBetween(), // Added for completeness
        roomsTotal: getRandomBetween(), // Added for completeness
        bsmtSize: getRandomBetween(), // Added for completeness
        latitude: getRandomBetween(), // Added for completeness
        longitude: getRandomBetween(), // Added for completeness
        distance: getRandomBetween(), // Added for completeness
        saleTransType: getRandomBetween(), // Added for completeness
        daysFromSaleRecDate: getRandomBetween(), // Added for completeness
        assdTtlValue: getRandomBetween(), // Added for completeness
        taxYear: getRandomBetween(), // Added for completeness
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Combine form values with additional data and ensure the correct order
      const requestData = {
        lotSize1: formValues.lotSize1,
        lotSize2: formValues.lotSize2,
        yearBuilt: formValues.yearBuilt,
        bldgSize: formValues.bldgSize,
        livingSize: formValues.livingSize,
        roomsTotal: formValues.roomsTotal,
        beds: formValues.beds,
        bathsTotal: formValues.bathsTotal,
        bsmtSize: formValues.bsmtSize,
        condition: formValues.condition,
        latitude: additionalData.latitude,
        longitude: additionalData.longitude,
        distance: formValues.distance,
        saleTransType: additionalData.saleTransType,
        daysFromSaleRecDate: additionalData.daysFromSaleRecDate,
        mktTtlValue: formValues.mktTtlValue,
        assdTtlValue: formValues.assdTtlValue,
        taxAmt: formValues.taxAmt,
        taxYear: formValues.taxYear
      };
    // Construct the POST request
    const response = await fetch('http://localhost:6007/train_model_predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });

    const data = await response.json();
    setPrediction(data.predictions[0]); 
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Try out the Model
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Market Total Value */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="mktTtlValue"
              label="Listing Price"
              value={formValues.mktTtlValue}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Year Built */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="yearBuilt"
              label="Year Built"
              value={formValues.yearBuilt}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Living Size */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="livingSize"
              label="Living Size (sqft)"
              value={formValues.livingSize}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Number of Beds */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="beds"
              label="Number of Beds"
              value={formValues.beds}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Total Baths */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="bathsTotal"
              label="Total Baths"
              value={formValues.bathsTotal}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Condition */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="condition"
              label="Condition"
              value={formValues.condition}
              onChange={handleChange}
              select
              fullWidth
            >
              <MenuItem value="Excellent">Excellent</MenuItem>
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Average">Average</MenuItem>
              <MenuItem value="Poor">Poor</MenuItem>
            </TextField>
          </Grid>

          {/* Tax Amount */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="taxAmt"
              label="Tax Amount"
              value={formValues.taxAmt}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Display the prediction result */}
      {prediction && (
        <Typography variant="h6" color="secondary" gutterBottom>
          Predicted Price: ${prediction}
        </Typography>
      )}
    </Container>
  );
};

export default FormComponent;
