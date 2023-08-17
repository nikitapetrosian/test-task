import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, [router]);

  return (
    <>
      <Head>
        <title>404 страница не найдена</title>
      </Head>
      <div>
        <h1>404</h1>
        <h2>Страница не найдена, возможно вы ошиблись при воде адреса? Переходим на главную...</h2> 
      </div>
    </>
  )
};

export default ErrorPage;