export const environment = {
  production: true,
  baseUrl: "https://www.shapenprint.in",
  api_RegisterUser: "/api/Account/Register",
  userDetails: "/api/Students/GetUserProfile",
  tokenUrl: "/Token",
  guestRegister: "/api/Public/guestregister",
  registerFeedback: "/api/Public/userfeedback",
  getFeedback: "/api/Public/getuserfeedback?courseId=$courseId",
  forgotPassword: "/api/Public/resetPassword?email=$email",
  resetPassword: "/api/Account/ResetPassword",
  getState: "/api/Public/GetStates",
  updateDesigner: "/api/designer/updateprofile",
  uploadImage: "/api/designer/uploadimage",
  updatePrinter: "/api/printer/updateprofile",
  uploadPrinterImage: "/api/printer/uploadimage",
  generateOrder: "/api/printer/generateorder?amount=$amount",
  transactionValidate:
    "/api/Public/validateTransaction?paymentId=$paymentId&orderId=$orderId&signature=$signature",
  getDesignerProfile: "/api/designer/getProfile?userId=$userId",
  getPrinterProfile: "/api/printer/getProfile?userId=$userId",
  generateOTP:
    "/api/Public/GenerateOTP?userId=$userId&phoneNumber=$phoneNumber",
  verifyOTP: "/api/Public/ValidateOTP?userId=$userId&OTP=$OTP",
  verifyEmail: "/api/Public/verifyemail?userId=$userId&guid=$guid&role=$role",
  resendVerifymail:
    "/api/Public/resendverifyemail?email=$email&guid=$guid&role=$role",
  getProducts: "/api/admin/getproducts",
  updateProducts: "/api/admin/updateproducts",
  uploadProdImage: "/api/admin/uploadproductimage",
  addUserAddress: "/api/customer/updateaddress",
  getUserAddress: "/api/customer/getaddress?userId=$userId",
  deleteAddress: "/api/customer/deleteaddress?userId=$userId&addId=$addId"
};
