import React from "react";

interface ImageUploadProps {
    onImageUpload: (base64: string) => void;
    onError: (error: string) => void;
}

const ImageUploader: React.FC<ImageUploadProps> = ({ onImageUpload, onError }) => {

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                    onImageUpload(reader.result);
                } else {
                    onError('Error al leer el archivo');
                }
            };
            reader.readAsDataURL(file);
        } else {
            onError('No se ha seleccionado ningún archivo');
        }
    };

    return (
        <>
            <br />
            <input
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                className='input-fields'
                onChange={handleImageUpload}
            />
            <br />
        </>
    )
}

export default ImageUploader;