import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
    content: { type: String, required: true },
    styles: {
        bold: { type: Boolean, default: false },
        italic: { type: Boolean, default: false },
        underline: { type: Boolean, default: false }
    }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);

export default Document;