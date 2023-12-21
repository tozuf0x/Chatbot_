import { Spin } from 'antd';
import clsx from 'clsx';
import { ReactElement } from 'react';
import styles from './styles.module.scss';

type LoaderProps = {
  spinClassName?: string;
  text?: string;
  indicator?: ReactElement;
  fullPage?: boolean;
};

export function Loader({
  spinClassName,
  text,
  indicator,
  fullPage,
}: LoaderProps) {
  return (
    <div
      className={clsx(styles.wrapper, { [styles['full-page']]: fullPage })}
      data-testid="loader"
    >
      <Spin className={spinClassName} indicator={indicator} />

      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}
