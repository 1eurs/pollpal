import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import PollIcon from "@mui/icons-material/Poll";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";

const FeaturesSection = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth
      sx={{
        py: theme.spacing(10),
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Container>
        <Grid container rowSpacing={4} columnSpacing={3}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(2),
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(2),
              }}
            >
              <PollIcon fontSize="large" color="primary" />
              <Typography variant="h5" color="text.primary">
                Advanced Poll Maker
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary">
              Create polls effortlessly with our advanced tools. Engage your
              audience and gain insights quickly and efficiently.
            </Typography>
            <Box sx={{ display: "flex", gap: theme.spacing(1) }}>
              <Link to="/create/poll">
                <Button variant="contained" color="primary">
                  Create a Poll
                </Button>
              </Link>
              <Link to="">
                <Button variant="contained" color="secondary" disabled>
                  View Example
                </Button>
              </Link>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(2),
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(2),
              }}
            >
              <BarChartIcon fontSize="large" color="primary" />
              <Typography variant="h5" color="text.primary">
                Real-Time Analytics
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary">
              Get real-time feedback and analytics on your polls. Understand
              your audience better with instant data visualization.
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(2),
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(2),
              }}
            >
              <GroupIcon fontSize="large" color="primary" />
              <Typography variant="h5" color="text.primary">
                Community Engagement
              </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary">
              Foster a sense of community and interaction. Engage with your
              audience through interactive and collaborative polls.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default FeaturesSection;
