import React from "react";
import styles from './Filter.module.css';
import {Slider} from '@material-ui/core';

const Filter = ({values, setValues, onSubmitHandler, onChangeHandler}) => {


    const [value, setValue] = React.useState([0, 120]);

    const valuetext = (value) => {
        return `${value} minutes`;
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setValues({...values, runtimeGte: newValue[0], runtimeLte: newValue[1]});
    };

    return (
        <div className={styles.filter}>
            <form className={styles.form} onSubmit={onSubmitHandler}>
                <div className={styles.runtime}>
                    <h5 className={styles.label}>Filter by runtime:</h5>
                    <div className={styles.slider}>
                        <Slider
                            min={0}
                            max={360}
                            value={value}
                            onChange={handleChange}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            marks={[{value: 0, label: "0 minutes"}, {value: 360, label: "360 minutes"}]}
                        />
                    </div>
                </div>
                <div className={styles.dateRange}>
                    <h5 className={styles.label}>Filter by release date range:</h5>

                    <label className={styles.label} htmlFor="startDate">
                        Start Date:
                        <input className={styles.datePicker}
                               type="date" name="startDate"
                               value={values.startDate}
                               onChange={onChangeHandler}
                        />
                    </label>
                    <label className={styles.label} htmlFor="endDate">
                        End Date:
                        <input className={styles.datePicker}
                               type="date"
                               name="endDate"
                               value={values.endDate}
                               onChange={onChangeHandler}
                        />
                    </label>
                </div>
                <button className={styles.button} type="submit">Apply</button>
            </form>
        </div>
    )
}

export default Filter;
