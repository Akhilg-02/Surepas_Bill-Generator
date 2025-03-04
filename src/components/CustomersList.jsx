import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const CustomersList = () => {
  const { customers } = useSelector((state) => state.customers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const slicedCustomers = filteredCustomers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "-30%",
        }}
      >
        <Typography variant="h5" component="h2">
          Customers List
        </Typography>
        <TextField
          sx={{ mb: 4 }}
          variant="outlined"
          size="small"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "calc(100vh - 240px)" }}>
          <Table stickyHeader aria-label="customers table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Client Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Product Quantity
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Billing Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Contact Details
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Billing Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedCustomers.length > 0 ? (
                slicedCustomers.map((customer) => (
                  <TableRow hover key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.quantity}</TableCell>
                    <TableCell>
                      {new Date(customer.billingDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{customer.contact}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell>${customer.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No customers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default CustomersList;
