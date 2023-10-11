import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import PageTitle from "./PageTitle";
const VotingType = [
  {
    value: "Multiple choice",
    label: "Multiple choice",
  },
  {
    value: "Meeting Poll",
    label: "Meeting Poll",
  },
  {
    value: "Ranking Poll",
    label: "Ranking Poll",
  },
];

const PollForm = () => {
  const [options, setOptions] = useState(["Options 1", "Options 2"]);

  const addOption = () => {
    const newOptions = [...options, `Options ${options.length + 1}`];
    setOptions(newOptions);
  };
  const deleteOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };
  return (
    <Container maxWidth="sm">
      <PageTitle
        title="Create a Poll"
        description="Complete the below fields to create your poll."
        textAlign="center"
        variant="h1"
        sx={{ marginBlockEnd: "2rem" }}
      />

      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-select"
              select
              label="Voting types"
              defaultValue="Multiple choice"
            >
              {VotingType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {options.map((option, index) => (
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
                  label={option}
                  variant="outlined"
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

          <Divider variant="middle" sx={{ my: "1rem" }} />

          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Button variant="contained" sx={{ padding: "0.5rem 2rem" }}>
              Create poll
            </Button>
            <Button variant="contained" sx={{ padding: "0.5rem 2rem" }}>
              Save as draft
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PollForm;
