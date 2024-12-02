import { useState } from 'react';
import './Start.css';
import {
  changeFileToJPG,
  readFileAndResizeImages,
  autoCropImages,
} from '../../utils/utils';
import ImageCropModal from '../../components/ImageCropModal/ImageCropModal';

export default function Start() {
  const [photos, setPhotos] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [croppedImages, setCroppedImages] = useState([]);
  const [offsetXs, setOffsetXs] = useState([]);
  const [offsetYs, setOffsetYs] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [croppingImageIndex, setCroppingImageIndex] = useState(0);

  const onChangeUpload = async (e) => {
    let files = Array.from(e.target.files);

    if (files.length > 7 && files.length < 21) {
      //1. image type=> jpg
      let jpegFiles = await Promise.all(
        files.map((file) => {
          return changeFileToJPG(file);
        })
      );
      //2.resize image 512
      let resizedImageArray = await Promise.all(
        jpegFiles.map((file) => {
          return readFileAndResizeImages(file);
        })
      );
      //3.crop image 512 x 512
      let croppedArray = await Promise.all(
        resizedImageArray.map(async (file) => {
          return autoCropImages(file);
        })
      );

      let croppedImageArray = croppedArray.map((r) => {
        return r.canvas;
      });

      let offsetXArray = croppedArray.map((r) => {
        return r.offsetX;
      });

      let offsetYArray = croppedArray.map((r) => {
        return r.offsetY;
      });

      setIsUploaded(true);
      setPhotos(resizedImageArray);
      setCroppedImages(croppedImageArray);
      setOffsetXs(offsetXArray);
      setOffsetYs(offsetYArray);
    } else {
      alert('Please upload pictures 8~20');
    }
  };

  const changeShowModal = () => {
    setShowModal(!showModal);
  };
  const changeCroppingImageIndex = (index) => {
    setCroppingImageIndex(index);
    changeShowModal();
  };

  const changeCroppedImage = (index, croppedImage) => {
    let newCroppedImages = [...croppedImages];
    newCroppedImages[index] = croppedImage;
    setCroppedImages(newCroppedImages);
  };

  const deleteImageFromArray = (index) => {
    let newPhotos = photos;
    let newCroppedImages = croppedImages;
    let newOffsetXs = offsetXs;
    let newOffsetYs = offsetYs;

    newPhotos.splice(index, 1);
    newCroppedImages.splice(index, 1);
    newOffsetXs.splice(index, 1);
    newOffsetYs.splice(index, 1);

    if (newCroppedImages.length < 8) {
      setIsUploaded(false);
      setCroppedImages([]);
      setOffsetXs([]);
      setOffsetYs([]);
      setPhotos([]);
      setShowModal(false);
    } else {
      setPhotos(newPhotos);
      setCroppedImages(newCroppedImages);
      setOffsetXs(newOffsetXs);
      setOffsetYs(newOffsetYs);
      setShowModal(false);
    }
  };
  return (
    <div className="container">
      {isUploaded ? (
        <div className="preview-image-wrapper">
          {croppedImages.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt=""
              className="preview-image"
              onClick={() => changeCroppingImageIndex(index)}
            />
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
      {showModal ? (
        <ImageCropModal
          originalImage={photos[croppingImageIndex]}
          offsetXs={offsetXs}
          offsetYs={offsetYs}
          croppingImageIndex={croppingImageIndex}
          changeCroppedImage={changeCroppedImage}
          setShowModal={setShowModal}
          setOffsetXs={setOffsetXs}
          setOffsetYs={setOffsetYs}
          deleteImageFromArray={deleteImageFromArray}
        />
      ) : null}
    </div>
  );
}
