import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";
import BottomNavigation from "@material-ui/core/BottomNavigation";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function SvgIconsSize() {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.root}>
      <span>With </span>
      <FavoriteIcon style={{ color: red[500] }} />
    </BottomNavigation>
  );
}
