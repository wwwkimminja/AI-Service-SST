import { useState } from 'react';
import './Start.css';

export default function Start() {
  const [photos, setPhotos] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const onChangeUpload = async (e) => {
    let files = Array.from(e.target.files);

    if (files.length > 7 && files.length < 21) {
      setPhotos(files);
      setIsUploaded(true);
    } else {
      alert('Please upload pictures 8~20');
    }
  };

  return (
    <div className="container">
      {isUploaded ? (
        <div>
          {photos.map((photo, index) => (
            <img key={index} src={URL.createObjectURL(photo)} alt="" />
          ))}
        </div>
      ) : (
        <>
          <label className="button" htmlFor="upload-photos">
            UPLOAD
          </label>
          <input
            id="upload-photos"
            type="file"
            multiple
            onChange={onChangeUpload}
            accept="image/x-png,image/jpeg,image/jpg,image/heic"
          />
        </>
      )}
    </div>
  );
}
