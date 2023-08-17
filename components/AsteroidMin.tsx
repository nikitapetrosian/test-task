import { FC, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/AsteroidMin.module.scss'
import { dateParser } from '../misc/utils';
import { AsteroidType, DistanceSort } from '../misc/types';
import { StateContext } from '../contexts/stateContext';

type AsteroidMinProps = {
    item: AsteroidType,
    sort: DistanceSort;
}

const AsteroidMin: FC<AsteroidMinProps> = ({ item, sort }) => {
    const { cartHandler } = useContext(StateContext);
    return (
        <div className={styles.asteroid}>
            <p>{dateParser(item.close_approach_data[0].close_approach_date)}</p>
            <div className={styles.card}>
                <div>
                    <Image src={item.is_potentially_hazardous_asteroid ? '/danger.png' : '/safe.png'} width="93px" height="95px" alt="safe" />
                </div>
                <div className={styles.signature}>
                    <Link href={`/asteroid/${item.id}`}>{`Астеройд № ${item.name}`}</Link>
                    <p>Диаметр {Math.round(item.estimated_diameter.meters.estimated_diameter_min)} - {Math.round(item.estimated_diameter.meters.estimated_diameter_min)} м</p>
                    <p>Длина {parseInt(item.close_approach_data[0].miss_distance[sort])} {sort === 'lunar' ? 'расст. до Луны' : 'км'}</p>
                    <p>{item.is_potentially_hazardous_asteroid ? 'Стоит бояться' : 'Не стоит бояться'}</p>
                </div>
            </div>
            <button className={item.inCart ? styles.active : ''} onClick={() => cartHandler(item.id)}>{item.inCart ? 'не уничтожать' : 'уничтожить'}</button>
        </div>
    )
};

export default AsteroidMin;