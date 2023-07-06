import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa";
import profileNull from "../assets/sem-perfil.png";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";

interface Props {
  fileSelected: File | undefined;
  onFileUploaded: (file: File) => void;
}

export const Dropzone: React.FC<Props> = ({ fileSelected, onFileUploaded }) => {
  const { user } = useAuth();
  const { userProfile } = useProfile();

  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      console.log(file);

      setSelectedFileUrl(fileUrl);
      console.log(fileUrl);
      onFileUploaded(file);

      // Do something with the files
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    maxSize: 5 * 1024 * 1024,
    noClick: true,
    multiple: false,
    maxFiles: 1,
  });

  return (
    <div
      className="flex justify-center items-center w-96 h-96 bg-background border-cardHover border  rounded-full relative"
      {...getRootProps()}
    >
      <input className="" {...getInputProps()} accept="image/*" />

      <span
        className="bg-card h-10 w-10 rounded-full absolute bottom-0 right-0 mr-2 mb-2 border-cardHover border flex items-center justify-center cursor-pointer "
        onClick={open}
      >
        <FaCamera size={20} />
      </span>

      {fileSelected ? (
        <img
          className="w-full h-full rounded-[inherit]"
          src={selectedFileUrl}
          alt="Upload"
        />
      ) : (
        <img
          className="w-full h-full rounded-[inherit]"
          src={userProfile?.image.url ? userProfile.image.url : profileNull}
          alt="profiliNull"
        />
      )}
    </div>
  );
};
