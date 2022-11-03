import { createContext, useState, useEffect } from 'react'

export const MessagesContext = createContext()

const Messages = (props) => {

    const [alert, setAlert] = useState({})

    useEffect(() => {
        if(alert.message)
            setTimeout(() => setAlert({}), 5000)
    }, [alert])

    return (
        <MessagesContext.Provider value={{ alert, setAlert }}>
            {alert.message &&
                <div className={'alert alert-' + (alert.warning ? 'danger' : 'success')}>
                    {alert.message}
                </div>
            }
            {props.children}
        </MessagesContext.Provider>
    )
}

export default Messages