import Resizer from 'react-image-file-resizer';
import heic2any from 'heic2any';

const changeFileToJPG = async (file) => {
  //  heic => jpg
  return new Promise((resolve, reject) => {
    try {
      if (file.type === 'image/heic' || file.type === "") {
        heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 1,
        })
          .then((result) => {
            let resultFile = new File(
              [result],
              file.name.split('.')[0] + '.jpg',
              {
                type: 'image/jpeg',
                lastModified: new Date().getTime(),
              }
            );

            resolve(resultFile);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } else {
        resolve(file);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const readFileAndResizeImages = async (file) => {
  // resize to 512px
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      let image = new Image();
      image.onload = async function () {
        if (image.width >= image.height) {
          // width <= height
          // get proportion of the image
          let proportion = image.width / image.height;
          // resize image
          Resizer.imageFileResizer(
            file,
            512 * proportion,
            512,
            'JPEG',
            100,
            0,
            (uri) => {
              resolve(uri);
            },
            'base64'
          );
        } else {
          // height > width
          // get proportion of the image
          let proportion = image.height / image.width;
          // resize image
          Resizer.imageFileResizer(
            file,
            512,
            512 * proportion,
            'JPEG',
            100,
            0,
            (uri) => {
              resolve(uri);
            },
            'base64'
          );
        }
      };
      // load image
      image.src = reader.result;
    };
    reader.onerror = reject;
    // read file
    reader.readAsDataURL(file);
  });
};

const autoCropImages = async (file) => {
  // crop the image to a square ratio centered on the middle of the image.
  return new Promise((resolve, reject) => {
    try {
      // create canvas and draw file, auto crop the image
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let image = new Image();
      image.onload = function () {
        let base_length = 512;
        canvas.width = base_length;
        canvas.height = base_length;
        // center the image
        let offsetX = 0;
        let offsetY = 0;
        // if image size is smaller than canvas size, set base size to image size
        if (image.width < base_length || image.height < base_length) {
          base_length =
            image.width > image.height ? image.height : image.width;
        }
        if (image.width > image.height) {
          offsetX = Math.abs(image.width - base_length) / 2;
        } else {
          offsetY = Math.abs(image.height - base_length) / 2;
        }
        ctx.drawImage(
          image,
          offsetX,
          offsetY,
          base_length,
          base_length,
          0,
          0,
          512,
          512
        );
        resolve({
          offsetX,
          offsetY,
          canvas: canvas.toDataURL('image/jpeg'),
        });
      };
      image.src = file;
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export { readFileAndResizeImages, changeFileToJPG, autoCropImages };