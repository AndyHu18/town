import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("請選擇圖片文件");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("圖片大小不能超過 5MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("上傳失敗");
      }

      const data = await response.json();
      onChange(data.url);
      toast.success("圖片上傳成功");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("圖片上傳失敗，請重試");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-64 object-cover rounded-lg border border-white/10"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              更換圖片
            </Button>
            {onRemove && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={onRemove}
              >
                <X className="w-4 h-4 mr-2" />
                移除
              </Button>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full h-64 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-white/70">上傳中...</p>
            </>
          ) : (
            <>
              <ImageIcon className="w-12 h-12 text-white/30" />
              <div className="text-center">
                <p className="text-white/70 mb-1">點擊上傳圖片</p>
                <p className="text-white/50 text-sm">
                  支援 JPG、PNG、GIF，最大 5MB
                </p>
              </div>
            </>
          )}
        </button>
      )}
    </div>
  );
}
