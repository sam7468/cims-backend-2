import mongoose from "mongoose"

export const compSchema = new mongoose.Schema({
    designation: String,
    brandname: String,
    clientname: String,
    domain: String,
    baselocation: String,
    companyaddress: String,
    contacts: Object,

})

export const Comp = mongoose.model('Comp', compSchema)
