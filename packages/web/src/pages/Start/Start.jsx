import './Start.css';

export default function Start() {
  return (
    <div className="container">
      <label className="button" htmlFor="upload-photos">
        UPLOAD
      </label>
      <input
        id="upload-photos"
        type="file"
        multiple
        accept="image/x-png,image/jpeg,image/jpg,image/heic"
      />
    </div>
  );
}
