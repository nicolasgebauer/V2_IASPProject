import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { parseCSVFile } from '../utils/csvparse';

import createProductsData from '../functions/POSTProductsJSON';

function AddProductsFromCSV(){
    const [csvFile, setCSVFile] = useState<File | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null; 
        setCSVFile(selectedFile);
    };

    const handleUpload = async () => {
        if (csvFile) {
            try {
                const parsedData = await parseCSVFile(csvFile);
                await createProductsData(parsedData);
            } catch (error: any) {
                console.error('Error al parsear el archivo CSV:', error.message);
            }
        }
        setModalOpen(false);
    };
    
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    
    return (
        <>
            <Button variant="outline-dark" onClick={handleOpenModal}>
                Ingresar desde .csv
            </Button>
        
            {isModalOpen && (
                <Modal show={isModalOpen} onClose={handleCloseModal}>
                    <div>
                        <h3>Elegir archivo</h3>
                        <input type="file" onChange={handleFileChange} accept=".csv" />
                    </div>
                    <Modal.Footer>
                        <Button variant="outline-dark" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                        <Button variant="outline-dark" onClick={handleUpload}>
                            Aceptar
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}

export default AddProductsFromCSV;