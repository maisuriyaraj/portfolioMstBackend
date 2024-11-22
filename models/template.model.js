import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const templateSchema = new mongoose.Schema({
    template_name: { type: String, required: true },
    template_json: { type: String, required: null },
    is_protected : { type : Boolean , default : false},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
}, {
    timestamps: true
});

// To use Aggregation Pipeline within User Model
templateSchema.plugin(mongooseAggregatePaginate);

const templateModel = mongoose.model('templates', templateSchema);

export default templateModel;