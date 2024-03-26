import React, { useState } from 'react';
import PDFViewer from 'pdf-viewer-reactjs';

const PDF = () => {
    const [pdfUrl, setPdfUrl] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setPdfUrl(fileUrl);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {pdfUrl && (
                <PDFViewer
                    document={{
                        url: pdfUrl,
                    }}
                />
            )}
        </div>
    );
};

export default PDF;
