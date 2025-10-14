import React, { JSX } from 'react';

export type TUseStylesProps = JSX.Element;

export const useStyles = (): TUseStylesProps => (
  <style>
    {`
      .ToggleMode {
        align-items: center;
        cursor: pointer;
        display: flex;
        height: 28px;
        justify-content: center;
        margin-top: 6px;
        padding: 8px 7px;
        width: 28px;
      }

      .ToggleMode:hover {
        background-color: rgba(2,156,253,0.12);
        border-radius: 4px;
      }

      .ToggleMode:hover svg path {
        fill: #029CFD;
      }
    `}
  </style>
);
