import React, { ReactNode } from "react";

type ComponentType = React.ComponentType<{ children: ReactNode }>;

interface ComposeProps {
  components?: ComponentType[];
  children: ReactNode;
}

const Compose = (props: ComposeProps) => {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight((acc: ReactNode, Comp: ComponentType) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};

export default Compose;
