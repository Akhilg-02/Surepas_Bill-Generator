
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid2 as Grid,
  Button,
  IconButton,
  Divider,
  InputAdornment,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
// import { addItem, removeItem, updateItem } from "../store/slices/billSlice";

const BillItems = ({ currentBill, handleItemChange, handleRemoveItem, handleAddItem, errors }) => {
  if (!currentBill || !currentBill.items) {
    return <Typography>No items found</Typography>;
  }


  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Items</Typography>
      </Box>
      {currentBill.items.length > 0 ? (
        currentBill.items.map((item, index) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    required
                    label="Product Name"
                    value={item.productName}
                    onChange={(e) =>{
                        e.stopPropagation();
                        handleItemChange(item.id, "productName", e.target.value);
                      }}
                    error={!!errors.items?.[index]?.productName}
                    helperText={errors.items?.[index]?.productName}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    required
                    label="Quantity"
                    type="number"
                    value={item.productQuantity}
                    onChange={(e) =>{
                        e.stopPropagation();
                        handleItemChange(item.id, "productQuantity", Number.parseInt(e.target.value) || 0);
                      }}
                    slotProps={{ inputProps: { min: 1 } }}
                    error={!!errors.items?.[index]?.productQuantity}
                    helperText={errors.items?.[index]?.productQuantity}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    required
                    label="Price"
                    type="number"
                    value={item.productPrice}
                    onChange={(e) => {
                        e.stopPropagation();
                        handleItemChange(item.id, "productPrice", Number.parseFloat(e.target.value) || 0);
                      }}
                    slotProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        inputProps: { min: 0, step: 0.01 },
                      }}
                    error={!!errors.items?.[index]?.productPrice}
                    helperText={errors.items?.[index]?.productPrice}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    color="error"
                    onClick={handleRemoveItem(item.id)}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
              {index < currentBill.items.length - 1 && <Divider sx={{ my: 2 }} />}
            </Box>
          ))
      ) : (
        <Typography>No items available. Click "Add Item" to add a product.</Typography>
      )}


      <Button
        startIcon={<Add />}
        onClick={handleAddItem}
        sx={{ mt: 2 }}
      >
        Add Item
      </Button>
    </Paper>
  );
};

export default BillItems;
