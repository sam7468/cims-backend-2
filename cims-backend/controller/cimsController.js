import { Comp } from "../model/compSchema.js"
export const cimsGet = async(req, res)=>{
    try {
        const Comps = await Comp.find();
        res.send(Comps)
        
    } catch (error) {
        res.status(500).send(error)
    }
}


export const cimsPost = async(req, res)=>{
    const {designation, brandname, clientname, domain, baselocation,pincode,country,state,district,city,addressLine1,addressLine2,landmark,contacts}=req.body.formData
    try {
        const newComp = await Comp.create({designation, brandname, clientname, domain, baselocation,pincode,country,state,district,city,addressLine1,addressLine2,landmark,contacts })
        res.json(newComp)
        console.log("created successfully.." , newComp)
    } catch (err) {
        console.log(err)
    }
}

export const cimsDel =async(req,res)=>{
    
    const {id}=req.params;
    try{
        const del=await Comp.findById(id);
        await del.remove();
        res.json("deleted successfully")
    }catch(error){
        res.status(500).send(error)
    }
}

export const cimsPatch =async(req,res) =>{
    const {id} = req.query;
    const {designation, brandname, clientname, domain, baselocation,pincode,country,state,district,city,addressLine1,addressLine2,landmark,contacts} = req.body.formData;
    console.log(req.body.formData)
    try{
        const update=await Comp.findOneAndUpdate({_id:id}, {designation:designation, brandname:brandname, clientname:clientname, domain:domain, baselocation:baselocation, 
                                                            pincode:pincode,country:country,state:state,district:district,city:city,addressLine1:addressLine1,addressLine2:addressLine2,landmark:landmark,contacts:contacts});
        res.json(update)
    }
    catch(error){
        console.log(error.message)
    }
}
