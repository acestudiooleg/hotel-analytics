import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles, withStyles } from "@mui/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Delete from "@mui/icons-material/Delete";
import Save from "@mui/icons-material/Save";
import Fab from "@mui/material/Fab";
import { Input } from "../containers/Input";

import { Container, D12, D6 } from "./MyHTML";
import { Provider } from "../slices/providers";

const useStyles = makeStyles((theme: any) => ({
  input: {
    width: "100%",
  },
  removeButton: {
    backgroundColor: theme.palette.red,
  },
}));

const RemoveButton = withStyles((theme: any) => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))(Fab);

type ProviderSettingsFormProps = {
  provider: Provider;
  onChange: (state: Provider) => void;
  onRemove: () => void;
  onSave: () => void;
};

export const ProviderSettingsForm: FC<ProviderSettingsFormProps> = ({
  provider,
  onChange,
  onRemove,
  onSave,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleInputChange =
    (name: keyof Provider, type = "number") =>
    ({ target: { value } }: any) => {
      const newState = {
        ...provider,
        [name]: type === "number" ? Number(value) : value,
      };
      onChange(newState);
    };

  return (
    <Container>
      {provider.isNew && (
        <D12>
          <Input
            label={t("provider-name")}
            defaultValue={provider.newName}
            className={classes.input}
            onChange={handleInputChange("newName", "string")}
            margin="normal"
            variant="outlined"
          />
        </D12>
      )}
      <D12>
        <Input
          label={t("provider-fee")}
          defaultValue={provider.fee}
          className={classes.input}
          type="number"
          onChange={handleInputChange("fee")}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
        />
      </D12>

      {!provider.isNew && (
        <D12>
          <Container justifyContent="flex-end">
            <RemoveButton onClick={onRemove}>
              <Delete />
            </RemoveButton>
          </Container>
        </D12>
      )}
      {provider.isNew && (
        <D12>
          <Container justifyContent="flex-end">
            <D6>
              <RemoveButton onClick={onRemove}>
                <Delete />
              </RemoveButton>
            </D6>
            <D6>
              <Container justifyContent="flex-end">
                <Fab color="secondary" onClick={onSave}>
                  <Save />
                </Fab>
              </Container>
            </D6>
          </Container>
        </D12>
      )}
    </Container>
  );
};
