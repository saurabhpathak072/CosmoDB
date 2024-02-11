import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    postMessage: {type:String, require: true}
});

const PostModel = mongoose.model('Post',postSchema);

export default PostModel;