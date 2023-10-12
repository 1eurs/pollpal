import { Box, Button, Container, Grid, Typography } from "@mui/material";
import image1 from "../../images/1.png";
import image2 from "../../images/2.png";
import PollIcon from "@mui/icons-material/Poll";
const FeaturesSection = () => {
  return (
    <Container maxWidth sx={{ py: "10rem", backgroundColor: "#1f2937" }}>
      <Container>
        <Grid container rowSpacing={4} columnSpacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}
          >
            <Box sx={{ pt: 10 }}>
              <div>
                <PollIcon fontSize="large" />
              </div>
              <div>
                <Typography variant="h1">
                  Use our advanced poll maker
                </Typography>
              </div>
              <div>
                <Typography variant="subtitle1">
                  A straw poll is a voting that can be used to help people to
                  easily determine the opinion of a group or the public on some
                  issue. Straw polls are very useful when only the majority
                  opinion is important and not the opinion of each individual
                  participant.
                </Typography>
              </div>
            </Box>
            <Box sx={{ display: "flex", gap: "0.3rem" }}>
              <div>
                <Button variant="contained">Create a poll</Button>
              </div>
              <div>
                <Button variant="contained">View example</Button>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box
              component="img"
              sx={{
                height: 400,
              }}
              alt="The house from the offer."
              src={image1}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box
              component="img"
              sx={{
                height: 500,
              }}
              alt="The house from the offer."
              src={image2}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}
          >
            <Box sx={{ pt: 10 }}>
              <div>
                <PollIcon fontSize="large" />
              </div>
              <div>
                <Typography variant="h1">
                  Use our advanced poll maker
                </Typography>
              </div>
              <div>
                <Typography variant="subtitle1">
                  A straw poll is a voting that can be used to help people to
                  easily determine the opinion of a group or the public on some
                  issue. Straw polls are very useful when only the majority
                  opinion is important and not the opinion of each individual
                  participant.
                </Typography>
              </div>
            </Box>
            <Box sx={{ display: "flex", gap: "0.3rem" }}>
              <div>
                <Button variant="contained">Create a poll</Button>
              </div>
              <div>
                <Button variant="contained">View example</Button>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default FeaturesSection;
