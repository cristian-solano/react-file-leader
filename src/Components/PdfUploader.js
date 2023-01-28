// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';

// function PdfUploader() {
//   const [file, setFile] = useState(null);
//   const [fileContent, setFileContent] = useState('');
//   const [editMode, setEditMode] = useState(false);
  
//   const onDrop = acceptedFiles => {
//     setFile(acceptedFiles[0]);
//   };
  
//   const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
//   const handleSave = async () => {
//     try {
//       const response = await axios.post('/api/files', file, {
//         headers: {
//           'Content-Type': 'application/pdf',
//         },
//       });
//       setFileContent(response.data);
//       setEditMode(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEdit = () => {
//     setEditMode(true);
//   };

//   const handleContentChange = (event) => {
//     setFileContent(event.target.value);
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put('/api/files', { content: fileContent });
//       setEditMode(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <div {...getRootProps()}>
//         <input {...getInputProps()} />
//         {
//           isDragActive ?
//             <p>Drop the files here ...</p> :
//             <p>Drag 'n' drop some files here, or click to select files</p>
//         }
//       </div>
//       {!file && <p>No file selected</p>}
//       {file && !editMode && (
//         <>
//           <p>{file.name}</p>
//           <button onClick={handleSave}>Save</button>
//           <button onClick={handleEdit}>Edit</button>
//         </>
//       )}
//       {file && editMode && (
//         <>
//           <textarea value={fileContent} onChange={handleContentChange} />
//           <button onClick={handleUpdate}>Update</button>
//         </>
//       )}
//     </div>
//   );
// }
import React, { useState } from 'react';
import axios from 'axios';

function FileInput() {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [editMode, setEditMode] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('/api/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFileContent(response.data);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleContentChange = (event) => {
    setFileContent(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      await axios.put('/api/files', { content: fileContent });
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {!file && <p>No file selected</p>}
      {file && !editMode && (
        <>
          <p>{file.name}</p>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
      {file && editMode && (
        <>
          <textarea value={fileContent} onChange={handleContentChange} />
          <button onClick={handleUpdate}>Update</button>
        </>
      )}
    </div>
  );
}

export default FileInput;

// export default PdfUploader