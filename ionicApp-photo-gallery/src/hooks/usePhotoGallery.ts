import { useState, useEffect } from 'react';
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import {
    CameraResultType, CameraSource,
    CameraPhoto, Capacitor, FilesystemDirectory
} from '@capacitor/core';
import { Interface } from 'readline';
import { camera } from 'ionicons/icons';

// Defining a constant variable that will act as the key for the store.
const PHOTO_STORAGE = "photos";

// Create a new type to define our Photo, which will hold specific metadata.
export type Photo = {
    filepath: string;
    webviewPath?: string;
}

// Our usePhotoGallery hook exposes a method called takePhoto, which in 
// turn calls into Capacitor's getPhoto method.
// getPhoto() will open up the divices's camera and allows us to take photos
export function usePhotoGallery() {

    const { get, set } = useStorage();
    const { getPhoto } = useCamera();
    const [photos, setPhotos] = useState<Photo[]>([]);

    // Filesystem API - to save photo to the filesystem.
    const { deleteFile, getUri, readFile, writeFile } = useFilesystem();

    // Method will retrieve the data when the hook loads.
    useEffect(() => {
        const loadSaved = async () => {
            const photosString = await get(PHOTO_STORAGE);
            const photos = (photosString ? JSON.parse(photosString) : []) as Photo[];
            for (let photo of photos) {
                const file = await readFile({
                    path: photo.filepath,
                    directory: FilesystemDirectory.Data
                });
                photo.webviewPath = `data:image/jpeg; base64, ${file.data}`;
            }
            setPhotos(photos);
        };
        loadSaved();
    }, [get, readFile]);

    // Saving functionality to support mobile. 
    const savePicture = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {

        const base64Data = await base64FromPath(photo.webPath!);
        const savedFile = await writeFile({
            path: fileName,
            data: base64Data,
            directory: FilesystemDirectory.Data
        })

        // Use webPath to display the new image instead of base64 since it's 
        // already loaded into memory
        return {
            filepath: fileName,
            webviewPath: photo.webPath
        }
    }


    const takePhoto = async () => {

        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });

        const fileName = new Date().getTime() + '.jpeg';
        const savedFileImage = await savePicture(cameraPhoto, fileName);
        const newPhotos = [savedFileImage, ...photos]
        setPhotos(newPhotos)
        set(PHOTO_STORAGE, JSON.stringify(newPhotos))
    }

    return {
        photos,
        takePhoto
    };
}

// The base64FromPath method is a helper util imported from '@ionic/react-hooks/filesystem'
// It downloads a file from the supplied path and returns a base64 representation of that file.

// The useEffect hook, by default, gets called each time a component
// renders, unless, we pass in a dependency array. In that case, it will
// run when a dependency gets updated. In our case we only want it to be 
// called once. 
// The 'get' and 'readFile' methods will never change so the callback will 
// only be run once. 

// The dependency array should pass in any external references the hook will 
// use internally, which is why we pass in the 'get' and 'readFile' methods.

// The first parameter to useEffect is the function that will be called by the effect.
// We pass in an anonymous arrow function, and inside of it we define another
// asynchronous method and then immediately call this. 

// We have to call the async function from within the hook has the hook callback
// can't be asynchronous itself.