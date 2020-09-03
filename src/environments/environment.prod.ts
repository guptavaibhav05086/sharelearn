export const environment = {
  production: false,
  baseUrl: "https://www.shapenprint.in",
  //baseUrl: "http://localhost:39117",
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
  generateOrder: "/api/customer/generateorder?amount=$amount",
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
  deleteAddress: "/api/customer/deleteaddress?userId=$userId&addId=$addId",
  updateProdList: "/api/admin/updateproductslist",
  checkPincodes: "/api/admin/checkpincodes?pincode=$pincode",
  uploadOrderFiles: "/api/customer/uploadimage",
  getRegisteredprofiles: "/api/admin/getregisteredprofiles",
  getDiscounts: "/api/admin/getDisountList",
  updateDiscounts: "/api/admin/setDisountList",
  deleteDiscounts: "/api/admin/deleteDisountList?Id=$Id",
  deleteProd: "/api/admin/deleteProduct?Id=$Id",
  deleteProdList: "/api/admin/deleteProducttList?Id=$Id",
  generateOrderUser: "/api/customer/generateorder?amount=$amount",
  transactionValidateUser:
    "/api/Public/validateTransaction?paymentId=$paymentId&orderId=$orderId&signature=$signature",

  getDesignerNotification:
    "/api/designer/getNotificationDetails?isProfessional=true",

  sendNotification: "/api/customer/sendNotification?orderId=$orderId",
  fetchNotiPrinter: "/api/printer/getNotificationDetails",
  fetchNotiDesigner: "/api/designer/getNotificationDetails",
  acceptDesignerOrder:
    "/api/designer/AcceptOrder?email=$email&orderId=$orderId",
  fetchOngoingOrdersDesigners:
    "/api/designer/getOngoingOrder?email=$email&isAllOrdersRequired=$isAllOrdersRequired",
  fetchongoingorderfilesDesigner:
    "/api/designer/downloadOngoingOrderFiles?filename=$filename",
  getDesignerDashBoard: "/api/designer/getdesignerDashboard?email=$email",
  updateBankDetails: "/api/designer/updateBankDetails",
  getBankDetails: "/api/designer/getBankDetails",
  postFinalFilesDesigner:
    "/api/designer/postDesignerFinalFolder?orderId=$orderId&type=$type"
};
