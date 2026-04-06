"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TemplateId } from "@/types/builder";
import {
  getAllTemplates,
  getTemplateConfig,
} from "@/lib/templates/registry";

interface Props {
  currentTemplateId: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
  unlockedTemplates?: TemplateId[];
}

export function TemplateSwitcher({
  currentTemplateId,
  onSelectTemplate,
  unlockedTemplates = ["template-one", "template-two", "template-three", "template-four"],
}: Props) {
  const [open, setOpen] = useState(false);
  const templates = getAllTemplates();

  const handleSelect = (templateId: TemplateId) => {
    const config = getTemplateConfig(templateId);
    const isUnlocked = unlockedTemplates.includes(templateId) || !config?.isPremium;

    if (!isUnlocked) {
      // TODO: Show upgrade modal
      return;
    }

    onSelectTemplate(templateId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2">
            <i className="ri-layout-grid-line" />
            Templates
          </Button>
        }
      />
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Select a template to change your resume&apos;s design and layout
          </p>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {templates.map((template) => {
            const isUnlocked =
              unlockedTemplates.includes(template.id) || !template.isPremium;
            const isActive = currentTemplateId === template.id;

            return (
              <button
                key={template.id}
                onClick={() => handleSelect(template.id)}
                disabled={!isUnlocked}
                className={`
                  relative group rounded-lg border-2 overflow-hidden transition-all
                  ${
                    isActive
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }
                  ${!isUnlocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                {/* Template Preview */}
                <div className="aspect-[8.5/11] bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Placeholder for actual template thumbnail */}
                    <div className="w-full h-full p-4 bg-white shadow-sm">
                      <div className="h-3 w-1/2 bg-gray-300 rounded mb-2" />
                      <div className="h-2 w-1/3 bg-gray-200 rounded mb-4" />
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-gray-100 rounded" />
                        <div className="h-2 w-4/5 bg-gray-100 rounded" />
                        <div className="h-2 w-3/4 bg-gray-100 rounded" />
                      </div>
                      <div className="mt-4 space-y-1">
                        <div className="h-1.5 w-1/4 bg-primary/30 rounded" />
                        <div className="h-2 w-full bg-gray-50 rounded" />
                        <div className="h-2 w-full bg-gray-50 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Premium Badge */}
                  {template.isPremium && !isUnlocked && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                        <i className="ri-vip-crown-line" />
                        Premium
                      </div>
                    </div>
                  )}

                  {/* Active Badge */}
                  {isActive && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        <i className="ri-check-line mr-1" />
                        Active
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-3 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{template.name}</h3>
                    {template.isPremium && isUnlocked && (
                      <i className="ri-vip-crown-line text-amber-500 text-sm" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.sections.slice(0, 4).map((section) => (
                      <span
                        key={section.id}
                        className="text-[10px] px-1.5 py-0.5 bg-muted rounded"
                      >
                        {section.label}
                      </span>
                    ))}
                    {template.sections.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-muted rounded">
                        +{template.sections.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
