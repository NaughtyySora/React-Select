import { useState, useRef, ReactNode, MouseEvent, HTMLAttributes } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import "./Select.scss";

export interface iSelect<T> extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  options: T[];
  ListItem: (option: T) => JSX.Element;
  onSelect: (option: T) => void;
  listItemKey: keyof T;
  value?: string;
  className?: string;
  children?: ReactNode;
  tabIndex?: number;
  listChild?: ReactNode;
};

export function Select<T>({
  ListItem,
  onSelect,
  listItemKey,
  options,
  children,
  tabIndex,
  listChild,
  value = "",
  className = "",
  ...props
}: iSelect<T>) {
  const [showList, setShowList] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const selected = useRef<null | T>(null);

  useOnClickOutside(ref, setShowList.bind(null, false));

  const onSelectClick = (e: MouseEvent<HTMLDivElement>) => {
    setShowList(pv => !pv);
    props?.onClick?.(e);
  };

  const onOptionClick = (option: T) => {
    onSelect(option);
    setShowList(false);
    selected.current = option;
  };

  return (
    <div
      className={`Select ${className}`}
      ref={ref}
      tabIndex={tabIndex}
    >
      <div
        {...props}
        onClick={onSelectClick}
        className="Select-value"
      >
        {SelectTitle(showList, value, children)}
      </div>

      {showList && (
        <div className="Select-list scroll">
          {listChild}

          {options?.map(option => (
            <div
              tabIndex={0}
              className={`Select-item ${option === selected.current ? "active" : ""}`}
              onClick={() => onOptionClick(option)}
              key={String(option[listItemKey])}
              autoFocus={option === selected.current}
            >
              {ListItem(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function SelectTitle(showOptions: boolean, value: string, children?: ReactNode) {
  if (children) return children;

  return (
    <div className={`Select-title ${showOptions ? "active" : ""}`}>
      <span className="text">{value}</span>
    </div>
  );
}