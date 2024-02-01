import React from 'react'
import PropTypes from 'prop-types'
import classes from './dialog.module.css'

export default function Dialog({
    selectedInterval = 10000,
    selected = '',
    items,
    onClose = undefined
}) {
    const [selItem, setSelItem] = React.useState(selected)
    const [timeInterval, setTimeInterval] = React.useState(10000)
    React.useEffect(() => {
        setSelItem(selected)
        setTimeInterval(selectedInterval)
    }, [selected, selectedInterval])
    return (
        <div className={classes.dialog}>
            <div className={classes.center}>
                <div className={classes.list}>
                    <label className={classes.label}>Interval</label>
                    <select className={classes.select} value={timeInterval} onChange={(e) => setTimeInterval(e.target.value)}>
                        <option value={5000}>5 seconds</option>
                        <option value={10000}>10 seconds</option>
                        <option value={15000}>15 seconds</option>
                        <option value={20000}>20 seconds</option>
                        <option value={30000}>30 seconds</option>
                        <option value={60000}>60 seconds</option>
                        <option value={90000}>1.5 minutes</option>
                        <option value={120000}>2 minutes</option>
                        <option value={180000}>3 minutes</option>
                        <option value={240000}>4 minutes</option>
                        <option value={300000}>5 minutes</option>
                    </select>
                </div>
                <div className={classes.list}>
                    <label className={classes.label}>Voice</label>
                    <select className={classes.select} value={selItem} onChange={(e) => setSelItem(e.target.value)}>
                        {
                            items.map((item, index) => {
                                return (
                                    <option key={index} value={item.name}>{ [item.name, item.language].join(', ') }</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className={classes.action}>
                    <button onClick={() => onClose(selItem, timeInterval)}>Set Voice</button>
                </div>
            </div>
        </div>
    )
}

Dialog.propTypes = {
    /**
     * time interval
     */
    selectedInterval: PropTypes.number,
    /**
     * selected item
     */
    selected: PropTypes.string,
    /**
     * items list
     */
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            language: PropTypes.string,
        })
    ),
    /**
     * onClose handler
     */
    onClose: PropTypes.func,
}