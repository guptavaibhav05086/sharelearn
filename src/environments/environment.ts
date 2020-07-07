// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_RegisterUser: "/api/Account/Register",
  baseUrl: "http://localhost:39117",
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
  getProducts: "/api/admin/getproducts"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
