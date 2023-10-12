import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

import { Box, Button, TextField } from "@mui/material";

const OptionsForm = ({ optionsFormData, setOptionsFormData }) => {
  const addOption = () => {
    setOptionsFormData({
      ...optionsFormData,
      options: [...optionsFormData.options, ""],
    });
  };

  const deleteOption = (index) => {
    if (optionsFormData.options.length > 1) {
      const newOptions = optionsFormData.options.filter((_, i) => i !== index);
      setOptionsFormData({ ...optionsFormData, options: newOptions });
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {optionsFormData.options.map((option, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <TextField
              id={`outlined-basic-${index}`}
              label={`Option ${index + 1}`}
              value={option}
              variant="outlined"
              onChange={(e) => {
                const newOptions = [...optionsFormData.options];
                newOptions[index] = e.target.value;
                setOptionsFormData({ ...optionsFormData, options: newOptions });
              }}
              fullWidth
            />
            <Button onClick={() => deleteOption(index)}>
              <ClearIcon />
            </Button>
          </Box>
        ))}
      </Box>
      <Box>
        <Button
          variant="contained"
          size="medium"
          sx={{ marginBlockStart: "1rem" }}
          startIcon={<AddIcon />}
          onClick={addOption}
        >
          Add option
        </Button>
      </Box>
    </>
  );
};

export default OptionsForm;
