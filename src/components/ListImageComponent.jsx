import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useApi } from "../context/ApiContext";
import { useImageService } from '../services/ImageService'; // ✅ updated import

function ListImageComponent() {
  const apiContext = useApi();
  const { selectedEnv } = apiContext;

  const {
    listAllImages,
    getImage,
    uploadImage,
    deleteImage
  } = useImageService();

  const [file, setFile] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState('');
  const [imageIdList, setImageIdList] = useState([]);
  const [images, setImages] = useState([]);
  const [displayedImage, setDisplayedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchInitialImages();
  }, [selectedEnv]);

  const fetchInitialImages = async () => {
    try {
      const response = await listAllImages();
      const imagesData = response.data;

      setImages(imagesData.map(image => ({ data: image.imageData })));
      setImageIdList(imagesData.map(image => ({ id: image.id })));

      if (imagesData.length > 0) {
        setSelectedImageId(imagesData[0].id);
      }
    } catch (error) {
      console.error('Error fetching initial images:', error.message);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('No file selected!');

    try {
      await uploadImage(file);
      alert('Image uploaded successfully!');
      fetchInitialImages();
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  const handleGetImage = async () => {
    try {
      const response = await getImage(selectedImageId);
      const imageUrl = URL.createObjectURL(response.data);
      setDisplayedImage(imageUrl);
      setShowCard(true);
    } catch (error) {
      console.error('Error retrieving image:', error.message);
    }
  };

  const handleGetAllImages = async () => {
    try {
      const response = await listAllImages();
      const imagesData = response.data;

      setImages(imagesData.map(image => ({ data: image.imageData })));
      setImageIdList(imagesData.map(image => ({ id: image.id })));
      setShowModal(true);
    } catch (error) {
      console.error('Error retrieving images:', error.message);
    }
  };

  const handleDeleteImage = async () => {
    const imageId = imageIdList[currentImageIndex]?.id;
    if (!imageId) return;

    try {
      await deleteImage(imageId);
      alert('Image deleted successfully!');
      handleGetAllImages();
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting image:', error.message);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleModalClose = () => {
    setShowModal(false);
    setImages([]);
  };

  return (
    <div className='container mt-5'>
      <Helmet><title>Image App</title></Helmet>
      <h1 className='text-center mb-4'>Image Upload and Retrieval</h1>

      <Form.Group controlId='formFile' className='mb-3'>
        <Form.Label>Choose an image to upload:</Form.Label>
        <Form.Control type='file' onChange={(e) => setFile(e.target.files[0])} />
        <Button variant='primary' onClick={handleUpload} className='mt-2'>Upload Image</Button>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Enter Image ID:</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter image ID'
          value={selectedImageId}
          onChange={(e) => setSelectedImageId(e.target.value)}
        />
        <Button variant='primary' onClick={handleGetImage} className='mt-2'>Get Image</Button>
      </Form.Group>

      <Button variant='primary' onClick={handleGetAllImages}>View All Images</Button>

      {showCard && displayedImage && (
        <div className='card mt-3' style={{ width: '400px', height: '400px' }}>
          <span className='close-icon' onClick={() => setShowCard(false)} style={{ cursor: 'pointer' }}>&times;</span>
          <img
            src={displayedImage}
            alt={selectedImageId}
            className='rounded img-fluid mx-auto d-block'
            style={{ width: '100%', height: '90%' }}
          />
        </div>
      )}

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Body>
          {images.length > 0 && (
            <img
              src={`data:image/jpeg;base64,${images[currentImageIndex]?.data}`}
              alt={imageIdList[currentImageIndex]?.id}
              className='rounded img-fluid mx-auto d-block'
              style={{ width: '500px', height: '500px' }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleModalClose}>Close</Button>
          <Button variant='danger' onClick={handleDeleteImage}>Delete</Button>
          <Button variant='primary' onClick={handlePrevImage}>Previous</Button>
          <Button variant='primary' onClick={handleNextImage}>Next</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListImageComponent;
