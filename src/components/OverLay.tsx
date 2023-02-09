import React from 'react'


const styles = {
    background: "black",
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    zIndex: "10",
    opacity: "0.5",
} as React.HTMLAttributes<HTMLDivElement>


interface OverLayProps {
    [key: string]: any
}

export const OverLay:React.FC<OverLayProps> = (props) => {
  return (
    <div style = {styles} {...props}>OverLay</div>
  )
}
