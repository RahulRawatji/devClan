import { createContext } from "react";

export const ContextApi = createContext();

import React from 'react'

const Context = (props) => {
  return (
    <ContextApi.Provider>
        {props.childern}
    </ContextApi.Provider>

  )
}

export default Context