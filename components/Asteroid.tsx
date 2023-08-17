import { FC, useContext } from 'react';
import styles from '../styles/Asteroid.module.scss'
import { dateParser } from '../misc/utils';
import { AsteroidType, Approach } from '../misc/types';
import { StateContext } from '../contexts/stateContext';

type ApproachElementProps = {
    item: Approach;
}

const Asteroid:FC<AsteroidType> = ({ id, name, estimated_diameter, close_approach_data, is_potentially_hazardous_asteroid, inCart }) => {
    const { cartHandler } = useContext(StateContext);
    const ApproachElement = ({ item }: ApproachElementProps) => (
        <>
        <h4>{dateParser(item.close_approach_date)}</h4>
        <table className={styles.info}>
            <tbody>
            <tr>
                <td>Cкорость относительно Земли</td>
                <td>{parseInt(item.relative_velocity.kilometers_per_hour)} км/ч</td>
            </tr>
            <tr>
                <td>Время максимального сближения с Землей</td>
                <td>{item.close_approach_date_full.slice(12, 17)}</td>
            </tr>
            <tr>
                <td>Расстояние до Земли (км./расст. до Луны)</td>
                <td>{parseInt(item.miss_distance.kilometers)} км. / {parseInt(item.miss_distance.lunar)} </td>
            </tr>
            <tr>
                <td>Орбита облёта</td>
                <td>{item.orbiting_body}</td>
            </tr>
            </tbody>
        </table>
        </>
    );

    return (
        <div className={styles.page}>
        <div className={styles.bgasteroid}/>
        <div className={styles.bgearth}/>
            <table className={styles.info}>
                <tbody>
                <tr>
                    <td>Название астеройда (обозначение)</td>
                    <td>{name}</td>
                </tr>
                <tr>
                    <td>Диаметр (возможный диапазон)</td>
                    <td>{Math.round(estimated_diameter.meters.estimated_diameter_min)} - {Math.round(estimated_diameter.meters.estimated_diameter_max)} м.</td>
                </tr>
                <tr>
                    <td>Точная дата максимального сближения</td>
                    <td>{dateParser(close_approach_data[0].close_approach_date)}</td>
                </tr>
                <tr> 
                    <td>Расстояние до Земли при сближении (км./расст. до Луны)</td>
                    <td>{parseInt(close_approach_data[0].miss_distance.kilometers)} км. / {parseInt(close_approach_data[0].miss_distance.lunar)}</td>
                </tr>
                <tr>   
                    <td>Потенциальная опасность</td>
                    <td>{is_potentially_hazardous_asteroid ? 'Опасен' : 'Не опасен'}</td>
                </tr>
                </tbody>
            </table>
            <h3>Список сближений</h3>
            {close_approach_data.map((item) => <ApproachElement key={item.close_approach_date} item={item} />)}
        <button className={inCart ? styles.btn_active : styles.btn}  onClick={() => cartHandler(id)}>{inCart ? 'не уничтожать' : 'уничтожить'}</button>
        </div>
    )
};

export default Asteroid;