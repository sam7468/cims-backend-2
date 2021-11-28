import mongoose from "mongoose"
//camel case only for addressLines
export const compSchema = new mongoose.Schema({
    designation: String,
    brandname: String,
    clientname: String,
    domain: String,
    baselocation: String,
    addressLine1:String,
    addressLine2:String,
    pincode:Number,
    country:String,
    state:String,
    district:String,
    city:String,
    landmark:String,
    contacts: Object,

})

export const Comp = mongoose.model('Comp', compSchema)
