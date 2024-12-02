import templateModel from "../models/template.model.js";
import { userModel } from "../models/users.model.js";
import APIResponse from "../utils/apiResponse.js";


export async function createTemplate(request, response) {
    try {

        // Get The Request Payload
        const { template_name, template_tags } = request.body;
        const { user_id } = request;

        // Check validation
        if (!user_id) {
            return response.json(new APIResponse(401, {}, "user_id is Required !"));
        }

        if (!template_name) {
            return response.json(new APIResponse(401, {}, "user_id is Required !"));
        }

        // Insert Template Data Document in TemplatesModel
        const insertedDocument = await templateModel.create({
            user: user_id,
            template_name: template_name,
            // is_protected : is_protected || false,
            template_tags: template_tags
        });

        // Insert Template ID into Users Templates Array 
        await userModel.updateOne({
            _id: user_id
        }, {
            $push: {
                templates: insertedDocument._id
            }
        });

        return response.status(201).json(new APIResponse(201, {}, "Template Created Successfully !"));

    } catch (error) {
        console.log(error)
        return response.json(new APIResponse(400, {}, "Create Template Error "));
    }
}

export async function getUserDetails(request, response) {
    try {
        const { user_id } = request;

        const result = await userModel.findOne({ _id: user_id }).populate("templates").select("-password -TwoFAEnabled");

        if (result) {
            return response.status(201).json(new APIResponse(201, result, "User Details Fetched Successfully !"));
        }
    } catch (error) {
        console.log(error)
        return response.json(new APIResponse(400, {}, "Create Template Error "));
    }
}

export async function updateTemplate(request, response) {
    try {
        const { template_id, template_json } = request.body;

        if (!template_id) {
            return response.status(401).json(new APIResponse(401, {}, "template_id is Required !"));
        }

        if (!template_json) {
            return response.status(401).json(new APIResponse(401, {}, "template_json is Required !"));
        }

        await templateModel.updateOne({
            _id: template_id
        }, {
            $set: {
                template_json
            }
        });

        return response.status(201).json(new APIResponse(201, {}, "Template  Updated Successfully !"));
    } catch (error) {
        console.log(error);
        return response.json(new APIResponse(400, {}, "Update Template Error "));

    }
}

export async function getTemplates(request, response) {
    try {
        const { user_id } = request;

        const result = await templateModel.find({ $or: [{ user: user_id }, { is_default: true }] });
        response.status(201).json(new APIResponse(201, result, "Templates Fetched Successfully !"));

    } catch (error) {
        console.log(error);
        return response.json(new APIResponse(400, {}, "GEt Templates Error "));
    }
}

export async function getTemplatesPreview(request, response) {
    try {
        const { template_id } = request.query;

        console.log(template_id);

        const result = await templateModel.findOne({_id : template_id});
        response.status(201).json(new APIResponse(201, result, "Template Fetched Successfully !"));

    } catch (error) {
        console.log(error);
        return response.json(new APIResponse(400, {}, "Get Template Preview Error "));
    }
}