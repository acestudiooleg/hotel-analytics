/* eslint-disable react/prop-types */
import React, { FC } from "react";
import Grid, { GridProps } from "@mui/material/Grid";
import MUIButton, { ButtonProps } from "@mui/material/Button";
import Typography, { TypographyProps } from "@mui/material/Typography";

export const Button: FC<ButtonProps> = ({ children, ...props }) => (
  <MUIButton variant="contained" {...props}>
    {children}
  </MUIButton>
);

export const H1: FC<TypographyProps> = ({ children, ...props }) => (
  <Typography variant="h1" {...props}>
    {children}
  </Typography>
);

export const H2: FC<TypographyProps> = ({ children, ...props }) => (
  <Typography variant="h2" {...props}>
    {children}
  </Typography>
);

export const H3: FC<TypographyProps> = ({ children, ...props }) => (
  <Typography variant="h3" {...props}>
    {children}
  </Typography>
);

export const H4: FC<TypographyProps> = ({ children, ...props }) => (
  <Typography variant="h4" {...props}>
    {children}
  </Typography>
);

export const H5: FC<TypographyProps> = ({ children, ...props }) => (
  <Typography variant="h5" {...props}>
    {children}
  </Typography>
);

export const H6: FC<TypographyProps> = ({ children, ...props }) => (
  <Typography variant="h6" {...props}>
    {children}
  </Typography>
);
export const P: FC<TypographyProps> = ({ children, ...props }) => (
  <Typography {...props}>{children}</Typography>
);

export const Container: FC<GridProps> = ({ children, ...props }) => (
  <Grid container {...props}>
    {children}
  </Grid>
);

export const Item: FC<GridProps> = ({ children, ...props }) => (
  <Grid item {...props}>
    {children}
  </Grid>
);

export const D12: FC<GridProps> = ({ children, ...props }) => (
  <Grid item xs={12} {...props}>
    {children}
  </Grid>
);
export const D11: FC<GridProps> = ({ children, ...props }) => (
  <Grid item xs={11} {...props}>
    {children}
  </Grid>
);
export const D10: FC<GridProps> = ({ children, ...props }) => (
  <Grid item xs={10} {...props}>
    {children}
  </Grid>
);
export const D9: FC<GridProps> = ({ children, ...props }) => (
  <Grid item xs={9} {...props}>
    {children}
  </Grid>
);
export const D8: FC<GridProps> = ({ children, ...props }) => (
  <Grid item xs={8} {...props}>
    {children}
  </Grid>
);
export const D7: FC<GridProps> = ({ children, ...props }) => (
  <Grid item xs={7} {...props}>
    {children}
  </Grid>
);
export const D6: FC<GridProps> = ({ children, ...props }) => (
  <Grid item xs={6} {...props}>
    {children}
  </Grid>
);
export const D5: FC<GridProps> = ({ children, ...props }) => (
  <Grid item xs={5} {...props}>
    {children}
  </Grid>
);

export const D4: FC<GridProps> = ({ children, ...props }) => (
  <Grid item xs={4} {...props}>
    {children}
  </Grid>
);
export const D3: FC<GridProps> = ({ children, ...props }) => (
  <Grid item xs={3} {...props}>
    {children}
  </Grid>
);
export const D2: FC<GridProps> = ({ children, ...props }) => (
  <Grid item xs={2} {...props}>
    {children}
  </Grid>
);
export const D1: FC<GridProps> = ({ children, ...props }) => (
  <Grid item xs={1} {...props}>
    {children}
  </Grid>
);
