import { useEffect, useState } from 'react';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('currentStudent');
    if (data) {
      const parsed = JSON.parse(data);
      setStudent(parsed);

      // Load student documents
      const uploadedDocs = JSON.parse(localStorage.getItem(`docs-${parsed.blockId}`)) || [];
      setDocuments(uploadedDocs);
    }
  }, []);

  const copyBlockId = () => {
    navigator.clipboard.writeText(student.blockId);
    alert('Block ID copied to clipboard!');
  };

  if (!student) return <div className="text-center mt-20 text-red-500">Student not logged in.</div>;

  const shortBlockId = student.blockId.slice(0, 10) + '...';

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex items-center gap-4 bg-white p-4 rounded shadow">
        <div className="bg-blue-600 text-white font-bold text-xl w-12 h-12 flex items-center justify-center rounded-full">
          {student.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="text-lg font-semibold">{student.name}</div>
          <div className="text-sm text-gray-600">Block ID: {shortBlockId}
            <button onClick={copyBlockId} className="ml-2 text-blue-500 underline text-xs">Copy</button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow space-y-2">
        <div><strong>Institution:</strong> {student.institution}</div>
        <div><strong>Enrollment ID:</strong> {student.enrollmentId}</div>
        <div><strong>No. of Documents:</strong> {documents.length}</div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Uploaded Documents</h3>
        {documents.length === 0 ? (
          <div className="text-gray-500">No documents uploaded yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, index) => (
              <div key={index} className="bg-white p-4 rounded shadow">
                <div className="font-semibold">{doc.title}</div>
                {doc.fileType.startsWith('image') ? (
                  <img src={doc.fileUrl} alt={doc.title} className="mt-2 rounded w-full max-h-64 object-contain" />
                ) : (
                  <p className="mt-2 text-sm text-gray-700">PDF or Other File</p>
                )}
                <a
                  href={doc.fileUrl}
                  download={doc.title}
                  className="inline-block mt-3 px-3 py-1 bg-green-600 text-white text-sm rounded"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
