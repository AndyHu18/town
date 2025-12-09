import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { Youtube } from "@tiptap/extension-youtube";
import { common, createLowlight } from "lowlight";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  ImageIcon,
  Table as TableIcon,
  Code,
  Video,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

const lowlight = createLowlight(common);

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "開始寫作...",
}: RichTextEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block to use CodeBlockLowlight
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse table-auto w-full my-4",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-white/20 bg-white/10 px-4 py-2 text-left font-bold",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-white/20 px-4 py-2",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "bg-black/30 rounded-lg p-4 my-4 overflow-x-auto",
        },
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: "rounded-lg my-4 mx-auto",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[400px] p-4 focus:outline-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setShowLinkInput(false);
    }
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setShowImageInput(false);
    }
  };

  const addYoutube = () => {
    if (youtubeUrl) {
      editor.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run();
      setYoutubeUrl("");
      setShowYoutubeInput(false);
    }
  };

  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-white/5">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "bg-white/20 text-white"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }
        >
          <Bold className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "bg-white/20 text-white"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }
        >
          <Italic className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-white/20 text-white"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }
        >
          <Heading2 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "bg-white/20 text-white"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }
        >
          <List className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "bg-white/20 text-white"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? "bg-white/20 text-white"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }
        >
          <Quote className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive("codeBlock")
              ? "bg-white/20 text-white"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }
          title="程式碼區塊"
        >
          <Code className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertTable}
          className={
            editor.isActive("table")
              ? "bg-white/20 text-white"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }
          title="插入表格"
        >
          <TableIcon className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowLinkInput(!showLinkInput)}
          className="text-white/70 hover:text-white hover:bg-white/10"
          title="插入連結"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowImageInput(!showImageInput)}
          className="text-white/70 hover:text-white hover:bg-white/10"
          title="插入圖片"
        >
          <ImageIcon className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowYoutubeInput(!showYoutubeInput)}
          className="text-white/70 hover:text-white hover:bg-white/10"
          title="插入 YouTube 影片"
        >
          <Video className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30"
        >
          <Undo className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30"
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      {/* Link Input */}
      {showLinkInput && (
        <div className="flex gap-2 p-2 border-b border-white/10 bg-white/5">
          <Input
            type="url"
            placeholder="輸入連結 URL..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addLink()}
            className="flex-1 bg-white/5 border-white/10 text-white"
          />
          <Button
            type="button"
            size="sm"
            onClick={addLink}
            className="bg-primary hover:bg-primary/90"
          >
            添加
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setShowLinkInput(false)}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            取消
          </Button>
        </div>
      )}

      {/* Image Input */}
      {showImageInput && (
        <div className="flex gap-2 p-2 border-b border-white/10 bg-white/5">
          <Input
            type="url"
            placeholder="輸入圖片 URL..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addImage()}
            className="flex-1 bg-white/5 border-white/10 text-white"
          />
          <Button
            type="button"
            size="sm"
            onClick={addImage}
            className="bg-primary hover:bg-primary/90"
          >
            添加
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setShowImageInput(false)}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            取消
          </Button>
        </div>
      )}

      {/* YouTube Input */}
      {showYoutubeInput && (
        <div className="flex gap-2 p-2 border-b border-white/10 bg-white/5">
          <Input
            type="url"
            placeholder="輸入 YouTube URL..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addYoutube()}
            className="flex-1 bg-white/5 border-white/10 text-white"
          />
          <Button
            type="button"
            size="sm"
            onClick={addYoutube}
            className="bg-primary hover:bg-primary/90"
          >
            添加
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setShowYoutubeInput(false)}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            取消
          </Button>
        </div>
      )}

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
