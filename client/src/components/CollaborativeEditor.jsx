import React, { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import api from '../utils/axios'; 
import './CollaborativeEditor.css';
import debounce from 'lodash.debounce';
import jsPDF from 'jspdf';

const socket = io(process.env.REACT_APP_BACKEND_URL);

const CollaborativeEditor = () => {
    const [content, setContent] = useState('');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [workspaceId, setWorkspaceId] = useState(localStorage.getItem('selectedWorkspaceId') || '');

    useEffect(() => {
        if (!workspaceId) return;

        api.get(`/loadDocument/${workspaceId}`)
            .then(response => {
                const { content, styles } = response.data;
                setContent(content);
                setIsBold(styles.isBold);
                setIsItalic(styles.isItalic);
                setIsUnderline(styles.isUnderline);
            })
            .catch(error => {
                console.error('Error loading document:', error);
            });

        socket.on('updateContent', (newContent) => {
            setContent(newContent);
        });

        socket.on('updateStyleBold', (bold) => {
            setIsBold(bold);
        });

        socket.on('updateStyleItalic', (italic) => {
            setIsItalic(italic);
        });

        socket.on('updateStyleUnderline', (underline) => {
            setIsUnderline(underline);
        });

        return () => {
            socket.off('updateContent');
            socket.off('updateStyleBold');
            socket.off('updateStyleItalic');
            socket.off('updateStyleUnderline');
        };
    }, [workspaceId]);

    const handleSave = useCallback(debounce(() => {
        api.post('/saveDocument', {
            workspaceId,
            content,
            styles: { isBold, isItalic, isUnderline }
        })
        .catch(error => {
            console.error('Error saving document:', error);
        });
    }, 1000), [workspaceId, content, isBold, isItalic, isUnderline]);

    const handleChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
        socket.emit('edit', newContent);
        handleSave();
    };

    const handleBold = () => {
        const newBold = !isBold;
        setIsBold(newBold);
        socket.emit('bold', newBold);
        handleSave();
    };

    const handleItalic = () => {
        const newItalic = !isItalic;
        setIsItalic(newItalic);
        socket.emit('italic', newItalic);
        handleSave();
    };

    const handleUnderline = () => {
        const newUnderline = !isUnderline;
        setIsUnderline(newUnderline);
        socket.emit('underline', newUnderline);
        handleSave();
    };


    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        doc.text(content, 10, 10);
        doc.save('document.pdf');
    };

    return (
        <div className="CollaborativeEditor">
            <div className="controls">
                <button onClick={handleBold} className={isBold ? 'active' : ''}>B</button>
                <button onClick={handleItalic} className={isItalic ? 'active' : ''}>I</button>
                <button onClick={handleUnderline} className={isUnderline ? 'active' : ''}>U</button>
                <button onClick={handleSave} className="save-button">Save</button>
                <button onClick={handleDownloadPdf} className="download-button">Download</button>
            </div>
            <textarea
                value={content}
                onChange={handleChange}
                className="editor"
                style={{
                    fontWeight: isBold ? 'bold' : 'normal',
                    fontStyle: isItalic ? 'italic' : 'normal',
                    textDecoration: isUnderline ? 'underline' : 'none',
                    color:  'black' 
                }}
            />
        </div>
    );
};

export default CollaborativeEditor;
