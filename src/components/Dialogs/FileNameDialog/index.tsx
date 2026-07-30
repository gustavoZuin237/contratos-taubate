import { useRef, useState, forwardRef, useImperativeHandle } from "react";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import toast from "react-hot-toast";

import * as s from "./styles";

export interface FileNameDialogHandle {
  showModal: () => void;
  close: () => void;
}

interface Props {
  onConfirm: (fileName: string) => void;
  onCancel: () => void;
}

export const FileNameDialog = forwardRef<FileNameDialogHandle, Props>(
  ({ onConfirm, onCancel }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [fileName, setFileName] = useState("");

    useImperativeHandle(ref, () => ({
      showModal: () => {
        setFileName("");
        dialogRef.current?.showModal();
      },
      close: () => dialogRef.current?.close(),
    }));

    function handleConfirm() {
      if (!fileName.trim()) {
        toast.error("Insira um nome para o arquivo");
        return;
      }
      onConfirm(fileName);
      dialogRef.current?.close();
    }

    function handleCancel() {
      onCancel();

      dialogRef.current?.close();
    }

    return (
      <dialog
        ref={dialogRef}
        style={{
          width: "100%",
          height: "100%",
          padding: "10rem 0px 10rem 2.5rem",
          background: "transparent",
          border: 0,
        }}
      >
        <s.DialogContent>
          <h2>Insira um nome para o arquivo</h2>
          <Input
            value={fileName}
            placeholder="Nome do arquivo"
            type="text"
            onChange={(e) => {
              setFileName(e.target.value);
            }}
          />
          <s.ButtonContainer>
            <Button variant="primary" onClick={handleConfirm}>
              Confirmar
            </Button>

            <Button variant="danger" onClick={handleCancel}>
              Cancelar
            </Button>
          </s.ButtonContainer>
        </s.DialogContent>
      </dialog>
    );
  }
);
