import {jsPDF} from "jspdf"
import autoTable from "jspdf-autotable"
import { Button } from "@mui/material"
import DownloadIcon from "@mui/icons-material/Download"

const DownloadInvoice = ({ currentBill }) => {
  const handleDownloadInvoice = () => {
    if (!currentBill || !currentBill.items.length) return

    const doc = new jsPDF()

    // Add company info
    doc.setFontSize(20)
    doc.text("INVOICE", 105, 20, { align: "center" })

    doc.setFontSize(12)
    doc.text("Bill Management System", 20, 30)
    doc.text("Invoice #: " + currentBill.id.substring(0, 8), 20, 40)
    doc.text("Date: " + new Date(currentBill.billingDate).toLocaleDateString(), 20, 50)

    // Add customer info
    doc.text("Bill To:", 120, 30)
    doc.text(currentBill.customerName, 120, 40)
    doc.text(currentBill.customerMobile, 120, 50)
    doc.text(currentBill.customerAddress, 120, 60)

    // Add items table
    const tableColumn = ["Item", "Qty", "Price", "Total"]
    const tableRows = []

    currentBill.items.forEach((item) => {
      tableRows.push([
        item.productName,
        item.productQuantity,
        `$${item.productPrice.toFixed(2)}`,
        `$${item.totalPrice.toFixed(2)}`,
      ])
    })

     autoTable(doc,{
      head: [tableColumn],
      body: tableRows,
      startY: 70,
      margin: { top: 10 },
      styles: { overflow: "linebreak" },
      bodyStyles: { valign: "top" },
      theme: "striped",
    })

    // Add summary
    const finalY = doc.lastAutoTable.finalY || 70
    doc.text("Subtotal:", 140, finalY + 20)
    doc.text(`$${currentBill.subTotal.toFixed(2)}`, 170, finalY + 20, { align: "right" })

    doc.text(`Tax (${currentBill.taxRate}%):`, 140, finalY + 30)
    doc.text(`$${currentBill.taxAmount.toFixed(2)}`, 170, finalY + 30, { align: "right" })

    doc.text("Total:", 140, finalY + 40)
    doc.setFontSize(14)
    doc.setFont(undefined, "bold")
    doc.text(`$${currentBill.totalAmount.toFixed(2)}`, 170, finalY + 40, { align: "right" })

    // Add note if exists
    if (currentBill.note) {
      doc.setFontSize(12)
      doc.setFont(undefined, "normal")
      doc.text("Note:", 20, finalY + 60)
      doc.text(currentBill.note, 20, finalY + 70)
    }

    // Footer
    doc.setFontSize(10)
    doc.text("Thank you for your business!", 105, finalY + 90, { align: "center" })

    // Save PDF
    doc.save(`invoice-${currentBill.id.substring(0, 8)}.pdf`)
  }

  return (
    <Button
      variant="outlined"
      startIcon={<DownloadIcon />}
      onClick={handleDownloadInvoice}
      sx={{ mr: 2 }}
      disabled={currentBill.items.some(
        (item) => !item.productName || item.productQuantity <= 0 || item.productPrice <= 0
      )}
    >
      Download Invoice
    </Button>
  )
}

export default DownloadInvoice
