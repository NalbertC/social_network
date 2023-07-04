import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { TbEdit } from "react-icons/tb";
import profileNull from "../assets/sem-perfil.png";

interface Props {
  onFileUploaded: (file: File) => void;
}

export const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    console.log(file);

    setSelectedFileUrl(fileUrl);
    console.log(fileUrl);
    onFileUploaded(file);

    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    maxSize: 5 * 1024 * 1024,
    noClick: true,
    multiple: false,
    maxFiles: 1,
  });

  return (
    <div
      className="flex justify-center items-center w-[200px] h-[200px] border-dashed border-dark-400 border-[2px] bg-dark-300 mb-2 rounded-full relative"
      {...getRootProps()}
    >
      <input className="" {...getInputProps()} accept="image/*" />
      <span
        className="cursor-pointer border bg-dark-300 w-8 h-8 flex justify-center items-center rounded-full absolute bottom-0 pt- right-0"
        onClick={open}
      >
        <TbEdit className="text-[30px]" />
      </span>

      {selectedFileUrl ? (
        <img
          className="w-full h-full rounded-[inherit]"
          src={selectedFileUrl}
          alt="Upload"
        />
      ) : (
        <img
          className="w-full h-full rounded-[inherit]"
          src={profileNull}
          alt="profiliNull"
        />
      )}
    </div>
  );
};
