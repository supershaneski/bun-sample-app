import React from 'react'
import { createPortal } from 'react-dom'
import classes from './App.module.css'
import Dialog from './components/dialog'

function App() {
  
  const synthRef = React.useRef(null)

  const [time, setTime] = React.useState((new Date()).toLocaleTimeString())
  const [selectedVoice, setSelectedVoice] = React.useState('')
  const [listVoice, setListVoice] = React.useState([])
  const [isMuted, setMuted] = React.useState(true)
  const [isMounted, setMounted] = React.useState(false)
  const [isDialog, setDialog] = React.useState(false)
  const [timeInterval, setTimeInterval] = React.useState(30000)
  
  React.useEffect(() => {

    synthRef.current = window.speechSynthesis

    const timer = setInterval(() => {

      setTime((new Date()).toLocaleTimeString())

    }, 1000)

    setMounted(true)

    return () => {

      try {

        clearInterval(timer)

        synthRef.current.cancel()

      } catch(error) {

        console.log(error.message)

      }

    }

  }, [])

  React.useEffect(() => {

    const getVoices = () => {
      return new Promise((resolve) => {
          let id
  
          id = setInterval(() => {
              if (synthRef.current.getVoices().length !== 0) {
                  resolve(synthRef.current.getVoices())
                  clearInterval(id)
              }
          }, 10)
      })
    }

    if(isMounted) {

      getVoices().then((voices) => {

        let voiceNames = []
        let voiceDefault = ''
        for (const voice of voices) {
          voiceNames.push({ name: voice.name, language: voice.lang })
          if(voice.default) {
            voiceDefault = voice.name
          }
        }

        setListVoice(voiceNames)
        setSelectedVoice(voiceDefault)
        
      })

      setDialog(true)
      
    }

  }, [isMounted])

  React.useEffect(() => {

    const timer = setInterval(() => {

      speakMessage()

    }, timeInterval)

    return () => {

      clearInterval(timer)

    }

  }, [isMuted, timeInterval])

  const speakMessage = React.useCallback(() => {

    const message = (new Date()).toLocaleTimeString()

    console.log(message)

    if(!synthRef.current || !message || isMuted) return

    const utterThis = new SpeechSynthesisUtterance(message)

    /*utterThis.addEventListener('end', (event) => {
        console.log(`Finished after ${event.elapsedTime} seconds.`)
    })*/

    let voice = synthRef.current.getVoices().find(voice => voice.name === selectedVoice)
    if(!voice) {
      voice = synthRef.current.getVoices().find(voice => voice.default)
    }

    utterThis.voice = voice

    utterThis.pitch = 1.1
    utterThis.rate = 0.9
    
    synthRef.current.speak(utterThis)
    
  }, [isMuted, selectedVoice])

  const handleOpenDialog = () => {
    setMuted(true)
    setDialog(true)
  }

  const handleCloseDialog = (voice, interval = 10000) => {
    setTimeInterval(interval)
    setSelectedVoice(voice)
    setMuted(false)
    setDialog(false)
  }
  
  return (
    <>
      <div className={classes.container}>
        <div className={classes.center}>
          <div className={classes.time}>
            <span className={classes.text}>{ time }</span>
          </div>
          <div className={classes.action}>
            <button onClick={handleOpenDialog}>{ selectedVoice }</button>
            <button onClick={() => setMuted((prevState) => !prevState)}>{ isMuted ? 'Sound On' : 'Mute' }</button>
          </div>
        </div>
        {
            isDialog && createPortal(
                <Dialog
                selectedInterval={timeInterval}
                selected={selectedVoice}
                items={listVoice}
                onClose={handleCloseDialog}
                />,
                document.body,
            )
        }
      </div>
    </>
  )
}

export default App
