import React, {useState, useRef, useEffect, useCallback} from 'react'
import {SketchPicker} from 'react-color'
import {Button} from '@mui/material'

import useStyles from './DrawingToolStyle'

const DrawingTool = () => {
  const classes = useStyles()

  const [color, setColor] = useState('')
  const [position, setPosition] = useState({x: 0, y: 0})
  const [mouseDown, setMouseDown] = useState(false)

  const eraseColor = () => {
    setColor('#FFFFFF')
  }

  const canvas = useRef(null)

  const changeColor = color => {
    setColor(color.hex)
  }

  const draw = useCallback(
    (x, y) => {
      if (mouseDown) {
        canvas.current.beginPath()
        canvas.current.strokeStyle = color
        canvas.current.lineWidth = 10
        canvas.current.lineJoin = 'round'
        canvas.current.moveTo(position.x, position.y)
        canvas.current.lineTo(x, y)
        canvas.current.closePath()
        canvas.current.stroke()

        setPosition({x, y})
      } else if (mouseDown && color === '#FFFFFF') {
        canvas.current.beginPath()
        canvas.current.lineWidth = 30
        canvas.current.lineJoin = 'round'
        canvas.current.moveTo(position.x, position.y)
        canvas.current.lineTo(x, y)
        canvas.current.closePath()
      }
    },
    [position, setPosition, mouseDown, color]
  )

  useEffect(() => {
    if (canvas.current) {
      canvas.current = canvas.current.getContext('2d')
    }
  }, [])

  const onMouseDown = e => {
    setPosition({x: e.pageX, y: e.pageY})
    setMouseDown(true)
  }

  const onMouseUp = e => {
    setMouseDown(false)
  }

  const onMouseMove = e => {
    if (mouseDown) {
      draw(e.pageX, e.pageY)
    } else {
      setMouseDown(false)
    }
  }

  const removeDrawings = () => {
    canvas.current.clearRect(
      0,
      0,
      canvas.current.canvas.width,
      canvas.current.canvas.height
    )
  }

  const downloadDrawings = async () => {
    const image = canvas.current.toDataURL('image/png')
    const blob = await (await fetch(image)).blob()
    const blobURL = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobURL
    a.downloadDrawings = 'image.png'
    a.click()
  }

  return (
    <div className={classes.drawingPage}>
      <canvas
        style={{
          border: '15px solid',
          color: '#31084b',
          backgroundColor: 'white'
        }}
        width="700px"
        height="500px"
        ref={canvas}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
      />
      <SketchPicker
        color={color}
        onChange={changeColor}
        className={classes.picker}
      />
      <br />
      <div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={removeDrawings}
        >
          Remove Drawings
        </Button>
      </div>
    </div>
  )
}

export default DrawingTool
