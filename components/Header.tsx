import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CSS from "csstype";

type BGStyle = {
  css: CSS.Properties;
  url: string;
}

const navData = [
  { id: 0, name: 'Астеройды', path: '/' },
  { id: 1, name: 'Заказ', path: '/cart' },
]

const Header: FC = () => {
  const [bgstyle, setBgstyle] = useState<BGStyle>({ css: { display: "flex" }, url: '' });
  const { pathname } = useRouter();
  const fetchImg = async () => {
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
    );
    const data = await response.json();

    switch (data.media_type) {
      case 'video': {
        setBgstyle({ css: { display: "flex" }, url: data.url });
        return;
      }
      case 'image': {
        const backgroundStyle: CSS.Properties = {
          background: `url(${data.hdurl}) no-repeat`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
        setBgstyle({ css: backgroundStyle, url: '' });
        return;
      }
      default: {
        const backgroundStyle: CSS.Properties = {
          backgroundColor: 'rgb(125, 152, 240)',
        };
        setBgstyle({ css: backgroundStyle, url: '' });
        return;
      }
    }
  };

  useEffect(() => {
    fetchImg();
  }, []);

  const videoFrame = <iframe src={`${bgstyle.url}?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=${bgstyle.url.slice(30, 41)}`} frameBorder="0" allowFullScreen></iframe>;

  return (
    <header style={bgstyle.css}>
      {bgstyle.url !== '' ? videoFrame : null}
      <div>
        <Link href='/'><h2 className="logo">ARMAGGEDON</h2></Link>
        <p>Сервис уничтожения астероидов, опасно подлетающих к Земле.</p>
      </div>
      <nav>
        {navData.map((item) => <Link
          key={item.id}
          href={item.path}>
          <a className={item.path === pathname ? "active" : ''}>{item.name}</a>
        </Link>)}
      </nav>
    </header>
  );
};

export default Header;
