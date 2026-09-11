import { NextRequest, NextResponse } from "next/server";
import { RESUME_LINK } from "@/lib/constants";

// Google Drive link se ID nikalne ka logic
const getDriveId = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

export async function GET(req: NextRequest) {
  const fileId = getDriveId(RESUME_LINK);

  console.log("resume", RESUME_LINK, fileId);

  if (!fileId) {
    return new NextResponse("Invalid Drive Link", { status: 400 });
  }


  console.log("fileId", fileId);
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  console.log("downloadURL", downloadUrl);

  try {
    const response = await fetch(downloadUrl);
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return new NextResponse("Error loading resume", { status: 500 });
  }
}