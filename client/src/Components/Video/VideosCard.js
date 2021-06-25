import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Data from "./Datas";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    marginTop: 50,
  },
});

const Cards = (card) => {
  const classes = useStyles();
  const tubmnailUrl = `https://img.youtube.com/vi/${card.VideoId}/maxresdefault.jpg`;

  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Card className={classes.root} key={card.VideoId}>
        <CardActionArea>
          <Link to={`/video/:${card.VideoId}`}>
            <CardMedia
              component="img"
              height="200"
              width="400"
              image={tubmnailUrl}
            />
          </Link>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {card.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default function ImgMediaCard() {
  return (
    <Container fixed>
      <Grid container justify="center" alignItems="center" spacing={5}>
        {Data.map(Cards)}
      </Grid>
    </Container>
  );
}
