import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// TODO: Replace atob-based JWT parsing with proper verification using a secret
// key (e.g. jose or jsonwebtoken) once the auth service is finalised.
function authMiddleware() {
  return async ({ req }: { req: Request }) => {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new UploadThingError("Unauthorized");

    const token = authHeader.slice(7);
    try {
      // Decode the JWT payload (second segment, base64url-encoded)
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Malformed token");
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      const userId = payload.sub ?? payload.userId;
      if (!userId) throw new Error("Missing userId in token payload");
      return { userId: String(userId) };
    } catch {
      throw new UploadThingError("Invalid or expired token");
    }
  };
}

// FileRouter for your app
export const ourFileRouter = {
  // Profile photo upload
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(authMiddleware())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Profile image uploaded:", file.url);
      return { url: file.url };
    }),

  // Resume/CV upload
  resumeUpload: f({ pdf: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(authMiddleware())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Resume uploaded:", file.url);
      return { url: file.url };
    }),

  // ID/Document upload
  documentUpload: f({
    image: { maxFileSize: "8MB", maxFileCount: 2 },
    pdf: { maxFileSize: "8MB", maxFileCount: 2 }
  })
    .middleware(authMiddleware())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Document uploaded:", file.url);
      return { url: file.url };
    }),

  // Company logo upload
  companyLogo: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(authMiddleware())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Company logo uploaded:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
