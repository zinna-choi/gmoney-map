import React from "react";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";

const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "1px solid #e2e2e1",
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: "rgba(154, 198, 236, 0.2);",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:hover": {
        backgroundColor: "#fff",
      },
      "&$focused": {
        backgroundColor: "#fff",
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
    focused: {},
  })
);

function RedditTextField(props: TextFieldProps) {
  const classes = useStylesReddit();

  return (
    <TextField
      InputProps={
        { classes, disableUnderline: true } as Partial<OutlinedInputProps>
      }
      {...props}
    />
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: "20px 0px 0px",
    },
  })
);

export default function SearchBox() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate>
      <RedditTextField
        label="GMONEYSTORE"
        className={classes.margin}
        defaultValue="상호명을 입력하세요."
        variant="filled"
        id="reddit-input"
        fullWidth
      />
    </form>
  );
}
