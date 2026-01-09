import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// 1. Generate individual components
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// 2. Generate the Hooks
export const { useUploadThing, uploadFiles } = 
  generateReactHelpers<OurFileRouter>();