import React, { Children } from "react";
import Link, { LinkProps } from "next/link";
import withRouter, { WithRouterProps } from "next/dist/client/with-router";

export type Props = WithRouterProps &
  LinkProps & {
    activeClassName: string;
    active?: boolean; // props 로 active 상태를 받아옴
    children: React.ReactNode;
  };

const ActiveLink: React.FC<Props> = ({ router, children, ...props }) => {
  const child = Children.only<any>(children);

  // query 에서 active 상태를 체크 할 것이므로...
  let className = child.props.className || null;
  if (props.active && props.activeClassName) {
    className = `${className !== null ? className : ""} ${
      props.activeClassName
    }`.trim();
  }
  delete props.activeClassName;
  delete props.active;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);
