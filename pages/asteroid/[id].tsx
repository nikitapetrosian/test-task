import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useContext } from "react";
import { StateContext } from "../../contexts/stateContext";
import Asteroid from '../../components/Asteroid';
import ErrorPage from '../404';
import { AsteroidType } from "../../misc/types";

type AsteroidInfoProps = {
    asteroidId: string,
  }

export const getServerSideProps:GetServerSideProps = async (context) => {
    return {
        props: {asteroidId: context.params?.id},
    }
};

const AsteroidInfo: NextPage<AsteroidInfoProps> = ({ asteroidId }) => {
  const { state } = useContext(StateContext);
  const item = state.find((item: AsteroidType) => item.id === asteroidId);
  if (!item) {
    return <ErrorPage />;
  }
  return (
    <>
      <Head>
        <title>Asteroid Info</title>
      </Head>
      <h2>Информмация об астеройде {item.name}</h2>
      <Asteroid {...item}/>
    </>
  );
};

export default AsteroidInfo;