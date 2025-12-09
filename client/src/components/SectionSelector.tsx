import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface Section {
  id: number;
  pageKey: string;
  sectionKey: string;
  sectionName: string;
  description?: string | null;
}

interface SectionSelectorProps {
  sections: Section[];
  selectedSectionIds: number[];
  onChange: (sectionIds: number[]) => void;
}

export default function SectionSelector({
  sections,
  selectedSectionIds,
  onChange,
}: SectionSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Group sections by page
  const groupedSections = sections.reduce((acc, section) => {
    if (!acc[section.pageKey]) {
      acc[section.pageKey] = [];
    }
    acc[section.pageKey].push(section);
    return acc;
  }, {} as Record<string, Section[]>);

  // Get page display name
  const getPageDisplayName = (pageKey: string) => {
    const pageNames: Record<string, string> = {
      home: "首頁",
      about: "進入園區",
      features: "六大面向",
      wellness: "健康醫療",
      farm: "休閒農場",
      lifestyle: "生活服務",
      video_tour: "介紹影片",
      contact: "聯絡我們",
    };
    return pageNames[pageKey] || pageKey;
  };

  const toggleSection = (sectionId: number) => {
    if (selectedSectionIds.includes(sectionId)) {
      onChange(selectedSectionIds.filter((id) => id !== sectionId));
    } else {
      onChange([...selectedSectionIds, sectionId]);
    }
  };

  const removeSection = (sectionId: number) => {
    onChange(selectedSectionIds.filter((id) => id !== sectionId));
  };

  const selectedSections = sections.filter((s) => selectedSectionIds.includes(s.id));

  // Filter sections based on search query
  const filteredGroupedSections = Object.entries(groupedSections).reduce((acc, [pageKey, pageSections]) => {
    const filtered = pageSections.filter((section) =>
      section.sectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getPageDisplayName(pageKey).toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[pageKey] = filtered;
    }
    return acc;
  }, {} as Record<string, Section[]>);

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedSections.length > 0
              ? `已選擇 ${selectedSections.length} 個區域`
              : "選擇顯示區域..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="搜尋區域..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandEmpty>找不到相關區域</CommandEmpty>
            <div className="max-h-[300px] overflow-y-auto">
              {Object.entries(filteredGroupedSections).map(([pageKey, pageSections]) => (
                <CommandGroup key={pageKey} heading={getPageDisplayName(pageKey)}>
                  {pageSections.map((section) => (
                    <CommandItem
                      key={section.id}
                      value={`${section.pageKey}-${section.sectionKey}`}
                      onSelect={() => {
                        toggleSection(section.id);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedSectionIds.includes(section.id)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{section.sectionName}</span>
                        {section.description && (
                          <span className="text-xs text-muted-foreground">
                            {section.description}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </div>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected sections badges */}
      {selectedSections.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSections.map((section) => (
            <Badge
              key={section.id}
              variant="secondary"
              className="pl-2 pr-1 py-1"
            >
              <span className="text-xs">
                {getPageDisplayName(section.pageKey)} / {section.sectionName}
              </span>
              <button
                onClick={() => removeSection(section.id)}
                className="ml-1 hover:bg-muted rounded-sm p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
