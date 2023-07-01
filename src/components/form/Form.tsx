import React, { useContext, useEffect, useState } from "react";
import styles from "./Form.module.scss";
import { Button, Input, Radio, Textarea } from "@mui/joy";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { IStreamer } from "../../types/types";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import {
  uniqueID,
  useNotification,
} from "../../context/notifications/NotificationProvider";
import AppContext from "../../context/AppContext";
import faceOne from "../../assets/faceOne.jpeg";
import faceTwo from "../../assets/faceTwo.jpeg";
import faceThree from "../../assets/faceThree.jpeg";
import faceFour from "../../assets/faceFour.jpeg";
import faceFive from "../../assets/faceFive.jpeg";

const mapRadioButton = [
  {
    value: "youtube",
    label: "YouTube",
  },
  {
    value: "twitter",
    label: "Twitter",
  },
  {
    value: "kick",
    label: "Kick",
  },
  {
    value: "twitch",
    label: "Twitch",
  },
  {
    value: "rumble",
    label: "Rumble",
  },
  {
    value: "tiktok",
    label: "TikTok",
  },
];
const initialValues: IStreamer = {
  _id: "",
  name: "",
  description: "",
  platforms: [],
  votes: { up: 0, down: 0 },
  popularity: 0,
  image: null,
};

const Form = () => {
  const ctxApp = useContext(AppContext);
  const [data, setData] = useState<IStreamer>(initialValues);
  const [formatError, setFormatError] = useState(false);
  const notification = useNotification();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [nameError, setNameError] = useState({ isError: false, message: "" });
  const [descriptionError, setDescriptionError] = useState({
    isError: false,
    message: "",
  });
  const [platformsError, setPlatformsError] = useState({
    isError: false,
    message: "",
  });
  const [isQuestionMarkVisible, setIsQuestionMarkVisible] = useState(false);

  const handleRadioChange = (value: string) => {
    setSelectedValues((prevSelectedValues) => {
      if (prevSelectedValues.includes(value)) {
        return prevSelectedValues.filter((item) => item !== value);
      } else {
        return [...prevSelectedValues, value];
      }
    });
  };

  useEffect(() => {
    if (selectedValues.length === 0) {
      setPlatformsError({
        isError: true,
        message: "Please select at least one platform!",
      });
    } else {
      setPlatformsError({
        isError: false,
        message: "",
      });
    }
  }, [selectedValues]);
  const inputHandler = (e: any) => {
    const { name, value } = e.target;

    if (name === "name") {
      if (value.length < 2) {
        setNameError({
          isError: true,
          message: "Name must be at least 2 characters long.",
        });
      } else {
        setNameError({ isError: false, message: "" });
      }
    } else if (name === "description") {
      if (value.length < 2) {
        setDescriptionError({
          isError: true,
          message: "Description must be at least 2 characters long.",
        });
      } else {
        setDescriptionError({ isError: false, message: "" });
      }
    }

    if (name === "image") {
      const fileInput = e.target;
      if (fileInput.files && fileInput.files[0]) {
        const allowedFormats = ["png", "jpg", "jpeg", "heic"];
        const fileExtension = fileInput.files[0].name
          .split(".")
          .pop()
          ?.toLowerCase();
        const isValidFormat = allowedFormats.includes(fileExtension!);

        setData({
          ...data,
          [name]: fileInput.files[0],
        });
        console.log(data.image);
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

  const createStreamerHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("platforms", JSON.stringify(selectedValues));

      if (data.image) {
        formData.append("image", data.image);
      } else {
        const randomImageIndex = Math.floor(Math.random() * 5);
        const randomImage = [faceOne, faceTwo, faceThree, faceFour, faceFive][
          randomImageIndex
        ];
        const response = await fetch(randomImage);
        const blob = await response.blob();
        formData.append("image", blob);
      }

      const response = await axios.post(`${BASE_URL}/streamer`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData(initialValues);
      setSelectedValues([]);
      setFormatError(false);
      notification({
        id: uniqueID(),
        type: response.data.status,
        message: response.data.message,
      });
      ctxApp.setForceReloadContext();
      ctxApp.setOpenFormContext(false);
    } catch (err) {
      console.error(err);
      notification({
        id: uniqueID(),
        type: "ERROR",
        message: "Something went WRONG",
      });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h3>Add Streamer</h3>
        <Input
          placeholder="Name"
          size="sm"
          type="text"
          name="name"
          onChange={inputHandler}
          onBlur={inputHandler}
          error={nameError.isError}
        />
        <Textarea
          minRows={3}
          className={styles.textarea}
          name="description"
          onChange={inputHandler}
          onBlur={inputHandler}
          placeholder="Description"
          error={descriptionError.isError}
        />
        <div className={styles.platform}>
          {mapRadioButton.map((el) => (
            <Radio
              key={el.value}
              sx={{ width: "50%", margin: "5px 0" }}
              value={el.value}
              label={el.label}
              onClick={() => handleRadioChange(el.value)}
              checked={selectedValues.includes(el.value)}
            />
          ))}
          {platformsError.isError ? <p>{platformsError.message}</p> : ""}
        </div>
        <div className={styles.upload_container}>
          <label className={styles.upload_file}>
            <input type="file" name="image" onChange={inputHandler} />
            <span>
              {data.image === null ? "Select a file" : data.image.name}
            </span>
          </label>
          <QuestionMarkIcon
            className={styles.question_mark}
            onMouseEnter={() => setIsQuestionMarkVisible(true)}
            onMouseLeave={() => setIsQuestionMarkVisible(false)}
          />
        </div>
        {/* <Input type="file" name="image" onChange={inputHandler} /> */}
        {formatError && (
          <p>Please select a valid image file (png, jpg, jpeg, heic).</p>
        )}
        <Button
          disabled={
            nameError.isError ||
            descriptionError.isError ||
            platformsError.isError
          }
          onClick={createStreamerHandler}
        >
          Create Streamer
        </Button>
        <div
          className={`${styles.hint} ${
            isQuestionMarkVisible ? styles.visible : ""
          }`}
        >
          <span>
            Dont worry you dont have to select an image, if you dont we will
            apply one of our random ones :)
          </span>
        </div>
      </div>
    </>
  );
};

export default Form;
