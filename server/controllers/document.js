import Document from '../models/document.js';

export const saveDocument = async (req, res) => {
    const { workspaceId, content, styles } = req.body;
    try {
        let document = await Document.findOne({ workspace: workspaceId });

        if (document) {

            document.content = content;
            document.styles = styles;
            await document.save();
        } else {

            document = new Document({ workspace: workspaceId, content, styles });
            await document.save();
        }

        res.status(200).send('Document saved successfully');
    } catch (error) {
        console.error('Error saving document:', error);
        res.status(500).send('Error saving document');
    }
};


export const loadDocument = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        let document = await Document.findOne({ workspace: workspaceId });

        if (!document) {
            document = new Document({
                workspace: workspaceId,
                content: 'Welcome to the collaborative editor!',
                styles: { bold: false, italic: false, underline: false }
            });
            await document.save();
        }

        res.status(200).json(document);
    } catch (error) {
        console.error('Error loading document:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

