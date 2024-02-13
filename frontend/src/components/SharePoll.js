import React from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";

const SharePoll = ({ selectedPoll }) => {
  let url;
  if (selectedPoll.poll_type === "choices") {
    url = `https://pollpal.vercel.app/vote/options/${selectedPoll.id}`;
  } else {
    url = `https://pollpal.vercel.app/vote/dates/${selectedPoll.id}`;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard!");
    });
  };

  const shareOnSocialMedia = (platform) => {
    console.log(`Sharing on ${platform}...`);
  };

  return (
    <Box sx={{ py: 5 }}>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h3">Share</Typography>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={copyToClipboard}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              fullWidth
              size="small"
              value={url}
              variant="outlined"
            />
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button onClick={() => shareOnSocialMedia("WhatsApp")}>
                <WhatsAppIcon fontSize="small" color="primary" />
              </Button>
              <Button onClick={() => shareOnSocialMedia("Twitter")}>
                <TwitterIcon fontSize="small" color="primary" />
              </Button>
              <Button onClick={() => shareOnSocialMedia("Instagram")}>
                <InstagramIcon fontSize="small" color="primary" />
              </Button>
              <Button onClick={() => shareOnSocialMedia("Telegram")}>
                <TelegramIcon fontSize="small" color="primary" />
              </Button>
              <Button onClick={() => shareOnSocialMedia("Facebook")}>
                <FacebookIcon fontSize="small" color="primary" />
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SharePoll;
