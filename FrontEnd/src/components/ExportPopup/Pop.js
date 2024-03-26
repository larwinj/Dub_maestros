import React, { useState ,useEffect} from 'react';
import './Pop.css';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import DownloadingIcon from '@mui/icons-material/Downloading';
const Pop = () => {
    const [content, setContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setContent(null); // Reset content when modal closes
    };
    
    useEffect(() => {
        // Set default content (Audio) when component mounts or modal opens for the first time
        const defaultContent = (
            <div>
                <button>Download.MP3s file<DownloadForOfflineIcon style={{ color: 'white', gap: '10px' }} /></button>
                <br/><br/>
                <button>Download.MP4s file<DownloadForOfflineIcon /></button>
            </div>
        );
        setContent(defaultContent);
    }, []);

    const handleOptionClick = (type) => {
        switch (type) {
            case 'audio':
                setContent(<div><button>Download.MP3s file<DownloadForOfflineIcon style={{color:'white',gap:'-10px'}}/>
                </button><br/><br/><button>Download.MP4s file<DownloadForOfflineIcon/></button></div>);
                break;
            case 'video':
                setContent(<div><button>Download.MP4 file<DownloadForOfflineIcon/></button><br/><br/>
                <button>Download.WMV file<DownloadForOfflineIcon/></button></div>);
                break;
            case 'subtitle':
                setContent(<div><button>Download.SRT file<DownloadForOfflineIcon/></button><br/><br/>
                <button>Download.VTT file<DownloadForOfflineIcon/></button></div>);
                break;
            case 'text':
                setContent(<div><button>Download.TXT file<DownloadForOfflineIcon/></button><br/><br/>
                <button>Download.Pdf file<DownloadForOfflineIcon/></button></div>);
                break;
            default:
                setContent(null);
                break;
        }
    };

    return (
        <div className='bg'>
            <button onClick={openModal}>Pop</button>
            {isModalOpen && (
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <div className="options">
                            <button onClick={() => handleOptionClick('audio')}>Audio</button>
                            <button onClick={() => handleOptionClick('video')}>Video</button>
                            <button onClick={() => handleOptionClick('subtitle')}>Subtitle</button>
                            <button onClick={() => handleOptionClick('text')}>Text</button>
                        </div>
                        {/* <div className="content-display">
                            {content}
                        </div> */}
                    </div>
            )}
        </div>
    );
};

export default Pop;
