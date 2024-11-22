import templateModel from "../models/template.model.js";
import { userModel } from "../models/users.model.js";
import APIResponse from "../utils/apiResponse.js";


export async function createTemplate(request,response){
    try {

        // Get The Request Payload
        const { template_name , is_protected} = request.body ;
        const {user_id} = request;

        // Check validation
        if(!user_id){
            return response.json(new APIResponse(401 ,{} , "user_id is Required !"));
        }

        if(!template_name){
            return response.json(new APIResponse(401 ,{} , "user_id is Required !"));
        }

        // Insert Template Data Document in TemplatesModel
        const insertedDocument = await templateModel.create({
            user : user_id,
            template_name : template_name,
            is_protected : is_protected || false
        });

        // Insert Template ID into Users Templates Array 
        await userModel.updateOne({
            _id : user_id
        },{
            $push : {
                templates : insertedDocument._id
            }
        });

        return response.status(201).json(new APIResponse(201,{} , "Template Created Successfully !"));

    } catch (error) {
        console.log(error)
        response.json(new APIResponse(400,{},"Create Template Error "));
    }
}

export async function getUserDetails(request,response){
    try {
        const {user_id} = request;

        const result = await userModel.findOne({_id : user_id}).populate("templates").select("-password -TwoFAEnabled");

        if(result){
            return response.status(201).json(new APIResponse(201,result,"User Details Fetched Successfully !"));
        }
    } catch (error) {
        console.log(error)
        response.json(new APIResponse(400,{},"Create Template Error "));
    }
}