const { Schema, model } = require("mongoose")

const formSchema = new Schema(
  {
    referralName: {
      type: String,
    },
    // identityPIN: {
    //   type: Number,
    //   required: [true, "username is required."],
    // },
    UScitizen: {
      type: String,
      //   required: [true, "citizenship is required."],
    },
    taxpayerFilingStatus: {
      type: String,
      enum: [
        "single",
        "married filling jointly",
        'married filling separately"',
        "head of household",
        "qualifying widow",
      ],
    },
    // isTaxpayerDependent: {
    //   type: Boolean,
    // },
    // filingYear: {
    //   type: Number,
    //   enum: ["2019", "2020", "2021"],
    // },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    occupation: {
      type: String,
    },
    // birthday: {
    //   type: String,
    //   format: Date,
    // },
    // homeBuyer: {
    //   type: Boolean,
    // },
    // filingWithSpouse: {
    //   type: Boolean,
    // if (yes)
    // SpouseFirstName: {
    //     type: String
    // },
    // SpouseLastName :{
    //     type: String
    // },
    // spouseSSN: {
    //     type: Number
    // },
    // spouseBirthday: {
    //     type: Date
    // },
    // spouseDriverLicense: {
    //     type: String
    // },
    // spouseDLstate :{
    //     type: String
    // },
    // spouseDLissDate: {
    //     type: Date
    // },
    // spousePhoneNumber: {
    //     type: Number
    //   // },
    // },
    taxpayerSSN: {
      type: Number,
    },
    taxpayerDOB: {
      type: Date,
    },
    driversLicense: {
      type: String,
    },
    licenseState: {
      type: String,
    },
    issuedDate: {
      type: Date,
    },
    expDate: {
      type: Date,
    },
    taxpayerPhoneNumber: {
      type: Number,
    },
    typeOfIncome: {
      type: Array,
    },
    // filingWithDependent: {
    //   type: Boolean,
    // if (yes)
    // dependentFirstName: {
    //     type: String
    // },
    // dependentLastName: {
    //     type: String
    // },
    // dependentSSN: {
    //     type: Number
    // },
    // dependentBirthdate: {
    //     type: Date
    // },
    // relationship: {
    //     type: String
    // },
    // },
    // healthInsurance: {
    //   type: File,
    // },
    // schoolForm: {
    //   type: File,
    // },
    // imageOfID: {
    //   type: File,
    // },
    taxDocs: {
      type: String, // was File but i kept getting error so i changed it
      default: "https://smallbiztrends.com/ezoimgfmt/media.smallbiztrends.com/2021/11/w2-form-850x476.png?ezimgfmt=ng%3Awebp%2Fngcb12%2Frs%3Adevice%2Frscb12-1"
    },
    // auditProtection: {
    //   type: Boolean,
    // },
    bankInfo: {
      type: String,
    },
    // itemizedDeductions: {
    //   type: File,
    // },
  },
  {
    timestamps: true,
  }
)

module.exports = model("Form", formSchema)
