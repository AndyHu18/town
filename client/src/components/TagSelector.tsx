import { useState } from "react";
import { X, Plus } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

interface TagSelectorProps {
  selectedTagIds: number[];
  onChange: (tagIds: number[]) => void;
}

export default function TagSelector({ selectedTagIds, onChange }: TagSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: allTags } = trpc.articles.tags.useQuery();

  const selectedTags = allTags?.filter((tag) => selectedTagIds.includes(tag.id)) || [];
  const availableTags = allTags?.filter((tag) => !selectedTagIds.includes(tag.id)) || [];

  const addTag = (tagId: number) => {
    onChange([...selectedTagIds, tagId]);
  };

  const removeTag = (tagId: number) => {
    onChange(selectedTagIds.filter((id) => id !== tagId));
  };

  return (
    <div className="space-y-2">
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <Badge
            key={tag.id}
            variant="secondary"
            className="bg-primary/20 text-primary border-primary/30 px-3 py-1"
          >
            {tag.name}
            <button
              type="button"
              onClick={() => removeTag(tag.id)}
              className="ml-2 hover:text-primary-foreground"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>

      {/* Add Tag Button */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-white/10 text-white/70 hover:text-white hover:bg-white/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            添加標籤
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 bg-[#0B1221] border-white/10 p-2">
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {availableTags.length > 0 ? (
              availableTags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => {
                    addTag(tag.id);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/10 rounded transition-colors"
                >
                  {tag.name}
                </button>
              ))
            ) : (
              <p className="text-white/50 text-sm text-center py-4">
                沒有可用的標籤
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
