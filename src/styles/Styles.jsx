import styled, { css } from "styled-components";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

const InputCadastro = styled(TextField)`
  width: 100%;
  height: 30%;
  border-radius: 100;
  align-items: "center";
`;

const InputLogin = styled(TextField)`
  width: 100%;
  height: 30%;
  margin: 10px auto;
  border-radius: 30;
  align-items: "center";
  color:  "#000";     
  -webkit-text-fill-color: white;  
  & .MuiOutlinedInput-root {
    color:#000;
    &.Mui-focused fieldset {
      border-color: #cfe9ff;      
    }
  }
`;

const ButtonCadastro = styled(Button)`
  margin: 10px auto;
  width: 325px;
  border-radius: 100px;
  background-color: #062e61;
  color: white;
  
`;

const InputCampo = styled(TextField)`
  width: 300px;
  margin: 5px auto;
  border-radius: 100;
  align-items: "center";
`;

const InputDevol = styled(TextField)`
  width: 420px;
  margin: 5px auto;
  border-radius: 100;
  align-items: "center";
`;

const ButtonSubmeter = styled(Button)`
  margin: 10px auto;
  width: 325px;
  border-radius: 100px;
  background-color: #062e61;
  color: white;
  
`;

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: "dropzone"
})`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: height 0.2s ease;
  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};
`;

const messageColors = {
  default: "#999",
  error: "#e57878",
  success: "#78e5d5"
};

export const UploadMessage = styled.p`
  display: flex;
  color: ${props => messageColors[props.type || "default"]};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

export {
  InputCadastro,
  InputLogin,
  ButtonCadastro,
  InputCampo,
  ButtonSubmeter,
  InputDevol
};
