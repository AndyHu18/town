import { useState, useEffect, useCallback } from "react";
import { useRoute, useLocation } from "wouter";
import { ArrowLeft, Save, Eye, Loader2, Clock } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichTextEditor from "@/components/RichTextEditor";
import ImageUpload from "@/components/ImageUpload";
import TagSelector from "@/components/TagSelector";
import SectionSelector from "@/components/SectionSelector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";

export default function ArticleEditor() {
  const [, params] = useRoute("/admin/article/:id");
  const [, setLocation] = useLocation();
  const articleId = params?.id === "new" ? null : parseInt(params?.id || "0");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [selectedSectionIds, setSelectedSectionIds] = useState<number[]>([]);
  const [scheduledPublishAt, setScheduledPublishAt] = useState<Date | null>(null);
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [ogImage, setOgImage] = useState("");

  const utils = trpc.useUtils();

  // Auto-save key for localStorage
  const autoSaveKey = `article-draft-${articleId || 'new'}`;

  // Fetch article if editing
  const { data: article, isLoading: articleLoading } =
    trpc.articles.getById.useQuery(
      { id: articleId! },
      { enabled: articleId !== null }
    );

  // Fetch categories
  const { data: categories } = trpc.articles.categories.useQuery();

  // Create mutation
  const createMutation = trpc.articles.create.useMutation({
    onSuccess: () => {
      toast.success("文章已創建");
      setLocation("/admin");
    },
    onError: (error) => {
      toast.error(error.message || "創建失敗");
    },
  });

  // Update mutation
  const updateMutation = trpc.articles.update.useMutation({
    onSuccess: () => {
      toast.success("文章已更新");
      utils.articles.getById.invalidate({ id: articleId! });
    },
    onError: (error) => {
      toast.error(error.message || "更新失敗");
    },
  });

  // Set article tags mutation
  const setArticleTagsMutation = trpc.articles.setArticleTags.useMutation({
    onSuccess: () => {
      toast.success("標籤已更新");
    },
    onError: (error) => {
      toast.error(error.message || "標籤更新失敗");
    },
  });

  // Fetch article tags
  const { data: articleTags } = trpc.articles.getArticleTags.useQuery(
    { articleId: articleId! },
    { enabled: articleId !== null }
  );

  // Load article data when editing
  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setSlug(article.slug);
      setContent(article.content);
      setExcerpt(article.excerpt || "");
      setCoverImage(article.coverImage || "");
      setCategoryId(article.categoryId);
      setStatus(article.status);
      setScheduledPublishAt(article.scheduledPublishAt ? new Date(article.scheduledPublishAt) : null);
      setMetaDescription(article.metaDescription || "");
      setMetaKeywords(article.metaKeywords || "");
      setOgImage(article.ogImage || "");
    }
  }, [article]);

  // Load article tags when editing
  useEffect(() => {
    if (articleTags) {
      setSelectedTagIds(articleTags.map((tag) => tag.id));
    }
  }, [articleTags]);

  // Fetch all available sections
  const { data: allSections } = trpc.articles.getSections.useQuery();

  // Fetch article sections
  const { data: articleSections } = trpc.articles.getArticleSections.useQuery(
    { articleId: articleId! },
    { enabled: articleId !== null }
  );

  // Set article sections mutation
  const setArticleSectionsMutation = trpc.articles.setArticleSections.useMutation({
    onSuccess: () => {
      toast.success("區域已更新");
    },
    onError: (error) => {
      toast.error(error.message || "區域更新失敗");
    },
  });

  // Load article sections when editing
  useEffect(() => {
    if (articleSections) {
      setSelectedSectionIds(articleSections.map((section) => section.sectionId));
    }
  }, [articleSections]);

  // Load auto-saved draft from localStorage on mount
  useEffect(() => {
    if (!articleId) {
      // Only load auto-save for new articles
      const saved = localStorage.getItem(autoSaveKey);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          const shouldRestore = window.confirm(
            `發現自動儲存的草稿 (${new Date(data.timestamp).toLocaleString('zh-TW')})。是否要恢復?`
          );
          if (shouldRestore) {
            setTitle(data.title || "");
            setSlug(data.slug || "");
            setContent(data.content || "");
            setExcerpt(data.excerpt || "");
            setCoverImage(data.coverImage || "");
            setCategoryId(data.categoryId || null);
            toast.success("已恢復自動儲存的草稿");
          } else {
            localStorage.removeItem(autoSaveKey);
          }
        } catch (e) {
          console.error("Failed to load auto-saved draft", e);
        }
      }
    }
  }, [articleId, autoSaveKey]);

  // Auto-save to localStorage every 30 seconds
  const saveToLocalStorage = useCallback(() => {
    if (!autoSaveEnabled) return;
    
    const draft = {
      title,
      slug,
      content,
      excerpt,
      coverImage,
      categoryId,
      timestamp: new Date().toISOString(),
    };
    
    try {
      localStorage.setItem(autoSaveKey, JSON.stringify(draft));
      setLastSaved(new Date());
    } catch (e) {
      console.error("Auto-save failed", e);
      toast.error("自動儲存失敗");
    }
  }, [title, slug, content, excerpt, coverImage, categoryId, autoSaveKey, autoSaveEnabled]);

  useEffect(() => {
    if (!title && !content) return; // Don't auto-save empty drafts
    
    const interval = setInterval(() => {
      saveToLocalStorage();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [saveToLocalStorage, title, content]);

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!articleId) {
      // Only auto-generate slug for new articles
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("請輸入文章標題");
      return;
    }

    if (!slug.trim()) {
      toast.error("請輸入文章網址");
      return;
    }

    if (!content.trim()) {
      toast.error("請輸入文章內容");
      return;
    }

    const data = {
      title,
      slug,
      content,
      excerpt: excerpt || undefined,
      coverImage: coverImage || undefined,
      categoryId: categoryId || undefined,
      status,
      scheduledPublishAt: scheduledPublishAt || undefined,
      metaDescription: metaDescription || undefined,
      metaKeywords: metaKeywords || undefined,
      ogImage: ogImage || undefined,
    };

    if (articleId) {
      updateMutation.mutate({ id: articleId, ...data }, {
        onSuccess: () => {
          // Save tags after article is updated
          if (selectedTagIds.length > 0 || true) {
            setArticleTagsMutation.mutate({
              articleId,
              tagIds: selectedTagIds,
            });
          }
          // Save sections after article is updated
          if (selectedSectionIds.length > 0 || true) {
            setArticleSectionsMutation.mutate({
              articleId,
              sectionIds: selectedSectionIds,
            });
          }
        },
      });
    } else {
      createMutation.mutate(data);
      // Clear auto-saved draft after successful creation
      localStorage.removeItem(autoSaveKey);
    }
  };

  if (articleLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B1221] via-[#0B1221]/95 to-[#0B1221] pt-32 pb-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1221] via-[#0B1221]/95 to-[#0B1221] pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/admin")}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>
            <div>
              <h1 className="text-3xl font-serif font-bold text-white">
                {articleId ? "編輯文章" : "新增文章"}
              </h1>
              {lastSaved && (
                <p className="text-white/50 text-sm mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  最後自動儲存: {lastSaved.toLocaleTimeString('zh-TW')}
                </p>
              )}
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setAutoSaveEnabled(!autoSaveEnabled);
              toast.success(autoSaveEnabled ? "已停用自動儲存" : "已啟用自動儲存");
            }}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            {autoSaveEnabled ? "停用自動儲存" : "啟用自動儲存"}
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-white mb-2 block">
              文章標題 *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="輸入文章標題..."
              className="bg-white/5 border-white/10 text-white text-lg"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <Label htmlFor="slug" className="text-white mb-2 block">
              文章網址 (URL Slug) *
            </Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="article-url-slug"
              className="bg-white/5 border-white/10 text-white font-mono"
              required
            />
            <p className="text-white/50 text-sm mt-1">
              預覽: /articles/{slug || "article-url-slug"}
            </p>
          </div>

          {/* Cover Image */}
          <div>
            <Label className="text-white mb-2 block">
              封面圖片
            </Label>
            <ImageUpload
              value={coverImage}
              onChange={setCoverImage}
              onRemove={() => setCoverImage("")}
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-white mb-2 block">
              分類
            </Label>
            <Select
              value={categoryId?.toString() || ""}
              onValueChange={(value) => setCategoryId(parseInt(value))}
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="選擇分類..." />
              </SelectTrigger>
              <SelectContent className="bg-[#0B1221] border-white/10">
                {categories?.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id.toString()}
                    className="text-white hover:bg-white/10"
                  >
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Excerpt */}
          <div>
            <Label htmlFor="excerpt" className="text-white mb-2 block">
              摘要
            </Label>
            <Input
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="簡短描述文章內容..."
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          {/* Content */}
          <div>
            <Label className="text-white mb-2 block">文章內容 *</Label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          {/* Tags */}
          <div>
            <Label className="text-white mb-2 block">
              標籤
            </Label>
            <TagSelector
              selectedTagIds={selectedTagIds}
              onChange={setSelectedTagIds}
            />
          </div>

          {/* Page Sections */}
          <div>
            <Label className="text-white mb-2 block">
              顯示區域
            </Label>
            <p className="text-sm text-white/60 mb-2">
              選擇文章要顯示在哪些頁面的區域（可多選）
            </p>
            {allSections && (
              <SectionSelector
                sections={allSections}
                selectedSectionIds={selectedSectionIds}
                onChange={setSelectedSectionIds}
              />
            )}
          </div>

          {/* SEO Section */}
          <div className="border border-white/10 rounded-lg p-4 space-y-4 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-2">SEO 優化</h3>
            
            {/* Meta Description */}
            <div>
              <Label htmlFor="metaDescription" className="text-white mb-2 block">
                Meta 描述 (最多 160 字元)
              </Label>
              <Input
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="簡短描述文章內容，用於搜尋引擎顯示..."
                maxLength={160}
                className="bg-white/5 border-white/10 text-white"
              />
              <p className="text-white/50 text-xs mt-1">
                {metaDescription.length} / 160 字元
              </p>
            </div>

            {/* Meta Keywords */}
            <div>
              <Label htmlFor="metaKeywords" className="text-white mb-2 block">
                關鍵字 (以逗號分隔)
              </Label>
              <Input
                id="metaKeywords"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                placeholder="健康, 養生, 華友聯"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            {/* OG Image */}
            <div>
              <Label htmlFor="ogImage" className="text-white mb-2 block">
                Open Graph 圖片 (URL)
              </Label>
              <Input
                id="ogImage"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="bg-white/5 border-white/10 text-white"
              />
              <p className="text-white/50 text-xs mt-1">
                用於社群媒體分享時顯示的圖片
              </p>
            </div>
          </div>

          {/* Scheduling */}
          <div>
            <Label className="text-white mb-2 block">
              排程發布時間
            </Label>
            <DatePicker
              selected={scheduledPublishAt}
              onChange={(date) => setScheduledPublishAt(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy/MM/dd HH:mm"
              placeholderText="選擇發布時間..."
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-white/40"
              minDate={new Date()}
              isClearable
            />
            <p className="text-white/50 text-xs mt-1">
              留空則立即發布，設定時間則自動在指定時間發布
            </p>
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status" className="text-white mb-2 block">
              狀態
            </Label>
            <Select value={status} onValueChange={(v: any) => setStatus(v)}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0B1221] border-white/10">
                <SelectItem
                  value="draft"
                  className="text-white hover:bg-white/10"
                >
                  草稿
                </SelectItem>
                <SelectItem
                  value="published"
                  className="text-white hover:bg-white/10"
                >
                  發布
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {createMutation.isPending || updateMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  保存中...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {articleId ? "更新文章" : "創建文章"}
                </>
              )}
            </Button>

            {articleId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => window.open(`/admin/article/${articleId}/preview`, "_blank")}
                className="border-white/10 text-white hover:bg-white/10"
              >
                <Eye className="w-4 h-4 mr-2" />
                預覽
              </Button>
            )}

            {slug && article?.status === "published" && (
              <Button
                type="button"
                variant="outline"
                onClick={() => window.open(`/articles/${slug}`, "_blank")}
                className="border-white/10 text-white hover:bg-white/10"
              >
                <Eye className="w-4 h-4 mr-2" />
                預覽
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
