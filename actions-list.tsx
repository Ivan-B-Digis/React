import React, { memo, useMemo, useRef } from "react";
import { clsx, curry, handleSetRef } from "utils";
import { useDidMount } from "hooks";
import { ActionsListContext } from "./actions-list.constants";
import { ActionsListStateType } from "./actions-list.types";
import styles from "./actions-list.module.css";
export type ActionsListProps = Omit<React.HTMLProps<HTMLDivElement>, "ref"> & {
  children: React.ReactNode;
  className?: string;
  forwardRef?: React.Ref<HTMLDivElement>;
  onOptionClick?: ActionsListStateType["onOptionClick"];
};

export const ActionsList: React.FC<ActionsListProps> = memo(
  ({ children, className, forwardRef, onOptionClick, ...rest }: ActionsListProps) => {
    const state = useMemo(() => {
      return {
        onOptionClick: (e: React.MouseEvent<HTMLDivElement>) => onOptionClick?.(e),
      };
    }, [onOptionClick]);
    const listRef = useRef<HTMLDivElement>(null);
    useDidMount(() => {
      function handleClickOutside(event: React.MouseEvent) {
        if (listRef?.current && !listRef?.current.contains(event.target)) {
          onOptionClick?.(event);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
    return (
      <ActionsListContext.Provider value={state}>
        <div
          {...rest}
          className={clsx(styles.actionsListContainer, className)}
          ref={curry(handleSetRef)([listRef, forwardRef])}
        >
          {children}
        </div>
      </ActionsListContext.Provider>
    );
  },
);
