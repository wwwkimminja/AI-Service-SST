import { useLocation } from 'react-router-dom';
import './Header.css';
import { useMemo } from 'react';

export default function Header() {
  const { pathname } = useLocation();

  const subHeading = useMemo(() => {
    const subHeading = {
      '/': 'Let AI Create a Stunning Portrait of Your Pet',
      '/start': (
        <>
          Let&apos;s start!
          <br />
          Please upload 8 to 20 pictures of dogs or cats
        </>
      ),
    };
    return subHeading[pathname];
  }, []);

  return (
    <div>
      <div>
        <h1 className="heading">RAYMONG</h1>
      </div>
      <div className="subHeading">{subHeading}</div>
    </div>
  );
}
