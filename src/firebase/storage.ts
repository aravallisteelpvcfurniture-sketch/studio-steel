'use client';

import { FirebaseStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Uploads a file to Firebase Storage.
 * @param storage The Firebase Storage instance.
 * @param file The file to upload.
 * @param path The path in the storage bucket to upload the file to.
 * @returns A promise that resolves with the download URL of the uploaded file.
 */
export async function uploadFile(storage: FirebaseStorage, file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    
    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
}
