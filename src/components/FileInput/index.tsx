import { useRef, useState } from "react";

import * as s from "./styles";

import { Button } from "@components/Button";

interface Props {
  onChange: (arg0: FileList) => void;
}

export function FileInput({ onChange }: Props) {
  const [fileList, setFileList] = useState<File[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <s.FileImportContainer>
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        multiple
        onChange={(e) => {
          const files = e.target.files;

          if (files) {
            onChange(files);

            setFileList(Array.from(files));
          }
        }}
        style={{
          display: "none",
        }}
      />
      <s.MultipleLabelContainer>
        {fileList.length === 0 ? (
          <s.FileNameLabel>Nenhum arquivo selecionado</s.FileNameLabel>
        ) : (
          fileList.map((file) => {
            return (
              <s.FileNameLabel key={file.name}>{file.name}</s.FileNameLabel>
            );
          })
        )}
      </s.MultipleLabelContainer>

      <Button variant="primary" onClick={() => inputRef.current?.click()}>
        Importar arquivos
      </Button>
    </s.FileImportContainer>
  );
}
