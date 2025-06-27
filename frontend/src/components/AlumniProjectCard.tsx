// src/components/AlumniProjectCard.tsx
import { UserIcon } from "lucide-react";

interface AlumniProjectCardProps {
  imageUrl: string;
  title: string;
  description: string;
  authors: string[];
  projectLink: string;
}

export default function AlumniProjectCard({
  imageUrl,
  title,
  description,
  authors,
  projectLink,
}: AlumniProjectCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="text-base font-semibold leading-snug mb-2">{title}</h4>
        <p className="text-sm text-gray-700 mb-4">{description}</p>
        <div className="flex items-center text-sm text-gray-800 mb-4">
          <UserIcon className="w-4 h-4 mr-2 text-gray-600" />
          <span className="font-medium">{authors.join(", ")}</span>
        </div>
        <a
          href={projectLink}
          className="mt-auto inline-block text-white bg-green-500 hover:bg-green-600 px-4 py-2 text-sm font-medium rounded"
        >
          Jelajahi Proyek
        </a>
      </div>
    </div>
  );
}
