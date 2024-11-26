import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const templateSchema = new mongoose.Schema({
    template_name: { type: String, required: true },
    template_thumbnail : {type: String , default : null},
    template_json: { type: Object, required: null },
    is_protected : { type : Boolean , default : false},
    template_tags : [{type:String}],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    is_draft : {type:Boolean,default : false},
    is_publish : {type: Boolean,default : false}
}, {
    timestamps: true
});

// To use Aggregation Pipeline within User Model
templateSchema.plugin(mongooseAggregatePaginate);

const templateModel = mongoose.model('templates', templateSchema);

export default templateModel;