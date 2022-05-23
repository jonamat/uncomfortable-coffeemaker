import { FC } from 'react';

interface Props {
  onClick?: () => void;
}

const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={-1}
      style={{ width: 'fit-content' }}
    >
      <div>┍╍╍╍╍╍╍╍╍╍╍┑</div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>╏</div>
        <div>{children}</div>
        <div>╏</div>
      </div>
      <div>┗╍╍╍╍╍╍╍╍╍╍┛</div>
    </div>
  );
};

export default Button;
