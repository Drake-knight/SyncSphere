import React, { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import api from '../utils/axios'; 
import './CollaborativeEditor.css';
import debounce from 'lodash.debounce';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';

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
                toast.error('Error loading document', { className: 'toast-custom' });
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

    const handleSave = useCallback(debounce((isManual = false) => {
        api.post('/saveDocument', {
            workspaceId,
            content,
            styles: { isBold, isItalic, isUnderline }
        })
        .then(() => {
            if (isManual) {
                toast.success('Document saved successfully', { className: 'toast-custom' });
            }
        })
        .catch(error => {
            console.error('Error saving document:', error);
            toast.error('Error saving document', { className: 'toast-custom' });
        });
    }, 1000), [workspaceId, content, isBold, isItalic, isUnderline]);

    const handleChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
        socket.emit('edit', newContent);
        handleSave(false); 
    };

    const handleBold = () => {
        const newBold = !isBold;
        setIsBold(newBold);
        socket.emit('bold', newBold);
        handleSave(false); 
    };

    const handleItalic = () => {
        const newItalic = !isItalic;
        setIsItalic(newItalic);
        socket.emit('italic', newItalic);
        handleSave(false); 
    };

    const handleUnderline = () => {
        const newUnderline = !isUnderline;
        setIsUnderline(newUnderline);
        socket.emit('underline', newUnderline);
        handleSave(false); 
    };

    const handleManualSave = () => {
        handleSave(true); 
    };

    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const margin = 10;
        const lineHeight = 10;
        const maxLineWidth = doc.internal.pageSize.width - margin * 2;
        const lines = doc.splitTextToSize(content, maxLineWidth);
        let cursorY = margin;

        lines.forEach((line) => {
            if (cursorY + lineHeight > pageHeight - margin) {
                doc.addPage();
                cursorY = margin;
            }
            doc.text(line, margin, cursorY);
            cursorY += lineHeight;
        });

        doc.save('document.pdf');
        toast.success('PDF downloaded successfully', { className: 'toast-custom' });
    };

    return (
        <div className="CollaborativeEditor">
            <div className="controls">
                <button onClick={handleBold} className={isBold ? 'active' : ''}>B</button>
                <button onClick={handleItalic} className={isItalic ? 'active' : ''}>I</button>
                <button onClick={handleUnderline} className={isUnderline ? 'active' : ''}>U</button>
                <button onClick={handleManualSave} className="save-button">Save</button>
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