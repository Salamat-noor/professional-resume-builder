"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Copy, Download, Pencil, Trash2 } from "lucide-react";

interface Resume {
  id: string;
  title: string;
  company: string;
  date: string;
  ats: number;
  status: "Active" | "Draft";
  img: string;
}

interface ResumeCardProps {
  resume: Resume;
}

export function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all group overflow-hidden relative">
      <div className="aspect-[3/4] overflow-hidden bg-gray-50 relative">
        <Image
        loading="eager"
          src={resume.img}
          alt={resume.title}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/40 transition-all flex flex-col items-center justify-center gap-2">
          <Link
            href={`/builder/${resume.id}`}
            className="bg-white text-indigo-600 font-semibold px-5 py-2.5 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer whitespace-nowrap shadow-lg"
          >
            Edit Resume
          </Link>
          <Link
            href={`/ats-checker?resumeId=${resume.id}`}
            className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-lg"
            style={{ transitionDelay: "50ms" }}
          >
            <i className="ri-shield-check-line text-sm" />
            ATS Check
          </Link>
        </div>
        <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-500">
          ATS {resume.ats}
        </Badge>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {resume.title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{resume.company}</p>
            <p className="text-xs text-gray-400 mt-1">{resume.date}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Badge
            variant={resume.status === "Active" ? "default" : "secondary"}
            className={
              resume.status === "Active"
                ? "bg-green-100 text-green-700 hover:bg-green-100"
                : ""
            }
          >
            {resume.status}
          </Badge>
        </div>
      </div>
    </div>
  );
}
