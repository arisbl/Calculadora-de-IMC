import { useCallback, useState } from 'react'
import styles from './assets/app.module.css'
import powerediImage from './assets/powered.png'
import { Griditem } from './assets/components/Griditem/';

import {levels, calculateImc, Level } from './helpers/imc';

const App = () => {
  const [heightField, setHeightField] = useState(0);
  const [weightField, setWeightField] = useState(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleClickButton = useCallback(() => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    }
    else {
      alert("Digite todos os campos")
    }

  }, [heightField, weightField])

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={powerediImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é um sigla que significa Índice de Massa Corporal. Por sua vez, esta é uma medida de referência internacional reconhecida da Organização Mundial da Saúde (OMS). O IMC mede o nível de gordura no corpo de cada pessoa.</p>

          <input
            type="number"
            placeholder='Digite a sua altura. Ex:1.50 (em métros)'
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder='Digite seu peso. Ex:80.5 (em kg)'
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
          />

          <button onClick={handleClickButton}>Calcular</button>

        </div>
        <div className={styles.rightSide}>
          {!toShow && 
          <div className={styles.grid}>
            {levels.map((item, key)=>(
            <Griditem key={key} item={item} />
            ))}
          </div>
          }
          {toShow && 
          <div className={styles.rightBig}>
            <div className={styles.rightArrow}></div>
            <Griditem item={toShow} />            
            
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
