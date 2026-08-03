import { type ReactNode } from "react";

import * as s from "./styles";
interface Props {
  title?: string;
  children: ReactNode;
}

export function PageContainer({ title, children }: Props) {
  return (
    <s.PageContainer>
      {title && <s.PageTitle>{title}</s.PageTitle>}
      {children}
    </s.PageContainer>
  );
}
