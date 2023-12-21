import clsx from 'clsx';
import styles from './styles.module.scss';

interface LogoProps extends React.InputHTMLAttributes<HTMLImageElement> {
  className?: string;
  path?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, path, alt, ...args }: LogoProps) {
  return (
    <img
      className={clsx(styles.logo, className)}
      src={path || 'img/logo.svg'}
      alt={alt || 'Logo.'}
      {...args}
    />
  );
}
