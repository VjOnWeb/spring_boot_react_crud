import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { listAllImages } from '../services/ImageService';

const LINK_URL = 'http://localhost:9898/api/images/';

function ListImageComponent() {
  const [file, setFile] = useState(null);
  const [imageId, setImageId] = useState(0);
  const [images, setImages] = useState([]);
  const [displayedImage, setDisplayedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post(LINK_URL + 'uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  const handleGetImage = async () => {
    // debug here
    try {
      const response = await axios.get(LINK_URL + `${imageId}`, {
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      setDisplayedImage(imageUrl);
      setShowModal(true);
    } catch (error) {
      console.error('Error retrieving image:', error.message);
    }
  };
  const handleGetAllImages = async () => {
    try {
      const response = await axios.get(LINK_URL + 'all_images');
      setImages(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error retrieving images:', error.message);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setImages([]);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    if (images.length > 0) {
      handleGetImage(images[currentImageIndex - 1]);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    if (images.length > 0) {
      handleGetImage(images[currentImageIndex + 1]);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const imageIdToDelete = images[currentImageIndex]?.id;
  
      if (imageIdToDelete) {
        console.log(`Deleting image with ID: ${imageIdToDelete}`);
  
        await axios.delete(`${LINK_URL}${imageIdToDelete}`);
        // Refresh the images after deletion
        handleGetAllImages();
        alert('Image deleted successfully!');
      } else {
        console.error('Image ID is undefined or null.');
      }
    } catch (error) {
      console.error('Error deleting image:', error.message);
    }
  };
  useEffect(() => {
    // Assuming listAllImages is a function that returns a promise
    listAllImages()
      .then((response) => {
        setImages(response.data);
        if (response.data.length > 0) {
          handleGetImage(response.data[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Image Upload and Retrieval</h1>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Choose an image to upload:</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
        <Button variant="primary" onClick={handleUpload} className="mt-2">
          Upload Image
        </Button>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Enter Image ID:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Image ID"
          value={imageId}
          onChange={(e) => setImageId(e.target.value)}
        />
        <Button variant="primary" onClick={handleGetImage} className="mt-2">
          Get Image
        </Button>
      </Form.Group>

      <Button variant="primary" onClick={handleGetAllImages}>
        View All Images
      </Button>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Body>
          {images.length > 0 && (
            <img
              src={`data:image/jpeg;base64,${images[currentImageIndex]}`}
              alt={`${currentImageIndex + 1}`}
              className='rounded img-fluid mx-auto d-block'
              style={{ width: '500px', height: '500px' }}
            />
          )}
        </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteImage}>
            Delete
          </Button>
          <Button variant="primary" onClick={handlePrevImage}>
            Previous
          </Button>
          <Button variant="primary" onClick={handleNextImage}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListImageComponent;
