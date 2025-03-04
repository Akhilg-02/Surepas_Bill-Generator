import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Enter a valid email",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});


export const billSchema = Joi.object({
  customerName: Joi.string().trim().required().messages({
    "string.empty": "Customer name is required",
  }),
  customerMobile: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.empty": "Mobile number is required",
      "string.pattern.base": "Enter a valid 10-digit mobile number",
    }),
  customerAddress: Joi.string().trim().required().messages({
    "string.empty": "Address is required",
  }),
  billingDate: Joi.string().isoDate().required().messages({
    "string.empty": "Billing date is required",
    "string.isoDate": "Enter a valid date",
  }),
  note: Joi.string().allow(""), 
  items: Joi.array()
    .items(
      Joi.object({
        productName: Joi.string().trim().required().messages({
          "string.empty": "Product name is required",
        }),
        productQuantity: Joi.number().greater(0).required().messages({
          "number.base": "Quantity must be a number",
          "number.greater": "Quantity must be greater than 0",
        }),
        productPrice: Joi.number().greater(0).required().messages({
          "number.base": "Price must be a number",
          "number.greater": "Price must be greater than 0",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one item is required",
    }),
});