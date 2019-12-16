const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ideaSchema  = new Schema({
    
    title : {
        required : true , 
        type: String
    },
    description:{
        required: true , 
        type: String
    },
    category:{
        type: String,
      enum: [
        "Food",
        // "Health",
        // "Moives",
        // "Decoration",
        "Games",
        "others"
      ],
      required: true
      
    },

    belongs_to_idea_owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }

}, {timestamps: true}
);

const Idea = mongoose.model('Idea',ideaSchema)
module.exports = Idea