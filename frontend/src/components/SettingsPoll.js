import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";

const SettingsPoll = ({
  handleCreatePoll,
  handleCreateDraftPoll,
  handleCreatePollButton,
  checked,
  setChecked,
  votingSecurityOption,
  setVotingSecurityOption,
  saveAsDraftButton,
}) => {
  const handleChangeVoteingSecurity = (event) => {
    setVotingSecurityOption(event.target.value);
  };

  const handleChange = (name) => (event) => {
    setChecked({ ...checked, [name]: event.target.checked });
  };

  return (
    <Box sx={{ py: 5 }}>
      <Card>
        <CardContent>
          <Box sx={{ pb: 2 }}>
            <Typography variant="h3">Settings</Typography>
          </Box>
          <Box
            sx={{ display: "grid", gridTemplateColumns: "1.5fr 0.1fr 1.4fr" }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">
                  Require participants' names
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      name="require_names"
                      checked={checked.require_names}
                      onChange={handleChange("require_names")}
                    />
                  }
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">Allow comments</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      name="allow_comments"
                      checked={checked.allow_comments}
                      onChange={handleChange("allow_comments")}
                    />
                  }
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">Hide share button</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      disabled
                      name="can_share"
                      checked={checked.can_share}
                      onChange={handleChange("can_share")}
                    />
                  }
                />
              </Box>
            </Box>
            <Box sx={{ px: 1 }}>
              <Divider orientation="vertical" />
            </Box>
            <Box sx={{ paddingLeft: 1, maxWidth: "100%" }}>
              <FormControl fullWidth>
                <InputLabel>
                  <Typography variant="subtitle2">Voting security</Typography>
                </InputLabel>
                <Select
                  value={votingSecurityOption}
                  size="small"
                  label="Voting security"
                  onChange={handleChangeVoteingSecurity}
                >
                  <MenuItem value="multiple">
                    <Typography variant="subtitle2">
                      multiple votes per person
                    </Typography>
                  </MenuItem>
                  <MenuItem value="ip">
                    <Typography variant="subtitle2">
                      One vote per IP address
                    </Typography>
                  </MenuItem>
                  <MenuItem value="code" disabled>
                    <Typography variant="subtitle2">
                      One vote per unique code
                    </Typography>
                  </MenuItem>
                </Select>
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: 1,
                  pt: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2">Use reCAPTCHA</Typography>
                  </Box>
                  <Box>
                    <Chip
                      label={
                        <Typography sx={{ fontSize: "0.5rem" }}>PRO</Typography>
                      }
                      color="primary"
                      size="small"
                    />
                  </Box>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      disabled
                      checked={checked.captcha}
                      name="captcha"
                      onChange={handleChange("captcha")}
                    />
                  }
                />
              </Box>
            </Box>
          </Box>
          <Divider variant="middle" sx={{ my: "1rem" }} />
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Button
              variant="contained"
              sx={{ padding: "0.5rem 2rem" }}
              onClick={handleCreatePoll}
            >
              {handleCreatePollButton}
            </Button>
            {saveAsDraftButton && (
              <Button
                onClick={handleCreateDraftPoll}
                variant="contained"
                sx={{ padding: "0.5rem 2rem" }}
              >
                Save as draft
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPoll;
