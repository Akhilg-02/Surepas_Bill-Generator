import { useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid2 as Grid,
  IconButton,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
} from "@mui/material"
import { Add, Delete} from "@mui/icons-material"
import { updateBillField, addItem, removeItem, updateItem, saveBillAndAddCustomer } from "../store/slices/billSlice"
import { billSchema } from "./Validation"
import DownloadInvoice from "./DownloadInvoice"
import BillItems from "./BillItems"



const BillGenerator = () => {
  const dispatch = useDispatch()
  const { currentBill } = useSelector((state) => state.bills)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [errors, setErrors] = useState({})

  const handleFieldChange = (field, value) => {
    dispatch(updateBillField({ field, value }))
  }

  const validateForm = () => {
    const billToValidate = {
      customerName: currentBill.customerName,
      customerMobile: currentBill.customerMobile,
      customerAddress: currentBill.customerAddress,
      billingDate: currentBill.billingDate,
      note: currentBill.note,
      items: currentBill.items.map(({ productName, productQuantity, productPrice }) => ({
        productName,
        productQuantity,
        productPrice,
      })),
    };
  
    const { error } = billSchema.validate(billToValidate, { abortEarly: false });
  
    if (!error) {
      setErrors({});
      return true;
    }
  
    const newErrors = {};
    error.details.forEach((err) => {
      const path = err.path.join(".");
      newErrors[path] = err.message;
    });
  
    setErrors(newErrors);
    return false;
  };

  const handleSaveBill = () => {
    if (validateForm()) {
      dispatch(saveBillAndAddCustomer())
      setOpenSuccessModal(true)
    }
  }

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false)
  }

    const handleItemChange = (id, field, value) => {
      dispatch(updateItem({ id, field, value }));
    };
  
    const handleAddItem = () => {
      dispatch(addItem())
    }
  
    const handleRemoveItem = (id) => {
      dispatch(removeItem(id))
    }


  return (
    <Box>
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        Bill Generator
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Customer Name"
              value={currentBill.customerName}
              onChange={(e) => handleFieldChange("customerName", e.target.value)}
              error={!!errors.customerName}
              helperText={errors.customerName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Customer Mobile Number"
              value={currentBill.customerMobile}
              onChange={(e) => handleFieldChange("customerMobile", e.target.value)}
              error={!!errors.customerMobile}
              helperText={errors.customerMobile}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Customer Address"
              value={currentBill.customerAddress}
              onChange={(e) => handleFieldChange("customerAddress", e.target.value)}
              error={!!errors.customerAddress}
              helperText={errors.customerAddress}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Billing Date"
              type="date"
              value={currentBill.billingDate}
              onChange={(e) => handleFieldChange("billingDate", e.target.value)}
              slotProps={{ shrink: true }}
              error={!!errors.billingDate}
              helperText={errors.billingDate}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Note"
              value={currentBill.note}
              onChange={(e) => handleFieldChange("note", e.target.value)}
              placeholder="Add any additional notes here"
            />
          </Grid>
        </Grid>
      </Paper>
      {/* Items code */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6">Items</Typography>
        </Box>

        {currentBill.items.map((item, index) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  required
                  label="Product Name"
                  value={item.productName}
                  onChange={(e) => handleItemChange(item.id, "productName", e.target.value)}
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
                  onChange={(e) => handleItemChange(item.id, "productQuantity", Number.parseInt(e.target.value))|| 0}
                  slotProps={{ inputProps: { min: 1 } }}
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
                  onChange={(e) => handleItemChange(item.id, "productPrice", Number.parseFloat(e.target.value))||0}
                  slotProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
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
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                {currentBill.items.length > 1 && (
                  <IconButton color="error" onClick={() => handleRemoveItem(item.id)}>
                    <Delete/>
                  </IconButton>
                )}
              </Grid>
            </Grid>
            {index < currentBill.items.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        ))}

        <Button startIcon={<Add/>} onClick={handleAddItem} sx={{ mt: 2 }}>
          Add field
        </Button>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Sub Total:</Typography>
              <Typography>${currentBill.subTotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Tax ({currentBill.taxRate}%):</Typography>
              <Typography>${currentBill.taxAmount.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${currentBill.totalAmount.toFixed(2)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <DownloadInvoice currentBill={currentBill} />
            <Button variant="contained" onClick={handleSaveBill}>
              Save Invoice
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Success Modal */}
      <Dialog open={openSuccessModal} onClose={handleCloseSuccessModal}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>Invoice has been successfully saved and added to the customer list.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default BillGenerator

