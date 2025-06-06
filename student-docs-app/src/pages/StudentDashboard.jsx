import { useState } from 'react';

export default function InstitutionDashboard() {
  const [formData, setFormData] = useState({
    studentName: '',
    enrollmentId: '',
    studentBlockId: '',
    documentTitle: '',
    documentFile: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'documentFile') {
      setFormData({ ...formData, documentFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.documentFile) {
      alert('Please select a file.');
      return;
    }

    const fileUrl = URL.createObjectURL(formData.documentFile);
    const fileType = formData.documentFile.type;

    const newDoc = {
      title: formData.documentTitle,
      fileUrl,
      fileType,
      uploadedBy: 'Institution',
      uploadedAt: new Date().toISOString(),
    };

    const docsKey = `docs-${formData.studentBlockId}`;
    const existingDocs = JSON.parse(localStorage.getItem(docsKey)) || [];
    localStorage.setItem(docsKey, JSON.stringify([...existingDocs, newDoc]));

    setMessage('✅ Document uploaded successfully!');
    setFormData({
      studentName: '',
      enrollmentId: '',
      studentBlockId: '',
      documentTitle: '',
      documentFile: null,
    });

    // Clear file input manually
    document.getElementById('fileInput').value = '';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Upload Document to Student</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 w-full max-w-lg space-y-4">
        <input name="studentName" onChange={handleChange} value={formData.studentName} placeholder="Student Name" className="w-full border p-2 rounded" required />
        <input name="enrollmentId" onChange={handleChange} value={formData.enrollmentId} placeholder="Student Enrollment ID" className="w-full border p-2 rounded" required />
        <input name="studentBlockId" onChange={handleChange} value={formData.studentBlockId} placeholder="Student Block ID" className="w-full border p-2 rounded" required />
        <input name="documentTitle" onChange={handleChange} value={formData.documentTitle} placeholder="Document Title" className="w-full border p-2 rounded" required />

        <input id="fileInput" name="documentFile" type="file" accept="image/*,.pdf" onChange={handleChange} className="w-full border p-2 rounded" required />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload Document</button>
      </form>

      {message && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {message}
        </div>
      )}
    </div>
  );
}
