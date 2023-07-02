import React, { useContext, useEffect } from "react";
import FormControl from "@mui/joy/FormControl";
import Autocomplete, { createFilterOptions } from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Add from "@mui/icons-material/Add";
import { BASE_URL } from "../../config/config";
import axios from "axios";
import AppContext from "../../context/AppContext";
import { IStreamer } from "../../types/types";
import styles from "./Topbar.module.scss";
import { useNavigate } from "react-router-dom";
const inputStyle = {
  outline: "none",
  width: "300px",
  border: "none",
};

const filter = createFilterOptions<any>();
const Topbar = () => {
  const ctxApp = useContext(AppContext);
  const navigation = useNavigate();
  const [value, setValue] = React.useState<IStreamer | null>(null);
  const [data, setData] = React.useState([]);
  const getArtists = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/streamers-names`);
      setData(response.data.streamers);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getArtists();
  }, [ctxApp.forceReload]);
  return (
    <div className={styles.container}>
      <FormControl id="auto complete input">
        <Autocomplete
          sx={inputStyle}
          placeholder="Search by name"
          size="sm"
          value={value}
          onChange={(_event, newValue) => {
            if (typeof newValue === "string") {
              setValue(null);
            } else if (newValue && newValue.inputValue) {
              const newStreamer: IStreamer = {
                _id: "",
                name: newValue.inputValue,
                description: "",
                platforms: [],
                votes: { up: 0, down: 0 },
                popularity: 0,
                image: null,
              };
              setValue(newStreamer);
            } else {
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            const isExisting = options.some(
              (option) => inputValue === option.name
            );
            if (inputValue !== "" && !isExisting) {
              filtered.push({
                inputValue,
                name: `Add "${inputValue}"`,
              });
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          freeSolo
          options={data}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.name;
          }}
          renderOption={(props, option) => (
            <AutocompleteOption
              {...props}
              onClick={() => {
                if (option.name?.startsWith('Add "')) {
                  ctxApp.setOpenFormContext(true);
                } else {
                  navigation(`/app/streamer/${option.name}`);
                }
              }}
            >
              {option.name?.startsWith('Add "') && (
                <ListItemDecorator>
                  <Add onClick={() => ctxApp.setOpenFormContext(true)} />
                </ListItemDecorator>
              )}
              {option.name}
            </AutocompleteOption>
          )}
        />
      </FormControl>
    </div>
  );
};

export default Topbar;
