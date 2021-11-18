import { Comp } from "../model/compSchema.js"
export const cimsGet = async(req, res)=>{
    // const {designation, brandname, clientname, domain, baselocation, companyaddress, contacts }=req.body

    try {
        const Comps = await Comp.find();
        res.send(Comps)
        
    } catch (error) {
        res.status(500).send(error)
    }
}

export const cimsPost = async(req, res)=>{
    const {designation, brandname, clientname, domain, baselocation, companyaddress, contacts}=req.body.formData
    console.log({designation, brandname, clientname, domain, baselocation, companyaddress, contacts })
    try {
        const newComp = await Comp.create({designation, brandname, clientname, domain, baselocation, companyaddress, contacts })
        res.json(newComp)
        console.log("created successfully.." , newComp)
    } catch (err) {
        console.log(err)
    }
}

export const cimsDel = (req, res)=>{
    res.send("Delete record in cims")
}

export const cimsPatch = (req, res)=>{
    res.send("Patch record in cims")
}
