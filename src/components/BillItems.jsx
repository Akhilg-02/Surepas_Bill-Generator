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
import { addItem, removeItem, updateItem } from "../store/slices/billSlice";
import { useDispatch } from "react-redux";

const BillItems = ({ items, errors }) => {
  const dispatch = useDispatch();

  const handleItemChange = (id, field, value) => {
    dispatch(updateItem({ id, field, value }));
  };

  const handleAddItem = () => {
    dispatch(addItem());
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

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
      {items.map((item, index) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                required
                label="Product Name"
                value={item.productName}
                onChange={(e) =>
                  handleItemChange(item.id, "productName", e.target.value)
                }
                error={!!errors.items?.[index]?.productName}
                helperText={errors.items?.[index]?.productName}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                required
                label="Quantity"
                type="number"
                value={item.productQuantity}
                onChange={(e) =>
                  handleItemChange(
                    item.id,
                    "productQuantity",
                    Number.parseInt(e.target.value) || 0
                  )
                }
                slotProps={{ min: 1 }}
                error={!!errors.items?.[index]?.productQuantity}
                helperText={errors.items?.[index]?.productQuantity}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                required
                label="Price"
                type="number"
                value={item.productPrice}
                onChange={(e) =>
                  handleItemChange(
                    item.id,
                    "productPrice",
                    Number.parseFloat(e.target.value) || 0
                  )
                }
                slotProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  inputProps: { min: 0, step: 0.01 },
                }}
                error={!!errors.items?.[index]?.productPrice}
                helperText={errors.items?.[index]?.productPrice}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Total"
                value={item.totalPrice.toFixed(2)}
                slotProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              {items.length > 1 && (
                <IconButton
                  color="error"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Delete />
                </IconButton>
              )}
            </Grid>
          </Grid>
          {index < items.length - 1 && <Divider sx={{ my: 2 }} />}
        </Box>
      ))}

      <Button startIcon={<Add />} onClick={handleAddItem} sx={{ mt: 2 }}>
        Add field
      </Button>
    </Paper>
  );
};

export default BillItems;
