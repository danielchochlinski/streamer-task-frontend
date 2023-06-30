import React, { useState } from "react";
import styles from "../HomeView.module.scss";
interface IStreamer {
  name: string;
  description: string;
  platform: string[];
  votes: {};
  popularity: number;
  image: any;
}

const initialValues: IStreamer = {
  name: "",
  description: "",
  platform: [],
  votes: {},
  popularity: 0,
  image: null,
};

const Form = () => {
  const [data, setData] = useState<IStreamer>(initialValues);
  const [formatError, setFormatError] = useState(false);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      if (files && files[0]) {
        const allowedFormats = ["png", "jpg", "jpeg", "heic"];
        const fileExtension = files[0].name.split(".").pop()?.toLowerCase(); // Use optional chaining here
        const isValidFormat = allowedFormats.includes(fileExtension!); // Use type assertion (!) to assert that fileExtension is not undefined

        setData({
          ...data,
          [name]: files[0],
        });
        setFormatError(!isValidFormat);
      } else {
        setData({
          ...data,
          [name]: null,
        });
        setFormatError(false);
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  return (
    <div className={styles.form}>
      <input type="text" name="name" onChange={inputHandler} />
      <input type="text" name="description" onChange={inputHandler} />
      <input type="text" name="platforms" onChange={inputHandler} />
      <input type="file" name="image" onChange={inputHandler} />
      {formatError && (
        <p>Please select a valid image file (png, jpg, jpeg, heic).</p>
      )}
    </div>
  );
};

export default Form;
