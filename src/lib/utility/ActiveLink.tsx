import React, { Children } from "react";
import Link, { LinkProps } from "next/link";
import withRouter, { WithRouterProps } from "next/dist/client/with-router";

export type Props = WithRouterProps &
  LinkProps & {
    activeClassName: string;
    children: React.ReactNode;
  };

const ActiveLink: React.FC<Props> = ({ router, children, ...props }) => {
  const child = Children.only<any>(children);

  let className = child.props.className || null;
  if (router.pathname === props.href && props.activeClassName) {
    className = `${className !== null ? className : ""} ${
      props.activeClassName
    }`.trim();
  }

  delete props.activeClassName;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);
