import mongoose from "mongoose"

const schemaProject = mongoose.Schema({
    title: String,
    description: String,
    kind: String,
    stack: [ String ],
    iconUrl: String,
    fileUrl: [ String ],
    demoUrl: String,
    source: String,
    view: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const SchemaProject = mongoose.model('SchemaProject', schemaProject)

export default SchemaProject