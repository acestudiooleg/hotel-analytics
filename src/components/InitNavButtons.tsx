import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { Container, D6, Button } from "./MyHTML";

const useStyles = makeStyles((theme: any) => ({
  root: {
    width: "90%",
  },
  input: {
    width: "100%",
  },
  container: {
    padding: 10,
  },
  buttons: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    position: "absolute",
    bottom: 0,
  },
}));

type InitNavButtonsProps = {
  onBack: () => void;
  onNext: () => void;
  activeStep: number;
  stepsLen: number;
};

export const InitNavButtons: FC<InitNavButtonsProps> = ({
  onBack,
  onNext,
  activeStep,
  stepsLen,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Container className={classes.buttons}>
      <D6 className={classes.container}>
        <Button fullWidth disabled={activeStep === 0} onClick={onBack}>
          {t("back")}
        </Button>
      </D6>
      <D6 className={classes.container}>
        <Button fullWidth color="primary" onClick={onNext}>
          {activeStep === stepsLen - 1 ? t("save") : t("next")}
        </Button>
      </D6>
    </Container>
  );
};
