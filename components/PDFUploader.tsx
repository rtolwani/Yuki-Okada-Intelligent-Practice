'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, Loader2 } from 'lucide-react'

interface PDFFile {
  id: string
  name: string
  size: number
  summary?: string
  loading?: boolean
}

export default function PDFUploader() {
  const [files, setFiles] = useState<PDFFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: PDFFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
    }))
    
    setFiles(prev => [...prev, ...newFiles])
    
    // Simulate AI processing for each file
    newFiles.forEach(file => {
      processFile(file.id)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true
  })

  const processFile = async (fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, loading: true } : f
    ))

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Simulate AI summary
    const mockSummary = `This case involves a [breed] with [condition]. Key findings include [lab values] and [clinical signs]. The patient has been on [current diet] for [duration]. Recommendations include [dietary changes] and [monitoring parameters].`

    setFiles(prev => prev.map(f => 
      f.id === fileId ? { 
        ...f, 
        summary: mockSummary, 
        loading: false 
      } : f
    ))
  }

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Case Record Upload</h3>
      <p className="text-gray-600 mb-6">
        Upload PDF case records for AI-powered analysis and summarization. 
        Dr. Okada will review the AI-generated summaries to prepare for consultations.
      </p>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          {isDragActive ? 'Drop PDF files here' : 'Drag & drop PDF files here'}
        </p>
        <p className="text-gray-500">
          or click to select files
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Supports multiple PDF files
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <h4 className="font-medium text-gray-900">Uploaded Files</h4>
          {files.map((file) => (
            <div key={file.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Processing Status */}
              {file.loading && (
                <div className="mt-3 flex items-center space-x-2 text-sm text-blue-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>AI analyzing case record...</span>
                </div>
              )}

              {/* AI Summary */}
              {file.summary && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">AI Summary</h5>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {file.summary}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Upload Guidelines</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Include complete medical records, lab results, and current diet information</li>
          <li>• Ensure PDFs are readable and not password-protected</li>
          <li>• AI will analyze and provide initial case summaries</li>
          <li>• Dr. Okada will review all summaries before consultation</li>
        </ul>
      </div>
    </div>
  )
}
