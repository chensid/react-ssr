import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
function withStyle(Comp, styles) {
  function NewComp(props) {
    if (props.staticContext) {
      props.staticContext.css.push(styles._getCss());
    }
    return <Comp {...props}></Comp>;
  }
  hoistNonReactStatics(NewComp, Comp);
  return NewComp;
}

export default withStyle;
