import { useState, useRef, useEffect, useCallback } from 'react';
import './styles.css';

export interface IUsers {
  name: string;
  url: string;
  logo: string;
  unlimitedWidth: boolean;
}

interface ITrusted {
  users: IUsers[];
  defaultSize: number;
  maxCol: number;
}
export default ({ users = [], defaultSize = 160, maxCol = 5 }: ITrusted) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const calculteWidth = useCallback(() => {
    const wrapperWidth = ref.current!.offsetWidth;
    const cols = Math.floor(wrapperWidth / defaultSize);
    if (cols <= maxCol) {
      const w = (wrapperWidth + (cols - 1)) / cols;
      setWidth(w);
    } else {
      const w = (wrapperWidth + maxCol - 1) / maxCol;
      setWidth(w);
    }
  }, []);

  useEffect(() => {
    calculteWidth();
    window.addEventListener('resize', calculteWidth);
    return () => window.removeEventListener('resize', calculteWidth);
  }, []);

  return (
    <div className="trusted-wrapper" ref={ref}>
      {users.map(user => (
        <div key={user.name} className="trusted-card" style={{ width }}>
          <a target="_blank" href={user.url} className="trusted-content">
            <img
              src={user.logo}
              {...(user.unlimitedWidth ? {} : { width: 42 })}
            />
            <strong>{user.name}</strong>
          </a>
        </div>
      ))}
    </div>
  );
};
