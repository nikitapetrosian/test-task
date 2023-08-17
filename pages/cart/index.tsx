import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import { StateContext } from "../../contexts/stateContext";
import styles from "../../styles/Cart.module.scss";

const Cart: NextPage = () => {
  const { state, removeFromState } = useContext(StateContext);
  const router = useRouter();
  const [launch, setLaunch] = useState(false);
  const launchHandler = () => {
    setLaunch(true);
    setTimeout(removeFromState, 2500);
    setTimeout(() => {
      router.push('/');
    }, 4000);
  };

  const list = state.filter((item: any) => item.inCart);
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      {list.length === 0 && launch &&
        <div className={styles.empty}>
          <p>Мы успешно выполнили свою работу! Возвращаемся на главную...</p>
          <div className={styles.successbg} />
        </div>
      }
      {list.length === 0 && !launch &&
        <div className={styles.empty}>
          <p>Вы не указали ни одного астероида. <Link href='/'>Сделайте это</Link>, и мы им покажем</p>
          <div className={styles.emptybg} />
        </div>}
      {list.length !== 0 &&
        <>
          <h2>Список на уничтожение</h2>
          <div className={styles.dashboard}>
            <div className={launch ? styles.list_disabled : styles.list}>
              <ul>
                {list.map((item: any) => (
                  <Link key={item.id} href={`/asteroid/${item.id}`}><li className={item.is_potentially_hazardous_asteroid ? styles.danger : styles.safe}><a>{item.name}</a></li></Link>
                ))}
              </ul>
              <button className={styles.btn} onClick={launchHandler}>Отправить заказ</button>
            </div>
            <div className={styles.description}>Мы готовы отправиться на выбранные астероиды.<br />Бригада будет доставлена на астероид в нужный момент и выполнит свою нелёгкую работу.</div>
            <div className={launch ? styles.rocketship_active : styles.rocketship} />
          </div>
        </>
      }
    </>
  );
};

export default Cart;
