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
const SharePoll = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Card sx={{ height: 150 }}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography variant="h3">Share</Typography>
            </Box>
            <Box>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" color="primary">
                        <ContentCopyIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
                fullWidth
                size="small"
                defaultValue="http://localhost:3000/"
              ></TextField>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button>
                <WhatsAppIcon fontSize="small" color="primary" />
              </Button>
              <Button>
                <TwitterIcon fontSize="small" color="primary" />
              </Button>
              <Button>
                <InstagramIcon fontSize="small" color="primary" />
              </Button>
              <Button>
                <TelegramIcon fontSize="small" color="primary" />
              </Button>
              <Button>
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
