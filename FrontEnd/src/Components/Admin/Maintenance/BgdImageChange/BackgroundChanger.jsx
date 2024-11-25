// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './BackgroundChanger.css';
import { BackgroundContext } from '../../../../context/BackgroundContext';

function BackgroundChanger() {
  const { backgrounds, setBackgrounds } = useContext(BackgroundContext);  // Loading default images
  const [selectedImage, setSelectedImage] = useState(''); // State the selected background type
  const [imageFile, setImageFile] = useState(null); // State the image file
  const [originalExtension, setOriginalExtension] = useState(''); // State variable for original extension
  const [message, setMessage] = useState(''); // State variable for the message
  const [initialImage, setInitialImage] = useState(null); // State variable for the initial image

  const cropperRef = useRef(null);

  const handleSelectChange = (e) => {
    setMessage('');
    const selectedValue = e.target.value;
    setSelectedImage(selectedValue);
    
    if (selectedValue && backgrounds[selectedValue]) {
      setImageFile(backgrounds[selectedValue]);
      setInitialImage(backgrounds[selectedValue]); // Store the initial image

    } else {
      setImageFile(null); // Clear the image file if no valid selection
      setInitialImage(null); // Clear the initial image

    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const extension = file.name.split('.').pop(); // Extract the original file extension
      setOriginalExtension(extension);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateOrPostBackground = async (backgroundType, newImageFile) => {
    // console.log("backgroundType: ", backgroundType);
    // console.log("newImageFile: ", newImageFile);
    try {
      const formData = new FormData();
      formData.append('image', newImageFile);
      formData.append('backgroundType', backgroundType);
  
      // Debugging: Log FormData content
      // console.log('FormData content:', formData);
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ': ' + pair[1]);
      // }
  
      const response = await axios.post('/api/backgroundimage/uploadBackground', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.newImagePath) {
        const isUpdated = response.data.updated ? 'Background updated successfully' : 'Background posted successfully';
        // console.log(isUpdated);
        setMessage(isUpdated); // Set the message state
  
        const updatedImagePath = `${response.data.newImagePath}?${new Date().getTime()}`;
  
        setBackgrounds((prevBackgrounds) => ({
          ...prevBackgrounds,
          [backgroundType]: updatedImagePath
        }));
      } else {
        console.error('Failed to update background.\nCheck your connection.');
        setMessage('Failed to update background.\nCheck your connection.'); // Set the failure message
      }
    } catch (error) {
      console.error('Error updating background.\nServer is not responding:', error);
      setMessage('Error updating background.\nServer is not responding'); // Set the error message
    }
  };
    
  const handleUpload = () => {
    if (selectedImage && cropperRef.current && cropperRef.current.cropper) {
      const canvas = cropperRef.current.cropper.getCroppedCanvas();
      const mimeType = `image/${originalExtension === 'jpg' ? 'jpeg' : originalExtension}`; // Determine MIME type

      canvas.toBlob((blob) => {
        const newFileName = `${selectedImage}.${originalExtension}`; // Use the original extension
        const blobWithExtension = new File([blob], newFileName, { type: mimeType });
        updateOrPostBackground(selectedImage, blobWithExtension);
      }, mimeType); // Specify the original MIME type
    }
  };
        
  return (
    <div className="bgd-change-cont">
      <select className="bgd-select" onChange={handleSelectChange}>
        <option value="">Choose a picture</option>
        <option value="background1">Background 1</option>
        <option value="background2">Background 2</option>
        <option value="background3">Background 3</option>
        <option value="background4">Background 4</option>
        <option value="background5">Background 5</option>
      </select>
      {imageFile && (
        <div className="bg-preview">
          <h3>Preview:</h3>
          <Cropper
            src={imageFile}
            style={{ height: 200, width: '100%' }}
            aspectRatio={16 / 9}
            guides={false}
            ref={cropperRef}
            viewMode={1}
            cropBoxResizable={false}
            dragMode="move"
          />
        </div>
      )}
      <input type="file" accept="image/*" id="fileInput" onChange={handleImageChange} />
      <label className={`file-label ${!selectedImage ? 'disabled' : ''}`} htmlFor="fileInput">Choose File</label>
      <button className="bgd-change-btn" onClick={handleUpload} disabled={!selectedImage || !imageFile || imageFile === initialImage}>Upload</button>

      {/* Display the message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default BackgroundChanger;
