import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface ObjectUploaderProps {
  onUploadComplete: (url: string) => void;
  accept?: string;
  maxSizeMB?: number;
}

export function ObjectUploader({
  onUploadComplete,
  accept = "image/*",
  maxSizeMB = 5,
}: ObjectUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const uploadUrlRes = await apiRequest(
        "POST",
        "/api/objects/upload-url",
        { fileName: file.name, contentType: file.type }
      );
      const { url, objectPath } = await uploadUrlRes.json();

      await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      const makePublicRes = await apiRequest(
        "POST",
        "/api/objects/make-public",
        { objectPath }
      );
      const { url: publicUrl } = await makePublicRes.json();

      onUploadComplete(publicUrl);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload file");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        data-testid="input-file-upload"
      />

      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-md border"
            data-testid="img-upload-preview"
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
          {!uploading && (
            <Button
              size="icon"
              variant="destructive"
              className="absolute -top-2 -right-2 w-6 h-6"
              onClick={handleClear}
              data-testid="button-clear-upload"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          data-testid="button-upload-image"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Image
        </Button>
      )}

      {error && (
        <p className="text-sm text-destructive" data-testid="text-upload-error">
          {error}
        </p>
      )}
    </div>
  );
}
