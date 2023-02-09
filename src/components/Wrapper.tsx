import React from "react";

interface Props {
  children: React.ReactNode
}

export const Wrapper:React.FC<Props> = ({ children }) => {

  return (
    <div className="wrapper">
      { children }
    </div>

  )
}
