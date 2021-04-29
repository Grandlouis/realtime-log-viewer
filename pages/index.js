import { useRef, useState, useEffect } from 'react';
import { connect, disconnectSocket, subscribeContent, loadFile, closeFile } from '../socket-client';
import fetch from 'isomorphic-fetch';
import { Button, Header, Nav, Icons, SidebarLayout, WindowContainer, Table } from '../components';

const HomePage = ({ valFiles }) => {
    const contentContainer = useRef();
    const [files, setFiles] = useState(valFiles);
    const [currentFile, setCurrentFile] = useState();
    const [content, setContent] = useState('');

    useEffect(() => {
        connect();
        subscribeContent(contentHandler);

        return () => {
            currentFile && closeFile(currentFile);
            disconnectSocket();
        };
    }, []);

    useEffect(() => {
        if (contentContainer.current)
            contentContainer.current.scrollTop = contentContainer.current.scrollHeight;
    }, [content]);

    useEffect(() => {
        setContent('');
    }, [currentFile]);

    const contentHandler = (data) => {
        setContent(data);
    }

    const loadFileHandler = (fileName) => {
        console.log(fileName);
        setCurrentFile(fileName);
        loadFile(fileName);
    }

    const closeCurrentFile = () => {
        closeFile(currentFile);
        setCurrentFile(undefined);
    }

    return (
        <WindowContainer

            header={<Header title="Blitzz Live File Display" />}>

            <SidebarLayout sidebar={
                <Nav activeItem={currentFile}
                    sections={[{
                        title: 'Files',
                        items: files.map(file => ({
                            name: file, activeIcon: Icons.docText, inactiveIcon: Icons.docTextInv, onActivate: () => {
                                currentFile && closeFile(currentFile);
                                loadFileHandler(file);
                            }
                        }))
                    }]} />}>
                {!currentFile && <h2 className="list-group-header">Pick a file from the sidebar to begin</h2>}
                {currentFile && <main>
                    <h2 className="list-group-header" style={{ margin: '0 20px' }}>{currentFile} <Button onClick={closeCurrentFile}>X</Button></h2>
                    <hr />
                    <div ref={contentContainer} style={{ maxHeight: '85vh', overflow: 'auto' }}>
                        <Table
                            columns={[{ title: 'Log Entry', selector: 'log' }]}
                            data={content.split('\n').map(row => ({ log: row }))}
                        />
                    </div>
                </main>}
            </SidebarLayout>

        </WindowContainer>
    )
};

HomePage.getInitialProps = async ({ req }) => {
    const response = await fetch(`http://${req.headers.host}/files`)
    const files = await response.json()
    return { valFiles: files }
}

export default HomePage;